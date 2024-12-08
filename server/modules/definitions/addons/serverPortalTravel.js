const { combineStats } = require('../facilitators.js');
const { base } = require('../constants.js');
const g = require('../gunvals.js');

// Portal Class Definition

Class.portalAura = {
    PARENT: "bullet",
    MOTION_TYPE: "withMaster",
    CLEAR_ON_MASTER_UPGRADE: true,
    ALPHA: 0,
    BODY:{
        HEALTH: base.HEALTH * 1000,
        DAMAGE: 0,
        DENSITY: 0,
        SPEED: 0,
        PUSHABILITY: 0,
    },
    ON: [{
        event: 'tick',
        handler: ({body}) => {
                body.SIZE -= 1
                if (body.alpha < 1) body.alpha += 0.02;
                if (body.SIZE < 3) body.kill();
        }
    },
  ],
  TURRETS: [
        {
            POSITION: [20, 0, 0, 0, 0, 1],
            TYPE: ["egg",{COLOR: "#ffffff"}],
        },
  ],
}

Class.serverPortal = {
    PARENT: ["genericTank"],
    // TYPE: "portal",
    LABEL: "Travel Portal",
    UPGRADE_LABEL: "Portal",
    NAME: "Portal",
    COLOR: "#000000",
    BODY: {
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
        PUSHABILITY: 0,
        DENSITY: 0,
    },
    FACING_TYPE: "autospin",
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    IGNORED_BY_AI: true,
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DISPLAY_NAME: true,
    SIZE: 30,
    GUNS: [
        {
        POSITION: [2, 14, 1, 2.5, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic,{damage: 0, speed: 0, maxSpeed: 0, reload: 0.4, recoil: 0, size: 3}]),
          TYPE: ["portalAura"],
          SYNCS_SKILLS: true,
          AUTOFIRE: true,
        },
      },
    ],
};

// Server chooser

const chooseAvailableServers = [
    {
        ip: "citrine-sunny-music.glitch.me",
        name: "Server 1"
    }
]

function chooseServer() {
    let availableServers = [];
    for (let server of chooseAvailableServers) {
        if ((fetch(`https://${server.ip}/checkAvailable`).then(r => r.json()).catch(() => false))) availableServers.push(server);
    }
    if (availableServers.length < 1) return false;
    let server = availableServers[Math.floor(Math.random() * availableServers.length)];
    return { name: server.name.trim(), destination: `${server.ip.includes("localhost") ? "http://" : "https://"}${server.ip}` };
}
let data = chooseServer();
console.log(data);

global.serverPortalTravel = class {
    static active = [];
    static async spawnRandom() {
        let server = await chooseServer();
        if (server) {
            let portal = new global.serverPortalTravel(server.name, server.destination);
            let loc = {};
            let tries = 50;
            do {
                loc = room.random();
            } while (tries-- && dirtyCheck(loc, 50))
            portal.spawn(room.random(), 60000);
            return portal;
        }
        setTimeout(() => Portal.spawnRandom(), 1000);
    }
    constructor(name, destination) {
        this.name = name;
        this.destination = destination;
        this.body = null;
        this.ticksLeft = 0;
    }
    spawn(loc, duration) {
        this.body = new Entity(loc);
        this.body.define("serverPortal");
        this.body.godmode = true;
        this.body.team = -101;
        this.body.isPortal = true;
        this.body.name = this.name;
        this.body.settings.destination = this.destination;
        this.body.allowedOnMinimap = true;
        this.body.alwaysShowOnMinimap = true;
        setTimeout(() => {
            this.body.destroy();
            let index = serverPortalTravel.active.indexOf(this);
            if (index !== -1) serverPortalTravel.active.remove(index);
        }, duration);
        serverPortalTravel.active.push(this);
    }
}

function spawnPortalLoop() {
    setTimeout(() => {
        serverPortalTravel.spawnRandom();
        spawnPortalLoop();
    }, 10000);
}

module.exports = () => spawnPortalLoop();