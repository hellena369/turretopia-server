const {sockets, chatLoop} = require("../../network/sockets");
const {Entity, StatusEffect} = require("../../live/entity");
const {closeArena} = require("../../gamemodes/closeArena");
const {Color} = require("../../live/color");
const enableEditCommand = true;
const enableEvalCommand = false;

let chatCommandsLoaded = false;
const log = (...message) => (chatCommandsLoaded ? util : console).log(`[chatCommands] ${message.join(' ')}`)
const tags = new class {
	constructor() {
		/**
 		 * @type {Map<number, import('../../live/entity').Entity>}
 		 */
		this.tags = new Map();
		this.last = 0;
	}

	get(tag) {
		return this.tags.get(tag);
	}

	has(entity) {
		let tag = null;
		for (const [t, e] of this.tags.entries()) {
			if (e.id === entity.id) {
				tag = t;
				break;
			}
		}
		return tag;
	}

	add(entity) {
		const tag = this.has(entity);
		if (tag !== null) return tag;
		const id = ++this.last;
		this.tags.set(id, entity);
		return id;
	}
}
global.tags = tags;

const perm = {
	user: 0b0,
	token: 0b1
};

class Arguments {
	/**
	 * @param {Command} command
	 * @param {string[]} args
	 */
	constructor(command, args) {
		this.command = command;
		this.args = args;
	}

	get(i) {
		return this.args[i];
	}

	getNumber(i, def = null) {
		const num = Number(this.args[i]);
		return Number.isNaN(num) ? def : num;
	}

	getBoolean(i, def = false) {
		if (!this.args[i]) return def;
		const val = this.args[i].toLowerCase();
		if (val !== 'true' && val !== 'false' && val !== '1' && val !== '0') return def;
		return val === 'true' || val === '1';
	}

	getString(i, def = null) {
		return this.args[i] || def;
	}

	/**
	 * If entity not found, it automatically sends an error message
	 */
	getEntity(i, def = null) {
		const id = this.getNumber(i);
		if (id === null) return def;
		const e = tags.get(id);
		if (!e) {
			this.command.send(`Unknown entity: ${id}`);
			return null;
		}
		return e;
	}

	slice(a = 0, b = this.args.length) {
		return this.args.slice(a, b).join(' ');
	}

	join() {
		return this.args.join(' ');
	}

	get count() {
		return this.args.length;
	}
}

class Command {
	/**
	 * @param {string | string[]} name
	 * @param {number | [number, number | null]} args
	 * @param {string | string[] | null} doc
	 * @param {number} perms
	 * @param {(args: {
	 * 	command: Command,
	 *  args: Arguments,
	 * 	socket: any,
	 * 	player: any,
	 *  body: import('../../live/entity').Entity
	 * }) => void} fun
	 */
	constructor(name, args, doc, perms, fun) {
		this.name = Array.isArray(name) ? name : [name];
		this.doc = Array.isArray(doc) ? doc : (typeof doc == 'string' ? doc.split('\n') : null);
		this.args = Array.isArray(args) ? args : [args, args];
		this.perms = perms;
		this.function = fun;
		this.cmd = [];
		this.typeStatus = 'success';
	}

	/**
	 * @param {Arguments} args
	 */
	run(args) {
		const status = this.function({
			command: this,
			args,
			...commands.ctx
		});
		if (status !== undefined && typeof status == 'string') {
			this.status(status);
		}
		return this.typeStatus;
	}

	/**
	 * @param {'success' | 'fail' | 'error'} type
	 */
	status(type = 'success') {
		this.typeStatus = type;
		return this;
	}

	/**
	 * @param {string | string[]} message
	 */
	send(message) {
		if (Array.isArray(message)) {
			for (let i = message.length - 1; i >= 0; i--) {
				if (typeof message[i] != 'string') {
					log(`${message} is not a 1D string array.`);
					continue;
				}
				commands.ctx.socket.player.body.sendMessage(message[i]);
			}
		} else {
			commands.ctx.socket.player.body.sendMessage(message);
		}
		commands.preventDefault();
	}

	get cmdName() {
		return this.name[0] ?? 'Unknown';
	}

	get docs() {
		return this.doc ?? ['No documentation provided.'];
	}
}

class Commands {
	constructor() {
		/**
		 * @type {Command[]}
		 */
		this.all = [];
		/**
		 * @type {{socket: any, player: any, body: import('../../live/entity').Entity}}
		 */
		this.ctx = null;
		this.preventDefault = () => {};
		this.prevented = false;
	}

	find(name) {
		return this.all.find(c => c.name.includes(name));
	}

	checkPerms(command, socket) {
		const { permissions } = socket;
		if (command.perms > 0 && !permissions) {
			command.status('fail')
			return false;
		}
		if (command.perms & perm.token && permissions.class !== 'developer') {
			command.status('fail')
			return false;
		}
		return true;
	}

	update(ctx, preventDefault) {
		this.ctx = ctx;
		this.preventDefault = () => {
			preventDefault();
			this.prevented = true;
		};
		this.prevented = false;
	}

	/**
	 * @param {string | string[] | {
	 * 		name: string | string[],
	 * 		args: number | [number, number | null],
	 * 		doc?: string | string[],
	 * 		perms?: number,
	 * 		execute: (args: {
	 * 			command: Command,
	 * 			args: Arguments,
	 * 			socket: any,
	 * 			player: any,
	 * 			body: import('../../live/entity').Entity
	 * 		}) => string | void
	 * }} cmd
	 * @param {number | [number, number | null]} args
	 * @param {Partial<{ doc: string, perms: number }>} other
	 * @param {(args: {
	 *  	command: Command,
	 *  	args: Arguments,
	 * 		socket: any,
	 *  	player: any,
	 *  	body: import('../../live/entity').Entity}
	 * 	) => string | void} fun
	 */
	add(cmd, args, other, fun) {
		if (typeof cmd == 'object' && !Array.isArray(cmd)) {
			this.all.push(new Command(
				cmd.name,
				cmd.args,
				cmd.doc,
				cmd.perms !== undefined ? cmd.perms : perm.token,
				cmd.execute
			));
		} else {
			this.all.push(new Command(
				cmd,
				args,
				other.doc,
				other.perms ?? perm.token,
				fun
			));
		}
	}

	/**
	 * @param {string} name
	 * @param {string[]} args
	 */
	on(name, args) {
		const command = this.find(name), body = this.ctx.player.body;
		if (!command) {
			body.sendMessage('Unknown command');
			this.preventDefault();
			return false;
		}
		if (!this.checkPerms(command, this.ctx.socket)) {
			return false;
		}
		const [min, max] = command.args;
		if (args.length < min) {
			body.sendMessage('Not enough arguments');
			this.preventDefault();
			return false;
		}
		/*if (max !== null && args.length > max) {
			body.sendMessage('Too many arguments');
			this.preventDefault();
			return false;
		}*/
		try {
			command.run(new Arguments(command, args));
		} catch (e) {
			log(`Error running command: /${command.cmdName}:\n${e.stack ? e.stack : e}`);
		}
		if (command.typeStatus === 'error') {
			log('Command failed:', name, args);
		}
		if (!this.prevented) this.preventDefault();
		return true;
	}
}

exports.Commands = Commands; // types
const commands = new Commands();
global.chatCommands = commands;
let bSoldierIndex = 0;
let sirenIndex = 0;
const sirenUpgradeBranches = {
  'war': [ 'basic', 'gunnerDominator', 'destroyerDominator', 'challenger', 'warmachine', 'warlock'],
  'nuclear': [ 'basic', 'radar', 'reactor', 'silo'],
  'launcher': [ 'basic', 'radar', 'destroyerDominator', 'launchSiren'],
  'industry': ['basic', 'barracks', 'armory', 'necrokeep']
};
const sirenUpgradeLevels = {};
Object.keys(sirenUpgradeBranches).forEach((sirenType) => {
  sirenUpgradeLevels[sirenType] = {
    type: sirenType,
    level: 0
  };
});
module.exports = ({ Config, Events }) => {
  //Armageddon
commands.add({
  name: ['tech', 't', 'b'],
  args: [1, 2, 3, 4],
  doc: [
	  'Build/upgrade a tower, recruit soldiers, spawn eggs or assign roles.',
	  'Usage:',
	  'Roles: /t role (role name), Soldiers: /t soldier, Eggs: /t egg',
	  'Towers: /t siren <0, 1, 2, or 3> <type of upgrade>, after that do /t siren to follow it\'s upgrade path'
  ],
  perms: perm.user,
  execute: ({ command, args, body }) => {
    const arg = args.get(0);
    const subArg = args.get(1);
    const tankType = args.get(2);
    switch (arg) {
        //available to normal users, so...
      case 'test':
        if (subArg) {
        const oldTeamFunds = teamFunds;
        global.teamFunds += parseInt(subArg);
        command.send(`Added ${subArg} to your team funds! (+${teamFunds - oldTeamFunds})`)
        console.log(teamFunds, oldTeamFunds, subArg)
        } else {
          command.send(`Your team currently has ${teamFunds} team funds.`)
        }
      break;
case 'soldier':
  if (teamFunds >= (bSoldierIndex + 1)) {
    global.teamFunds -= (bSoldierIndex + 1);
    const soldierTypes = ['cP', 'cH', 'cBP', 'cBH', 'cAP', 'cAH'];
    for (let count = 0; count < 10; count++) {
      let entity = new Entity(body ? body : room.spawnable(TEAM_BLUE));
      entity.define(soldierTypes[bSoldierIndex]);
      entity.team = TEAM_BLUE;
      entity.name = body.name;
    }
    bSoldierIndex = (bSoldierIndex + 1) % soldierTypes.length;
    sockets.broadcast(`10 new soldiers have been recruited (${teamFunds} team funds left)`);
  } else {
    command.send('You do not have enough funds!');
  }
  break;
  case 'siren':
  if (teamFunds >= sirenIndex + 1) {
	  global.teamFunds -= sirenIndex + 1;
	  const sirenId = subArg;
	  if (!sirenUpgradeLevels[sirenId]) {
		  if (!tankType || !sirenUpgradeBranches[tankType]) {
			  command.send(`Invalid tank type. Available types: ${Object.keys(sirenUpgradeBranches).join(', ')}`);
			  return;
		  }
		  sirenUpgradeLevels[sirenId] = {type: tankType, level: 0};
	  }
	  
	  const upgradeLevel = sirenUpgradeLevels[sirenId];
	  const branch = sirenUpgradeBranches[upgradeLevel.type];
	  
	  if (!branch) {
		  command.send(`No upgrade branch found for type ${upgradeLevel.type}`);
		  return;
	  }
	

	  const currentLevel = upgradeLevel.level;
	  const nextLevel = currentLevel + 1 < branch.length ? currentLevel + 1 : currentLevel;


	  const siren = warFront.getSirens()[sirenId];
	  if (siren) {
		  siren.define(branch[nextLevel]);
		  upgradeLevel.level = nextLevel;
		  sockets.broadcast(`Siren ${sirenId} has been upgraded to ${branch[nextLevel]}`);
	  } else {
		  command.send(`Siren with ID ${sirenId} does not exist.`);
	  }
  } else {
	  command.send('You do not have enough funds!');
  }
  break;
      case 'role':
        const entity = args.getEntity(1, body);
        if (teamFunds > 4) {
          switch (subArg) {
            case 'altar':
			if (body.skill.level >= 150) {
			teamFunds -= 5;
            body.define('altar');
            body.team = TEAM_BLUE;
			} else {
				command.send("You need to get level 150 before you can become an Altar!")
			}
              break;
            case 'shielder':
            teamFunds -= 5;
            body.define('shielder');
            body.team = TEAM_BLUE;
            break;
          }
        } else {
          command.send('You do not have enough funds!');
        }
        break;
      case 'egg': 
        if (teamFunds > 5) {
          let oldTeamFunds = teamFunds;
          global.teamFunds -= 6
          let entity = new Entity(body);
          entity.define(ran.choose(['roguePalisade','rogueArmada']));
          entity.team = TEAM_BLUE;
          sockets.broadcast(`A rogue has joined your team! Funds: ${teamFunds} (-${oldTeamFunds - teamFunds})`)
        } else {
          command.send('You do not have enough funds!');
        }
        break;
		case 'superEgg': 
        if (teamFunds > 19) {
          let oldTeamFunds = teamFunds;
          global.teamFunds -= 20
          let entity = new Entity(body);
          entity.define(ran.choose(['julius', 'genghis', 'napoleon']));
          entity.team = TEAM_BLUE;
          sockets.broadcast(`A rogue has joined your team! Funds: ${teamFunds} (-${oldTeamFunds - teamFunds})`)
        } else {
          command.send('You do not have enough funds!');
        }
        break;
      default:
        command.send('Invalid argument.')
        break;
    }
  }
})
	commands.add({
		name: ["test"],
		args: [0],
		perms: perm.token,
		execute: ({body, command}) => {
			body.define(["irdprimary", "irddirector"])
			body.skill.reset()
			while (body.skill.level < 1) {
				body.skill.score += body.skill.levelScore;
				body.skill.maintain();
			}
			body.skill.points += 25
			body.skill.setCaps(body.skill.caps.map(x => x > 0 ? 15 : 0));
			body.refreshBodyAttributes()
			command.send('You have become iridescent!')
		}
	})

	commands.add({
		name: ["ascend"],
		args: [0],
		doc: [
			'Ascend to Ethereal.',
			'Only at level 150 and above.',
			'Usage: /ascend'
		],
		perms: perm.user,
		execute: ({ command, body }) => {
			if (body.skill.level >= 150) {
				command.send('You have ascended!');
				body.define(["ethereal", "etherealBody"]);
				body.team = -10
				body.skill.points += 18
				body.skill.setCaps(body.skill.caps.map(x => x > 0 ? 15 : 0));
			} else {
				command.send('You are underleveled!')
			}
		}
	})

	commands.add({
		name: ["overclock"],
		args: [0],
		doc: [
			'Overclock your body!',
			'Only at level 400.',
			'Usage: /evolve'
		],
		perms: perm.user,
		execute: ({ command, body }) => {
			if (body.isEthereal) return command.send("You can't overclock in ethereal state!")
			if (body.evoCount > 7) return command.send("Maximum overclock reached!")
			if (body.evoCount === 7) {
				body.evoCount += 1
				body.define(["irdtank", "irdbasic"])
				body.skill.reset()
				while (body.skill.level < 1) {
					body.skill.score += body.skill.levelScore;
					body.skill.maintain();
				}
				body.skill.points += 30
				body.skill.setCaps(body.skill.caps.map(x => x > 0 ? 15 : 0));
				body.refreshBodyAttributes()
				command.send('You have become iridescent!')
				return;
			}
			if (body.skill.level >= 400 && body.evoCount <= 6 && !body.isEthereal) {
				body.evoCount += 1
				body.evoGain += 5
				body.evoCap += 1
				body.skill.reset()
				while (body.skill.level < 45) {
					body.skill.score += body.skill.levelScore;
					body.skill.maintain();
				}
				body.skill.points += body.evoGain
				body.skill.setCaps(body.skill.caps.map(x => x > 0 ? body.evoCap : 0));
				body.refreshBodyAttributes()
				command.send('You have overclocked!')
			} else {
				command.send('You do not meet the requirements!')
			}
		}
	})
  
	commands.add({
		name: ['help', 'h', '?'],
		args: [0, 1],
		doc: [
			'Get help on a command.',
			'Example: /help help',
			'Doc: /help [COMMAND or "list"]',
			'Doc info: [] - optional arguments'
		],
		perms: perm.user,
		execute: ({ command, socket, args }) => {
			const arg = args.get(0);
			if (arg === 'list') {
				command.send(['Available commands:', ...commands.all.filter(c => socket.permissions ? (c.perms === 1 && socket.permissions.class === 'developer') : c.perms === 0 ).map(c => c.cmdName)]);
			} else {
				const cmd = args.count > 0 ? commands.find(args.get(0)) : command;
				if (!cmd) return command.send(`Unknown command '${args.get(0)}'`);
				if (cmd.perms > 0 && !commands.checkPerms(cmd, socket)) return;
				command.send([
					`/${cmd.cmdName} ${cmd.name.length > 1 ? `(${cmd.name.slice(1).join(', ')})` : ''} [${cmd.args.join(', ')}]`,
					...cmd.docs
				]);
			}
		}
	});

	commands.add('close', 0, { doc: 'Close the server' }, ({ command }) => {
		command.send('Closing server...');
		closeArena();
	});

	commands.add(['broadcast', 'bc'], [1, 50], { doc: 'Broadcast a message to all players\nExample: /bc Hello everyone!\nDoc: /broadcast [MESSAGE ...]' }, ({ args }) =>
		sockets.broadcast(args.join())
	);

	commands.add(['size', 'sz'], [0, 2], { doc: 'Set the size of the tank\nDoc: /sz [SIZE] [WHO]' }, ({ args, body, command }) => {
		const size = args.getNumber(0, 0);
		const entity = args.getEntity(1, body);
		if (size <= 0) {
			return command.send(`Your tank size is ${body.SIZE}`);
		}
		const oldSize = body.SIZE;
		entity.SIZE = size;
		const delta = entity.SIZE - oldSize;
		command.send(`Changed ${entity.name}'s Size ${oldSize} -> ${entity.SIZE} (${delta > 0 ? '+' : ''}${delta})`);
	});

	commands.add(['kill', 'k'], [0, 1], { doc: 'Kill the entity\nDoc: /k [WHO]' }, ({ args, body, command }) => {
		const entity = args.getEntity(0, body);
		if (!entity) return;
		command.send(`Killed ${entity.name}`);
		entity.destroy();
	});

	commands.add(['entity', 'e', 'tag'], [0, 50], { doc: 'Get the entity\nDoc: /e [USERNAME ...]' }, ({ args, body, command }) => {
		if (args.count === 0) {
			return command.send(`Current entity-id: ${tags.add(body)}`);
		}
		const username = args.join();
		let id = null;
		for (const entity of entities) {
			if (entity.name === username) {
				id = tags.add(entity);
				break;
			}
		}
		command.send(`${username}'s Entity-ID: ${id}`);
	});

	commands.add(['entities', 'tags'], [0, 50], { doc: 'List all entities\nDoc: /tags [USERNAME ...]' }, ({ command, args }) => {
		const query = args.count > 0 ? args.join() : null;
		const list = [];
		for (const [id, e] of tags.tags) {
			if (e.isDead()) {
				tags.tags.delete(id);
				continue;
			}
			if (query && !e.name.startsWith(query)) continue;
			list.push(`${id}: ${e.name}`);
		}
		if (list.length > 0) {
			command.send(list);
		} else {
			command.send('No entities found');
		}
	});

	commands.add({
		name: ['color', 'rgb', 'colour', 'cr'],
		args: [0, 6],
		doc: [
			'Set color for selected tank',
			'Doc: /cr [COLOR] [HUE SHIFT = 0] [BRIGHTNESS SHIFT = 1] [SATURATION SHIFT = 0] [ALLOW BRIGHTNESS INVERT = true] [WHO]',
			'Examples:',
			'/color white',
			'/color black 0 1 0 false',
			'/color blue 50 1 0 1 (booleans can be 0 or 1 or true or false)'
		],
		execute: ({ args, body, command }) => {
			const color = args.get(0);
			const hue = args.getNumber(1, 0);
			const brightness = args.getNumber(2, 1);
			const saturation = args.getNumber(3, 0);
			const inverted = args.getBoolean(4, false);
			const entity = args.getEntity(5, body);
			if (!entity) return;
			if (!color) return command.send(`Current color: ${entity.color}`);
			entity.color = new Color({
				base: color,
				hueShift: hue,
				brightnessShift: brightness,
				saturationShift: saturation,
				allowBrightnessInvert: inverted
			});
		}
	});

	commands.add('fov', [0, 2], { doc: 'Set the field of view for the selected entity\nDoc: /fov [FOV] [WHO]' }, ({ args, body, command }) => {
		const fov = args.getNumber(0, 0);
		const entity = args.getEntity(1, body);
		if (!entity) return;
		if (!fov) {
			return command.send(`Current FOV: ${entity.FOV}`);
		}
		const oldFov = entity.FOV;
		entity.FOV = fov;
		const delta = fov - oldFov;
		command.send(`Changed ${entity.name}'s FOV ${oldFov} -> ${fov} (${delta > 0 ? '+' : ''}${delta})`);
	});

	commands.add('skill', [1, 2], { doc: 'Add skill points to the selected entity\nDoc: /skill SKILL [WHO]' }, ({ args, body, command }) => {
		const skill = args.getNumber(0, 0);
		const entity = args.getEntity(1, body);
		if (!entity) return;
		const oldSkills = entity.skill.points;
		entity.skill.points += skill;
		const delta = entity.skill.points - oldSkills;
		command.send(`Changed ${entity.name}'s skill ${oldSkills} -> ${entity.skill.points} (${delta > 0 ? '+' : ''}${delta})`);
	});

	commands.add('cap', [1, 2], { doc: 'Set skill cap for the selected entity\nDoc: /cap CAP [WHO]' }, ({ args, body, command }) => {
		const cap = args.getNumber(0, 0);
		const entity = args.getEntity(1, body);
		if (!entity) return;
		entity.skill.setCaps(body.skill.caps.map(x => x > 0 ? cap : 0));
		command.send(`Changed ${entity.name}'s skill cap`);
	});

	const teams = ['BLUE','GREEN','RED','PURPLE','YELLOW','ORANGE','BROWN','CYAN','ROOM','ENEMIES'];
	commands.add('team', [0, 2], { doc: `Set team for the selected entity\nString teams: ${teams.join(', ')}\nDoc: /team [TEAM] [WHO]` }, ({ args, body, command }) => {
		let team = args.getNumber(0) || args.getString(0);
		const entity = args.getEntity(1, body);
		if (!entity) return;
		if (!team) {
			return command.send(`Current ${entity.name}'s team: ${entity.team}`);
		}
		if (typeof team == 'string') {
			const upperTeam = team.toUpperCase();
			if (teams.some(x => x === upperTeam)) {
				team = global[`TEAM_${upperTeam}`];
			} else {
				return command.send(`Invalid team: ${team}`);
			}
		}
		const oldTeam = entity.team;
		entity.team = team;
		command.send(`Changed ${entity.name}'s team ${oldTeam} -> ${team}`);
	});

	commands.add(['level', 'lvl'], [0, 2], { doc: 'Set level for the selected entity\nDoc: /level [LEVEL] [WHO]' }, ({ args, body, command }) => {
		const level = args.getNumber(0);
		const entity = args.getEntity(1, body);
		if (!entity) return;
		if (!level) {
			return command.send(`Current ${entity.name}'s level: ${entity.level}`);
		}
		const oldLevel = entity.level;
		entity.skill.reset();
		while (entity.skill.level < level) {
			entity.skill.score += entity.skill.levelScore;
			entity.skill.maintain();
		}
		entity.refreshBodyAttributes();
		const delta = entity.level - oldLevel;
		command.send(`Changed ${entity.name}'s level ${oldLevel} -> ${level} (${delta > 0 ? '+' : ''}${delta})`);
	});

	commands.add({
		name: ['spawn', 'summon', 'new'],
		args: [3, 5],
		doc: [
			'Spawn an entity',
			'Doc: /spawn X Y CLASS [AI = false] [NAME]',
			'Tip: Set NAME if you want to edit the entity in future'
		],
		execute: ({ args, body, command }) => {
			const x = args.getNumber(0);
			const y = args.getNumber(1);
			const classType = args.getString(2);
			const ai = args.getBoolean(3, false);
			const name = args.getString(4);
			if (x === null || y === null || !classType) return command.status('error');
			const entity = new Entity({ x: body.x + x, y: body.y + y });
			if (!Class[classType]) return command.send(`Unknown class: ${classType}`);
			entity.define(classType);
			if (ai) {
				entity.define({
					CONTROLLERS: ["nearestDifferentMaster", "minion", "canRepel"],
					AI: { NO_LEAD: true }
				});
			}
			if (name) {
				entity.name = name;
			}
			entity.refreshBodyAttributes();
			entity.life();
		}
	});

	const tileSize = (Config.TILE_WIDTH + Config.TILE_WIDTH) / 2;
	const wallSize = tileSize / 2;
	const spawnWall = (x, y, name = null, size = wallSize) => {
		const e = new Entity({ x, y });
		e.define('wall');
		e.SIZE = size;
		e.team = TEAM_ROOM;
		if (name) e.name = name;
		e.protect();
		e.life();
	}

	commands.add({
		name: ['wall', 'w'],
		args: [1, 4],
		doc: [
			'Spawn a wall',
			'Doc: /wall X Y [SIZE = 1] [NAME] - Note: X, Y are relative',
			'Doc2: /wall grid [NAME] - spawns a wall at the grid position',
			'Tip: Set NAME if you want do edit the wall in future',
			'Note: SIZE is in tiles'
		],
		execute: ({ args, body, command }) => {
			const type = args.getString(0);
			if (type === 'grid') {
				const name = args.getString(1);
				spawnWall((Math.floor(body.x / tileSize) + .5) * tileSize, (Math.floor(body.y / tileSize) + .5) * tileSize, name);
			} else {
				const { x: px, y: py } = body;
				const x = args.getNumber(0);
				const y = args.getNumber(1);
				if (x === null || y === null) return command.send('Invalid coordinates (NaN)');
				const size = args.getNumber(2, 0);
				const name = args.getString(3);
				spawnWall(px + x, py + y, name, size > 0 ? size * wallSize : wallSize);
			}
		}
	});

	commands.add({
		name: 'tp',
		args: [1, 4],
		doc: [
			'Teleport to a position',
			'Doc: /tp TYPE [X] [Y] [WHO]',
			'Types: pos, grid, relative (rel), center, facing',
			'Examples: /tp facing 100',
			'/tp center',
			'/tp grid 5 5',
			'/tp center -500 -500',
			'/tp facing 50 -50 entity',
			'/tp rel 100 100',
			'/tp pos 1000 1000'
		],
		execute: ({ args, body, command }) => {
			const type = args.getString(0, 'rel').toLowerCase();
			const x = args.getNumber(1);
			const y = args.getNumber(2);
			const entity = args.getEntity(3, body);
			if (!entity) return;
			if (type !== 'center' && x === null && y === null) return command.send('X and Y are required for non-center types');
			if (type !== 'facing' && type !== 'center' && y === null) return command.send('Y is required for non-pos types');
			switch (type) {
				case 'pos':
					entity.x = x;
					entity.y = y;
					break;
				case 'grid':
					entity.x = x * room.tileWidth;
					entity.y = y * room.tileHeight;
					break;
				case 'rel':
				case 'relative':
					entity.x += x;
					entity.y += y;
					break;
				case 'center':
					entity.x = room.width / 2 + (x ?? 0);
					entity.y = room.height / 2 + (y ?? 0);
					break;
				case 'facing': // Note: it's not a bug, this is a feature
					entity.x = entity.x + Math.cos(body.facing) * (x ?? 0);
					entity.y = entity.y + Math.sin(body.facing) * ((y ?? x) ?? 0);
					break;
				default:
					return command.send('Invalid type, use one of: pos, grid, relative (rel), center, facing');
			}
		}
	});

	const overrideMaxChildren = (entity, recursive = true) => {
		if (entity.maxChildren !== undefined) entity.maxChildren = 0;
		if (entity.countsOwnKids === true) entity.countsOwnKids = false;
		if (recursive) {
			for (const turret of entity.turrets) {
				overrideMaxChildren(turret);
			}
			for (const gun of entity.guns) {
				overrideMaxChildren(gun, false);
			}
		}
		entity.destroyAllChildren();
	}

	commands.add(['maxChildren', 'children'], [0, 3], { doc: 'Set maximum number of children\nDoc: /children [VALUE] [OVERRIDE TURRETS = false] [WHO]' }, ({ args, body, command }) => {
		const value = args.getNumber(0);
		const overrideTurrets = args.getBoolean(1);
		const entity = args.getEntity(2, body);
		if (!entity) return;
		if (!value) return command.send(`Current children: ${entity.maxChildren}`);
		if (overrideTurrets) overrideMaxChildren(entity, false);
		entity.maxChildren = value;
	});

	const allowedBodyAttributes = ['speed', 'acceleration', 'health', 'regen', 'shield', 'resist', 'range', 'pushability', 'damage'];
	commands.add({
		name: ['state', 'stat', 'body', 'attr'],
		args: [1, 3],
		doc: [
			'Set body attribute',
			'Doc: /state ATTRIBUTE [VALUE*] [WHO]',
			`Allowed: ${allowedBodyAttributes.join(', ')}`,
			'Examples: /state health 100',
			'/state regen *10 entity',
			'* - value can be "*100" (multiply by 100), "/100" (divine by 100)',
		],
		execute: ({ args, body, command }) => {
			const name = args.getString(0);
			const value = args.getString(1);
			const entity = args.getEntity(2, body);
			if (!entity) return;
			if (!allowedBodyAttributes.includes(name)) return command.send(`Invalid attribute '${name}'. Use one of: ${allowedBodyAttributes.join(', ')}`);
			const attribute = name.toUpperCase();
			if (!value) return command.send(`Current ${name}: ${entity[attribute]}`);
			let val = args.getNumber(1);
			if (val === null) {
				const type = value[0];
				val = Number(value.slice(1));
				if (Number.isNaN(val) || val <= 0) return command.send('Invalid value');
				let last = entity[attribute];
				switch (type) {
					case '*':
						entity[attribute] *= val;
						break;
					case '/':
						entity[attribute] /= val;
						break;
					default:
						return command.send('Invalid value type, use one of: *, /');
				}
				const delta = entity[attribute] - last;
				const percent = 100 + (delta / last) * 100;
				command.send(`Set ${name}: ${last} -> ${entity[attribute]} (${delta > 0 ? '+' : ''}${delta}) (${percent.toFixed()}%)`);
			} else {
				let last = entity[attribute];
				entity[attribute] = val;
				const delta = entity[attribute] - last;
				const percent = 100 + (delta / last) * 100;
				command.send(`Set ${name}: ${last} -> ${entity[attribute]} (${delta > 0 ? '+' : ''}${delta}) (${percent.toFixed()}%)`);
			}
		}
	});

	commands.add(['define', 'def'], [1, 2], { doc: 'Set an entity definition\nDoc: /define CLASS [WHO]' }, ({ args, body, command }) => {
		const cls = args.getString(0);
		const entity = args.getEntity(1, body);
		if (!entity) return;
		if (!Class[cls]) return command.send(`Unknown class: ${cls}`);
		const color = entity.color;
		entity.define(cls);
		if (!Class[cls].COLOR) {
			entity.color = color;
		}
	});

	commands.add(['heal', 'hp', 'h'], [0, 1], { doc: 'Heal an entity\nDoc: /heal [WHO]' }, ({ args, body }) => {
		const entity = args.getEntity(0, body);
		if (!entity) return;
		entity.health.amount = entity.health.max;
		entity.shield.amount = entity.shield.max;
	});

	commands.add('me', [1, 100], { doc: 'Send a message to entity\nDoc: /me WHO MESSAGE' }, ({ args, command }) => {
		const entity = args.getEntity(0);
		if (!entity) return;
		entity.sendMessage(args.slice(1));
		command.send('The message was sent');
	});

	const allowedGunsAttributes = ['reload', 'recoil', 'shudder', 'size', 'health', 'damage', 'pen', 'speed', 'maxSpeed', 'range', 'density', 'spray', 'resist'];
	commands.add('guns', [1, 3], { doc: `Change entity\'s guns attributes\nDoc: /guns NAME [VALUE*?] [WHO]\nAllowed: ${allowedGunsAttributes.join(', ')}` }, ({ args, body, command }) => {
		const name = args.getString(0);
		const value = args.getString(1);
		const entity = args.getEntity(2, body);
		if (!entity) return;
		if (!allowedGunsAttributes.includes(name)) return command.send(`Invalid attribute '${name}'. Use one of: ${allowedGunsAttributes.join(', ')}`);
		if (!value) return command.send(`Current ${name}: ${entity.guns.map(g => g.shootSettings ? g.shootSettings[name] : null).filter(x => x !== null)}`);
		let val = args.getNumber(1);
		if (val === null) {
			const type = value[0];
			val = Number(value.slice(1));
			if (Number.isNaN(val) || val <= 0) return command.send('Invalid value');
			switch (type) {
				case '*':
					entity.guns.forEach(g => g.shootSettings ? (g.shootSettings[name] ? g.shootSettings[name] *= val : null) : null);
					break;
				case '/':
					entity.guns.forEach(g => g.shootSettings ? (g.shootSettings[name] ? g.shootSettings[name] /= val : null) : null);
					break;
			}
		} else {
			entity.guns.forEach(g => g.shootSettings ? (g.shootSettings[name] ? g.shootSettings[name] += val : null) : null);
		}
		command.send(`${entity.name ?? entity.label}'s guns changed (${name}): ${entity.guns.map(g => g.shootSettings ? g.shootSettings[name] : null).filter(x => x !== null)}`);
	});

	const multipliers = ['acceleration', 'topSpeed', 'health', 'shield', 'regen', 'damage', 'penetration', 'range', 'fov', 'density', 'stealth', 'pushability', 'recoilReceived', 'size'];
	commands.add(['effect-give', 'effect'], [3, 4], { doc: `Give a effect to any entity\nDoc: /effect-give DURATION EFFECT MULTIPLIER [WHO]\nAllowed: ${multipliers.join(', ')}` }, ({ args, body, command }) => {
		const duration = args.getNumber(0);
		const effect = args.getString(1);
		const multiplier = args.getNumber(2);
		const entity = args.getEntity(3, body);
		if (!entity) return;
		if (!duration || duration < 0) return command.send('Invalid duration (duration should be in game ticks)');
		if (!multiplier || multiplier < 0) return command.send('Invalid multiplier');
		if (!multipliers.includes(effect)) return command.send(`Invalid effect '${effect}'. Use one of: ${multipliers.join(', ')}`);
		entity.addStatusEffect(new StatusEffect(duration, { [effect]: multiplier }));
		command.send(`Effect given to ${entity.name ?? 'unnamed'}'s ${entity.label}`);
	});


	if (enableEvalCommand) {
		commands.add('eval', [1, 100], { doc: 'Evaluate JavaScript code\nDoc: /eval CODE ...' }, ({ args, command }) => {
			const code = args.join();
			let result;
			try {
				result = eval(code);
			} catch (e) {
				command.send('Error:', e.toString());
			}
			command.send(`${result}`);
		});
	}

	if (enableEditCommand) {
		commands.add('edit', [1, 100], { doc: 'Edit your last message\nDoc: /edit MESSAGE ...', perms: perm.user }, ({ args, body, command }) => {
			if (args.count === 0) return command.send('No message specified');
			if (!chats[body.id]) return command.send('You have no messages!');
			let msg = chats[body.id].shift();
			if (msg.expires < Date.now()) return command.send('Your message has expired');
			let text = args.join();
			msg = ({ message: text + '*', expires: Date.now() + Config.CHAT_MESSAGE_DURATION });
			chats[body.id].unshift(msg);
			util.log(`${body.name} (edited): ${msg.message}`);
			chatLoop();
		});
	}

	/*
	// This is example for a custom command
	commands.add('hru', 0, { doc: 'the "How Are You" command.\nExample: /hru', perms: perm.user }, ({ command }) => {
		command.send('I am good. How are you?');
	});
	*/

	Events.on('chatMessage', ({ message, socket, preventDefault }) => {
		if (!message.startsWith('/')) return;
		if (!socket.player.body) return;

		commands.update({
			socket,
			player: socket.player,
			body: socket.player.body
		}, preventDefault);

		const args = message.slice(1).split(' ');
		commands.on(args.shift().toLowerCase(), args);
	});

	log(`Loaded ${commands.all.length} commands.`);
	log('Commands loaded!');
	chatCommandsLoaded = true;
};