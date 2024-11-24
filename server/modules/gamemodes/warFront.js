/*jslint node: true */
/*jshint -W061 */
/*global goog, Map, let */
//"use strict";
// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');
let calculatePoints = wave => 5 + wave * 3;
// Each wave has a certain amount of "points" that it can spend on bosses, calculated above.
// Each boss costs an amount of points.
// It will always buy as many bosses until it has no points or else can't spend them.
// It picks a boss to buy by filtering the list of boss choices by if they are affordable.
// Then it picks a boss at random, with all choices being equally likely.

let oldGroups = {
    elites: [ "eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner" ],
    strange: [ "summoner", "eliteSkimmer", "nestKeeper", "roguePalisade" ],
    celestials: [ "paladin", "freyja", "zaphkiel", "nyx", "theia" ],
    eternals: [ "legionaryCrasher", "kronos", "odin" ],
};

class WarFront {
    constructor() {
        this.waveCodes = [
            ran.chooseN(oldGroups.elites, 1),
            ran.chooseN(oldGroups.elites, 2),
            ran.chooseN(oldGroups.elites, 3),
            ran.chooseN(oldGroups.elites, 4),
            ran.chooseN(oldGroups.elites, 3).concat(ran.chooseN(oldGroups.strange, 1)),
            ran.chooseN(oldGroups.elites, 2).concat(ran.chooseN(oldGroups.strange, 2)),
            ran.chooseN(oldGroups.elites, 1).concat(ran.chooseN(oldGroups.strange, 3)),
            ran.chooseN(oldGroups.strange, 4),
            ran.chooseN(oldGroups.elites, 1).concat(ran.chooseN(oldGroups.strange, 4)),
            ran.chooseN(oldGroups.elites, 2).concat(ran.chooseN(oldGroups.strange, 4)),
            ran.chooseN(oldGroups.elites, 3).concat(ran.chooseN(oldGroups.strange, 4)),
            ran.chooseN(oldGroups.elites, 4).concat(ran.chooseN(oldGroups.strange, 4)),
            [ oldGroups.celestials[0] ],
            [ oldGroups.celestials[1] ],
            [ oldGroups.celestials[2] ],
            [ oldGroups.celestials[3] ],
            [ oldGroups.celestials[4] ],
            ran.chooseN(oldGroups.elites, 1).concat(ran.chooseN(oldGroups.strange, 1)).concat(ran.chooseN(oldGroups.celestials, 1)),
            ran.chooseN(oldGroups.elites, 3).concat(ran.chooseN(oldGroups.strange, 1)).concat(ran.chooseN(oldGroups.celestials, 1)),
            ran.chooseN(oldGroups.elites, 3).concat(ran.chooseN(oldGroups.strange, 3)).concat(ran.chooseN(oldGroups.celestials, 1)),
            ran.chooseN(oldGroups.elites, 4).concat(ran.chooseN(oldGroups.strange, 4)).concat(ran.chooseN(oldGroups.celestials, 1)),
            ran.chooseN(oldGroups.celestials, 2),
            ran.chooseN(oldGroups.elites, 1).concat(ran.chooseN(oldGroups.strange, 2)).concat(ran.chooseN(oldGroups.celestials, 2)),
            ran.chooseN(oldGroups.elites, 3).concat(ran.chooseN(oldGroups.strange, 3)).concat(ran.chooseN(oldGroups.celestials, 2)),
            ran.chooseN(oldGroups.elites, 4).concat(ran.chooseN(oldGroups.strange, 4)).concat(ran.chooseN(oldGroups.celestials, 2)),
            ran.chooseN(oldGroups.celestials, 3),
            ran.chooseN(oldGroups.elites, 3).concat(ran.chooseN(oldGroups.strange, 3)).concat(ran.chooseN(oldGroups.celestials, 3)),
            ran.chooseN(oldGroups.elites, 4).concat(ran.chooseN(oldGroups.strange, 4)).concat(ran.chooseN(oldGroups.celestials, 3)),
            ran.chooseN(oldGroups.celestials, 4),
            ran.chooseN(oldGroups.elites, 2).concat(ran.chooseN(oldGroups.strange, 2)).concat(ran.chooseN(oldGroups.celestials, 4)),
            ran.chooseN(oldGroups.elites, 4).concat(ran.chooseN(oldGroups.strange, 4)).concat(ran.chooseN(oldGroups.celestials, 4)),
            ran.chooseN(oldGroups.celestials, 5),
            ran.chooseN(oldGroups.elites, 4).concat(ran.chooseN(oldGroups.strange, 4)).concat(ran.chooseN(oldGroups.celestials, 5)),
            ran.chooseN(oldGroups.eternals, 1),
        ];
        this.bossChoices = [
            // [ cost , definition reference ],

            //mysticals
            [  1, "sorcerer"],
            [  2, "summoner"],
            [  2, "enchantress"],
            [  2, "exorcistor"],
            [  2, "shaman"],

            //elites
            [  2, "eliteDestroyer"],
            [  2, "eliteGunner"],
            [  2, "eliteSprayer"],
            [  2, "eliteBattleship"],
            [  2, "eliteSpawner"],
            [  2, "eliteTrapGuard"],
            [  2, "eliteSpinner"],
            [  2, "eliteSkimmer"],

            //nesters
            [  3, "nestKeeper"],
            [  3, "nestWarden"],
            [  3, "nestGuardian"],

            //terrestrials
            [ 15, "ares"],
            [ 15, "gersemi"],
            [ 15, "ezekiel"],
            [ 15, "eris"],
            [ 15, "selene"],

            //celestials
            [ 35, "paladin"],
            [ 35, "freyja"],
            [ 35, "zaphkiel"],
            [ 35, "nyx"],
            [ 35, "theia"],

            //eternals
            [100, "legionaryCrasher"],
            [100, "kronos"],
            [100, "odin"],

            //timelines
            [150, "emerald"],
            [150, "diamond"],
        ];
        this.friendlyBossChoices = [ [9, "roguePalisade"], [9, "rogueArmada"], [3, "julius"], [3, "genghis"], [3, "napoleon"] ];
            this.bigFodderChoices = ["sentryGun", "sentrySwarm", "sentryTrap", "shinySentryGun", "sentinelLauncher", "sentinelCrossbow", "sentinelMinigun"];
        this.smallFodderChoices = ["crasher"];
        this.length = Config.CLASSIC_SIEGE ? this.waveCodes.length : Config.WAVES;
        this.waves = this.generateWaves();
        this.waveId = -1;
        this.gameActive = true;
        this.timer = 0;
        this.remainingEnemies = 0;
        this.sanctuaryTier = 1;
        this.sanctuaries = [];
        this.sirens = [];
        this.leftTowers = 0;
    }

    generateWaves() {
        let waves = [];
        for (let i = 0; i < this.length; i++) {
            let wave = [],
                points = calculatePoints(i),
                choices = this.bossChoices;

            while (points > 0 && choices.length) {
                choices = choices.filter(([ cost ]) => cost <= points);
                if (!choices.length) break;
                let [ cost, boss ] = ran.choose(choices);
                points -= cost;
                wave.push(boss);
            }

            waves.push(Config.CLASSIC_SIEGE ? this.waveCodes[i] : wave);
        }
        return waves;
    }

    spawnFriendlyBoss() {
        let o = new Entity(getSpawnableArea(TEAM_BLUE));
        let type = this.friendlyBossChoices[ran.chooseChance(...this.friendlyBossChoices.map((x) => x[0]))][1]
        o.define(type);
        o.define({ DANGER: 10 });
        o.team = TEAM_BLUE;
        o.controllers.push(new ioTypes.nearestDifferentMaster(o), new ioTypes.wanderAroundMap(0, { lookAtGoal: true }));
        o.name = ran.chooseBossName('castle');
        o.FOV = 10;
        o.settings.broadcastMessage = `${o.name} has fallen!`;
        sockets.broadcast(o.name + ' has arrived and joined your team!');
    }

    spawnSanctuary(tile, team, type = false) {
        type = type ? type : "sanctuaryTier3";
        let o = new Entity(tile.loc);
        this.defineSanctuary(o, team, type);
        this.sanctuaries.push(o);
        let spawnableArea = room.spawnable[Object.keys(room.spawnable).find((key) => room.spawnable[key].includes(tile))];
        o.on('dead', () => {
            if (o.team === TEAM_ENEMIES) {
                if (Array.isArray(room.spawnable[TEAM_BLUE])) {
                    room.spawnable[TEAM_BLUE].push(tile);
                } else {
                    console.log("empty array:", room.spawnable[TEAM_BLUE]);
                }

                this.spawnSanctuary(tile, TEAM_BLUE, `sanctuaryTier${this.sanctuaryTier}`);
                tile.color.interpret(getTeamColor(TEAM_BLUE));
                this.leftTowers++;
                sockets.broadcast('A sanctuary has been repaired! ' + this.leftTowers + ' towers remain.');
            } else {
                // Don't allow players to spawn at the destroyed sanctuary so we remove it from spawnable location.
                util.remove(spawnableArea, spawnableArea.indexOf(tile));

                this.spawnSanctuary(tile, TEAM_ENEMIES, "dominator");
                tile.color.interpret(getTeamColor(TEAM_ENEMIES));
                this.leftTowers--;
                sockets.broadcast('A sanctuary has been destroyed! ' + this.leftTowers + ' towers remain.');
            }
            sockets.broadcastRoom();
        });
    }

    spawnSiren(tile, team, type = "siren") {
        const o = new Entity(tile.loc);
        this.defineSiren(o, team, type);
        this.sirens.push(o);

        const spawnableArea = room.spawnable[Object.keys(room.spawnable).find(key => room.spawnable[key].includes(tile))];
        o.on('dead', () => {
            if (o.team === TEAM_ENEMIES) {
                room.spawnable[TEAM_BLUE].push(tile);
                this.spawnSiren(tile, TEAM_BLUE);
                tile.color.interpret(getTeamColor(TEAM_BLUE));
                this.leftTowers++;
                sockets.broadcast(`A tower has been repaired! ${this.leftTowers} towers remain.`);
            } else {
                util.remove(spawnableArea, spawnableArea.indexOf(tile));
                this.spawnSiren(tile, TEAM_ENEMIES, "dominator");
                tile.color.interpret(getTeamColor(TEAM_ENEMIES));
                this.leftTowers--;
                sockets.broadcast(`A tower has been destroyed! ${this.leftTowers} towers remain.`);
            }
            sockets.broadcastRoom();
        });
    }

    defineSanctuary(entity, team, type) {
        this.defineEntity(entity, team, type, 'Sanctuary', 11);
    }

    defineSiren(entity, team, type) {
        this.defineEntity(entity, team, type, 'Siren', 12);
    }

    defineEntity(entity, team, type, name, dangerLevel, sizeMultiplier = 2.4) {
        const id = this.sirens.length + this.sanctuaries.length + 1;
        entity.define(type);
        entity.team = team;
        entity.color.base = getTeamColor(team);
        entity.skill.score = 111069;
        entity.name = name;
        entity.id = id;
        entity.LEVEL_CAP = 999;
        entity.SIZE = room.tileWidth / (Config.CLASSIC_SIEGE ? 10 : 17.5) * sizeMultiplier;
        entity.isDominator = true;
        entity.DISPLAY_NAME = false;
        entity.define({ DANGER: dangerLevel });
    }

    getSanctuaries() {
        return this.sanctuaries;
    }

    getSirens() {
        return this.sirens;
    }

    playerWin() {
        if (this.gameActive) {
            this.gameActive = false;
            sockets.broadcast('You have won the game!');
            setTimeout(closeArena, 1500);
        }
    }

    playerLose() {
        if (this.gameActive) {
            this.gameActive = false;
            sockets.broadcast('You have lost the game!');
            setTimeout(closeArena, 1500);
        }
    }

    spawnEnemyWrapper(loc, type) {
        let enemy = new Entity(loc);
        enemy.define(type);
        enemy.team = TEAM_ENEMIES;
        enemy.FOV = 10;
        enemy.refreshBodyAttributes();
        enemy.controllers.push(new ioTypes.bossRushAI(enemy));

        this.remainingEnemies++;
        enemy.on('dead', () => {
            //this enemy has been killed, decrease the remainingEnemies counter
            //if afterwards the counter happens to be 0, announce that the wave has been defeated
            if (!--this.remainingEnemies) {
                sockets.broadcast(`Wave ${this.waveId + 1} has been defeated!`);
                sockets.broadcast(`The next wave will start shortly.`);
            }
        });
        return enemy;
    }

    spawnWave(waveId) {
        //armageddon
        sockets.broadcast(`Wave ${waveId + 1} has started! Funds: ${teamFunds}`);
        global.teamFunds += 1;

        //spawn bosses
        for (let boss of this.waves[waveId]) {
            let spot = null,
                attempts = 0;
            do {
                spot = getSpawnableArea(TEAM_ENEMIES);
            } while (dirtyCheck(spot, 500) && ++attempts < 30);

            let enemy = this.spawnEnemyWrapper(spot, boss);
            enemy.define({ DANGER: 25 + enemy.SIZE / 5 });
            enemy.isBoss = true;
        }

        if (!Config.CLASSIC_SIEGE) {
            //spawn fodder enemies
            for (let i = 0; i < this.waveId / 5; i++) {
                this.spawnEnemyWrapper(getSpawnableArea(TEAM_ENEMIES), ran.choose(this.bigFodderChoices));
            }
            for (let i = 0; i < this.waveId / 2; i++) {
                this.spawnEnemyWrapper(getSpawnableArea(TEAM_ENEMIES), ran.choose(this.smallFodderChoices));
            }

            //spawn a friendly boss every 10 waves
            if (waveId % 10 == 9) {
                setTimeout(() => this.spawnFriendlyBoss(), 5000);
            }
        }

        // Update sanctuary tiers
        let newSancTier = Math.min(Math.floor(this.waveId / 5) + 1, 5);
        if (newSancTier != this.sanctuaryTier) {
            for (let sanc of this.sanctuaries) {
                this.defineSanctuary(sanc, TEAM_BLUE, `sanctuaryTier${newSancTier}`);
            }
            sockets.broadcast(`The sanctuaries have upgraded to tier ${newSancTier}.`);
            this.sanctuaryTier = newSancTier;
        }
    }

    init() {

        if (typeof room.spawnable[TEAM_BLUE] !== "object") {
            console.log('room spawnable -1 is not an object:', room.spawnable[TEAM_BLUE]);
            console.log(room.spawnable);
            return;
        }

        Object.keys(room.spawnable[TEAM_BLUE]).forEach(key => {
            const tile = room.spawnable[TEAM_BLUE][key];
            if (room.sirens[`${tile.gridLoc.x},${tile.gridLoc.y}`]) {
                this.leftTowers += 1;
                this.spawnSiren(tile, TEAM_BLUE, "siren");
            } else {
                this.leftTowers += 1;
                this.spawnSanctuary(tile, TEAM_BLUE, "sanctuaryTier1");
            }
        });
    }

    //runs every second
    loop() {
        //the timer has ran out? reset timer and spawn the next wave
        if (this.timer <= 0) {
            this.timer = 150; // 5 seconds
            this.waveId++;
            if (this.waves[this.waveId]) {
                this.spawnWave(this.waveId);

                //if there is no next wave then simply let the players win
            } else {
                this.playerWin();
            }

            //if the timer has not ran out and there arent any remaining enemies left, decrease the timer
        } else if (!this.remainingEnemies) {
            this.timer--;
        }
        if (this.leftTowers === 0) {
            this.playerLose();
        }
    }
}

module.exports = { WarFront };