const { base } = require("../constants.js");
const g = require("../gunvals.js");
const {
  addAura,
  makeAuto,
  makeDeco,
  makeTurret,
  makeOver,
  combineStats,
  weaponArray,
} = require("../facilitators.js");
const { statnames, smshskl } = require("../constants.js");
// Addon for base turretopia stuff
const fakeGun = [
  {
    POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        g.basic,
        g.gunner,
        g.machineGunner,
        { size: 0.6 },
      ]),
      TYPE: "bullet",
    },
  },
];
const healProperties = {
  HEALER: true,
  BODY: {
    DAMAGE: -1,
  },
  TURRETS: [
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "healerSymbol",
    },
  ],
};
const smashBody = [
  {
    POSITION: [21.5, 0, 0, 0, 360, 0],
    TYPE: "smasherBody",
  },
];
const sentinelMinionProps = {
  PARENT: "drone",
  LABEL: "",
  UPGRADE_COLOR: "purple",
  COLOR: "mirror",
  DRAW_HEALTH: true,
  HAS_NO_RECOIL: true,
  CONTROLLERS: [
    "nearestDifferentMaster",
    "mapAltToFire",
    "minion",
    "canRepel",
    "hangOutNearMaster",
  ],
  SHAPE: 5,
};
const polyGuns = [
  {
    POSITION: [7.25, 9, 1.2, 8, 0, 90, 0],
  },
  {
    POSITION: [7.25, 9, 1.2, 8, 0, 270, 0],
  },
  {
    POSITION: [5.25, 12, 1.2, 8, 0, 90, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        g.drone,
        g.sunchip,
        g.negro,
        { reload: 0.8 },
      ]),
      TYPE: "sunchippoly",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "necro",
      WAIT_TO_CYCLE: true,
      DELAY_SPAWN: false,
    },
  },
  {
    POSITION: [5.25, 12, 1.2, 8, 0, 270, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        g.drone,
        g.sunchip,
        g.negro,
        { reload: 0.8 },
      ]),
      TYPE: "trichippoly",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "necro",
      WAIT_TO_CYCLE: true,
      DELAY_SPAWN: false,
    },
  },
];
Class.healerTrap = {
  PARENT: "trap",
  ...healProperties,
};
Class.healerSwarm = {
  PARENT: "swarm",
  ...healProperties,
};

Class.fireAura1 = addAura(1, 1, 0.36);
Class.fireAura2 = addAura(1, 1.25, 0.33);
Class.fireAura3 = addAura(1, 1.5, 0.3);
Class.smashAura1 = addAura(5, 1, 0.36);
Class.smashAura2 = addAura(5, 1.25, 0.33);
Class.smashAura3 = addAura(5, 1.5, 0.3);

Class.auraSmasher = {
  PARENT: "smasher",
  LABEL: "Troposphere Smasher",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "smashAura3",
    },
  ],
};

Class.doubleAuraSmasher = {
  PARENT: "smasher",
  LABEL: "Stratosphere Smasher",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "smashAura2",
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "smashAura3",
    },
  ],
};

Class.tripleAuraSmasher = {
  PARENT: "smasher",
  LABEL: "Mesosphere Smasher",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "smashAura1",
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "smashAura2",
    },
    {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: "smashAura3",
    },
  ],
};
Class.radical = {
  PARENT: "genericTank",
  LABEL: "Radical",
  DANGER: 5,
  BODY: {
    PUSHABILITY: 1,
    HETERO: 3,
  },
  GUNS: [
    {
      POSITION: {
        LENGTH: 18,
        WIDTH: 8,
        ASPECT: 1,
        X: 0,
        Y: 0,
        ANGLE: 0,
        DELAY: 0,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [5, 5.5, 0.6, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
        TYPE: "swarm",
      },
    },
  ],
};
Class.advanced = {
  PARENT: "radical",
  LABEL: "Advanced",
  GUNS: [
    {
      POSITION: {
        LENGTH: 18,
        WIDTH: 8,
        ASPECT: 1,
        X: 0,
        Y: 0,
        ANGLE: 0,
        DELAY: 0,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: "bullet",
      },
    },
    ...fakeGun,
  ],
};
Class.arbitrator = {
  PARENT: "genericTank",
  LABEL: "Arbitrator",
  DANGER: 7,
  GUNS: [
    {
      POSITION: [10.5, 15.75, 1.33, 5.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.machineGun,
          g.twin,
          g.triplet,
          g.spam,
          g.spam,
          { size: 0.7, health: 1.05, range: 0.8, reload: 1, recoil: 0.1 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [10.5, 14.5, 1.33, 7.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.machineGun,
          g.twin,
          g.triplet,
          g.spam,
          g.spam,
          { size: 0.65, health: 1.05, range: 0.8, reload: 1.05, recoil: 0.1 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [10.5, 12.25, 1.25, 9.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.machineGun,
          g.twin,
          g.triplet,
          g.spam,
          g.spam,
          { size: 0.7, health: 1.05, range: 0.8, reload: 1.1, recoil: 0.1 },
        ]),
        TYPE: "bullet",
      },
    },
    ...fakeGun,
  ],
};
Class.realtor = {
  PARENT: "genericTank",
  LABEL: "Retaliator",
  DANGER: 7,
  GUNS: [
    {
      POSITION: [10.5, 14.5, 1.33, 7.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.machineGun,
          g.twin,
          g.triplet,
          g.spam,
          g.spam,
          { size: 0.65, health: 1.05, range: 0.8, reload: 1.05, recoil: 0.1 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [10.5, 12.25, 1.25, 9.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.machineGun,
          g.twin,
          g.triplet,
          g.spam,
          g.spam,
          { size: 0.7, health: 1.05, range: 0.8, reload: 1.1, recoil: 0.1 },
        ]),
        TYPE: "bullet",
      },
    },
    ...fakeGun,
  ],
};
Class.bumblebee = {
  PARENT: "genericTank",
  LABEL: "Bumblebee",
  DANGER: 6,
  SHAPE: 0,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.1 * base.FOV,
  },
  GUNS: [
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
        Y: 5.5,
        ANGLE: 15,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
        Y: -5.5,
        ANGLE: -15,
        DELAY: 1 / 2,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
  ],
};
Class.beeNest = {
  PARENT: "genericTank",
  LABEL: "Nest",
  DANGER: 7,
  SHAPE: 6,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.2 * base.FOV,
  },
  GUNS: weaponArray(
    {
      POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    3,
    1 / 3
  ),
};
Class.megaNest = {
  PARENT: "genericTank",
  LABEL: "Mega Nest",
  DANGER: 8,
  SHAPE: 6,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.2 * base.FOV,
  },
  GUNS: weaponArray(
    {
      POSITION: [7, 10.5, 0.7, 7, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    3,
    1 / 3
  ),
};
Class.beeHive = {
  PARENT: "genericTank",
  LABEL: "Hive",
  DANGER: 7,
  SHAPE: 6,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.3 * base.FOV,
  },
  GUNS: weaponArray(
    {
      POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    6,
    1 / 6
  ),
};
Class.wasp = makeAuto(Class.bee, "Wasp", { type: "droneAutoTurret" });
Class.beeGuardian = {
  PARENT: "elite",
  LABEL: "Bee Guardian",
  SHAPE: 6,
  SIZE: 36,
  COLOR: "gold",
  GUNS: [
    ...weaponArray(
      {
        POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.swarm,
            g.battleship,
            g.bee,
            { speed: 0.6, maxSpeed: 0.6, health: 1.1, resist: 1.05, size: 0.7 },
          ]),
          TYPE: "wasp",
          STAT_CALCULATOR: "swarm",
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true,
        },
      },
      3
    ),
    ...weaponArray(
      {
        POSITION: [7, 7.5, 0.7, 7, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.swarm,
            g.battleship,
            g.bee,
            { speed: 0.6, maxSpeed: 0.6, health: 1.1, resist: 1.05, size: 0.7 },
          ]),
          TYPE: "wasp",
          STAT_CALCULATOR: "swarm",
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true,
        },
      },
      3
    ),
  ],
  TURRETS: weaponArray(
    {
      POSITION: [3.5, 7, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true, COLOR: "gold" }],
    },
    6
  ),
};
Class.hornet = {
  PARENT: "bee",
  BODY: {
    HEALTH: 0.1,
    DAMAGE: 6.5,
    PENETRATION: 3,
    SPEED: 5,
  },
};
Class.hornetNest = {
  PARENT: "genericTank",
  LABEL: "Hornet Nest",
  DANGER: 7,
  SHAPE: 6,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.3 * base.FOV,
  },
  GUNS: weaponArray(
    {
      POSITION: [9, 6.5, 0.7, 7, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 0.7 }]),
        TYPE: ["hornet", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    3,
    1 / 3
  ),
};
Class.waspNest = {
  PARENT: "genericTank",
  LABEL: "Wasp Nest",
  DANGER: 7,
  SHAPE: 6,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.3 * base.FOV,
  },
  GUNS: weaponArray(
    [
      {
        POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
          TYPE: ["wasp", { INDEPENDENT: true }],
          STAT_CALCULATOR: "swarm",
          SYNCS_SKILLS: true,
          WAIT_TO_CYCLE: true,
        },
      },
      {
        POSITION: [5, 6, 0, 7, 0, 60, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.fake, { reload: 99 }]),
        },
      },
    ],
    3,
    1 / 3
  ),
};
Class.queenBee = {
  PARENT: "genericTank",
  LABEL: "Queen Bee",
  DANGER: 7,
  SHAPE: 6,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.3 * base.FOV,
  },
  GUNS: weaponArray(
    {
      POSITION: [7, 7.5, -0.7, 7, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.bee,
          g.machineGunner,
          { reload: 0.7 },
        ]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    3,
    1 / 3
  ),
};
Class.doubleDestroyer = {
  PARENT: "genericTank",
  LABEL: "Rampage",
  DANGER: 7,
  GUNS: [
    {
      POSITION: {
        LENGHT: 21,
        WIDTH: 14,
        ASPECT: 1,
        Y: -7.5,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: {
        LENGHT: 21,
        WIDTH: 14,
        ASPECT: 1,
        Y: 7.5,
        DELAY: 1 / 2,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.bulldozer = {
  PARENT: "genericTank",
  LABEL: "Bulldozer",
  DANGER: 7,
  BODY: {
    FOV: base.FOV * 1.25,
    DAMAGE: 0.7 * base.DAMAGE,
  },
  GUNS: [
    {
      POSITION: [16, 4, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 6, 1, 0, 5.5, 25, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.gunner,
          { recoil: 0.85, size: 0.6 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 6, 1, 0, -5.5, -25, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.gunner,
          { recoil: 0.85, size: 0.6 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [16, 19, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [18, 7, 1, 0, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 7, 1, 0, -4, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [14, 5, 1, 0, 5.5, 205, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.gunner,
          { recoil: 1.15, size: 0.6 },
        ]),
        TYPE: "bullet",
      },
    },

    {
      POSITION: [14, 5, 1, 0, -5.5, -205, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.gunner,
          { recoil: 1.15, size: 0.6 },
        ]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.planet = {
  LABEL: "Planet",
  PARENT: "satellite",
  BODY: {
    PENETRATION: 1.5,
    PUSHABILITY: 0.6,
    ACCELERATION: 0.75,
    HEALTH: 0.55,
    DAMAGE: 3.4,
    SPEED: 10,
    RANGE: 200,
    DENSITY: 0.03,
    RESIST: 1.5,
    FOV: 0.5,
  },
  TURRETS: [...smashBody],
};
Class.starDeco = makeDeco(6, "darkGrey");
Class.starSystem = {
  PARENT: "genericSmasher",
  LABEL: "Star System",
  ANGLE: 60,
  CONTROLLERS: ["whirlwind"],
  HAS_NO_RECOIL: true,
  STAT_NAMES: statnames.starSystem,
  SKILL_CAP: [
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
  ],
  TURRETS: [
    {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: "starDeco",
    },
    ...smashBody,
  ],
  AI: {
    SPEED: 2,
  },
  GUNS: (() => {
    let output = [];
    for (let i = 0; i < 3; i++) {
      output.push({
        POSITION: { WIDTH: 16, LENGTH: 1, DELAY: i * 0.25 },
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.satellite,
            g.destroyer,
            g.pounder,
            { size: 1.4, reload: 3.65, damage: 0.85 },
          ]),
          TYPE: ["planet", { ANGLE: i * 120 }],
          MAX_CHILDREN: 1,
          AUTOFIRE: true,
          SYNCS_SKILLS: false,
          WAIT_TO_CYCLE: true,
          STAT_CALCULATOR: "fixedReload",
        },
      });
    }
    return output;
  })(),
};
Class.beeTank = {
  PARENT: "genericTank",
  LABEL: "Bee tank",
  SHAPE: 0,
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.1 * base.FOV,
  },
  GUNS: [
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { speed: 0.6, damage: 0.7 }]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: ["swarm", "fixedReload"],
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
  ],
};
Class.bee2Tank = {
  PARENT: "genericTank",
  LABEL: "",
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.1 * base.FOV,
  },
  GUNS: [
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.bee,
          { speed: 0.75, size: 0.75, damage: 0.5 },
          g.babyDrone,
        ]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: ["swarm", "fixedReload"],
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
        ANGLE: 180,
        DELAY: 1 / 2,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.bee,
          { speed: 0.75, size: 0.75, damage: 0.5 },
          g.babyDrone,
        ]),
        TYPE: "bee",
        STAT_CALCULATOR: ["swarm", "fixedReload"],
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
  ],
};
Class.beeTurret = makeTurret(Class.beeTank, {
  hasAI: true,
  INDEPENDENT: true,
  limitFov: true,
  fov: 3,
});
Class.bee2Turret = makeTurret(Class.bee2Tank, {
  hasAI: true,
  INDEPENDENT: true,
  limitFov: true,
  fov: 3,
});
Class.beeDrone = makeAuto(Class.drone, "Soldier", { type: "beeTurret" });
Class.beeDrone2 = makeAuto(Class.drone, "Super Soldier", {
  type: "bee2Turret",
});
Class.storm = {
  PARENT: "genericTank",
  LABEL: "Storm",
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  GUNS: [
    {
      POSITION: [9, 7, 1.6, 7, 0, 0, 0],
    },
    {
      POSITION: [6, 11, 1.3, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone]),
        TYPE: "beeDrone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        MAX_CHILDREN: 6,
        WAIT_TO_CYCLE: true,
      },
    },
  ],
};
Class.cortex = {
  PARENT: "genericTank",
  LABEL: "Cortex",
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  GUNS: [
    {
      POSITION: [9, 7, 1.6, 7, 0, 0, 0],
    },
    {
      POSITION: [12, 3, 1.6, 7, 0, 0, 0],
    },
    {
      POSITION: [6, 11, 1.3, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone]),
        TYPE: "beeDrone2",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        MAX_CHILDREN: 6,
        WAIT_TO_CYCLE: true,
      },
    },
  ],
};
Class.wraith = {
  PARENT: "genericTank",
  LABEL: "Wraith",
  DANGER: 7,
  SHAPE: 0,
  FACING_TYPE: "locksFacing",
  STAT_NAMES: statnames.swarm,
  BODY: {
    FOV: 1.2 * base.FOV,
  },
  GUNS: [
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
        Y: 4,
        ANGLE: 15,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 7.5,
        ASPECT: 0.7,
        X: -3,
        Y: -4,
        ANGLE: -15,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
        TYPE: ["bee", { INDEPENDENT: true }],
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 8.5,
        ASPECT: 0.6,
        X: -3,
        Y: 5.5,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
        TYPE: "swarm",
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    {
      POSITION: {
        LENGHT: 1,
        WIDTH: 8.5,
        ASPECT: 0.6,
        X: -3,
        Y: -5.5,
        DELAY: 1 / 2,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
        TYPE: "swarm",
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
  ],
};
Class.occult = makeDeco(4);
Class.explosion = {
  PARENT: "growBullet",
  BODY: {
    DAMAGE: 9,
    HEALTH: 9,
    PEN: 9,
  },
  LABEL: "Explosion",
};
Class.expansive = {
  PARENT: "genericSmasher",
  LABEL: "Expansive",
  DANGER: 7,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smasherBody",
    },
    {
      POSITION: [13, 0, 0, 0, 300, 1],
      TYPE: "occult",
    },
  ],
  GUNS: [
    {
      POSITION: {
        LENGTH: 2,
        WIDTH: 8,
        ASPECT: 1,
        X: -2,
        Y: 0,
        ANGLE: 0,
        DELAY: 0,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pounder,
          g.destroyer,
          g.annihilator,
          {
            recoil: 0,
            reload: 7.5,
            speed: 0.01,
            maxSpeed: 0.01,
            damage: 2.25,
            health: 2.25,
            pen: 2.25,
          },
        ]),
        TYPE: "explosion",
        ALPHA: 0,
      },
    },
  ],
};
Class.gunnerCruiser = {
  PARENT: "genericTank",
  LABEL: "Gunner Cruiser",
  DANGER: 7,
  BODY: {
    FOV: 1.2 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [8, 7.5, 0.6, 4, 5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
        TYPE: "swarm",
        STAT_CALCULATOR: "swarm",
      },
    },
    {
      POSITION: [8, 7.5, 0.6, 4, -5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
        TYPE: "swarm",
        STAT_CALCULATOR: "swarm",
      },
    },
    {
      POSITION: [16, 3.5, 1, 0, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.gunner,
          { speed: 1.2 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [16, 3.5, 1, 0, -4, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.gunner,
          { speed: 1.2 },
        ]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.prophet = {
  PARENT: "genericTank",
  LABEL: "Prophet",
  DANGER: 7,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  SHAPE: 4,
  NECRO: true,
  ANGLE: 90,
  CONTROLLERS: ["whirlwind"],
  HAS_NO_RECOIL: true,
  STAT_NAMES: statnames.whirlwind,
  TURRETS: [
    {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: "tornadoDeco",
    },
  ],
  AI: {
    SPEED: 2,
  },
  GUNS: (() => {
    let output = [];
    for (let i = 0; i < 4; i++) {
      output.push({
        POSITION: { WIDTH: 8, LENGTH: 1, DELAY: i * 0.25 },
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.satellite]),
          TYPE: ["squareSatellite", { ANGLE: i * 90 }],
          MAX_CHILDREN: 1,
          AUTOFIRE: true,
          SYNCS_SKILLS: false,
          WAIT_TO_CYCLE: true,
        },
      });
    }
    return output;
  })(),
};
Class.prophet.GUNS.push(
  {
    POSITION: [5.25, 12, 1.2, 8, 0, 90, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, { reload: 0.8 }]),
      TYPE: "sunchip",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "necro",
      WAIT_TO_CYCLE: true,
      DELAY_SPAWN: false,
      MAX_CHILDREN: 7,
    },
  },
  {
    POSITION: [5.25, 12, 1.2, 8, 0, 270, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, { reload: 0.8 }]),
      TYPE: "sunchip",
      AUTOFIRE: true,
      SYNCS_SKILLS: true,
      STAT_CALCULATOR: "necro",
      WAIT_TO_CYCLE: true,
      DELAY_SPAWN: false,
      MAX_CHILDREN: 7,
    },
  }
);
Class.triangleSatellite = {
  PARENT: "satellite",
  SHAPE: 3,
};
Class.sentryDeco = makeDeco(3, "pink");
Class.sentrySeer = {
  PARENT: "genericTank",
  LABEL: "Sentryseer",
  MAX_CHILDREN: 3,
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: 1.1,
  },
  GUNS: [
    {
      POSITION: [6, 12, 1.2, 8, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          { reload: 2, size: 1.5, speed: 0.6, maxSpeed: 0.6, heath: 0.9 },
        ]),
        TYPE: ["sentrySwarmMinion", { COLOR: "mirror" }],
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
      },
    },
    {
      POSITION: [6, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          { reload: 2, size: 1.5, speed: 0.6, maxSpeed: 0.6, heath: 0.9 },
        ]),
        TYPE: ["sentryTrapMinion", { COLOR: "mirror" }],
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
      },
    },
    {
      POSITION: [6, 12, 1.2, 8, 0, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          { reload: 2, size: 1.5, speed: 0.6, maxSpeed: 0.6, heath: 0.9 },
        ]),
        TYPE: ["sentryGunMinion", { COLOR: "mirror" }],
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
      },
    },
    ...weaponArray(
      {
        POSITION: [6, 12, 0.1, 8, 0, 120, 0],
        PROPERTIES: {
          COLOR: "pink",
        },
      },
      3
    ),
  ],
};
Class.sentinelLauncherMinion = {
  ...sentinelMinionProps,
  LABEL: "Missile Sentinel",
  GUNS: [
    {
      POSITION: [3, 12.45, -1.35, 17.2, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pounder,
          g.launcher,
          { damage: 0.45 },
        ]),
        TYPE: "sentinelMissile",
      },
    },
    {
      POSITION: [17.5, 13, 1.25, 0, 0, 0, 0],
    },
    {
      POSITION: [18.55, 20.25, 0.25, 1, 0, 0, 0],
    },
  ],
};
Class.overviewer = {
  PARENT: "genericTank",
  LABEL: "Overviewer",
  DANGER: 6,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: 1.1 * base.FOV,
  },
  MAX_CHILDREN: 8,
  GUNS: weaponArray(
    {
      POSITION: [6, 12, 1.2, 8, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { reload: 1.1 }]),
        TYPE: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        WAIT_TO_CYCLE: true,
      },
    },
    3
  ),
};
Class.sentinelCrossbowMinion = {
  ...sentinelMinionProps,
  LABEL: "Crossbow Sentinel",
  GUNS: [
    {
      POSITION: [15, 2.5, 1, 0, 3.5, 35 / 2, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          { speed: 0.7, maxSpeed: 0.7 },
          g.crossbow,
          { recoil: 0.5 },
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [15, 2.5, 1, 0, -3.5, -35 / 2, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          { speed: 0.7, maxSpeed: 0.7 },
          g.crossbow,
          { recoil: 0.5 },
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [20, 3.5, 1, 0, 4, 0, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          { speed: 0.7, maxSpeed: 0.7 },
          g.crossbow,
          { recoil: 0.5 },
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [20, 3.5, 1, 0, -4, 0, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          { speed: 0.7, maxSpeed: 0.7 },
          g.crossbow,
          { recoil: 0.5 },
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [24, 7, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.rifle,
          { speed: 0.7, maxSpeed: 0.7, reload: 2, recoil: 0.5 },
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.sentinelMinigunMinion = {
  ...sentinelMinionProps,
  LABEL: "Minigun Sentinel",
  GUNS: [
    {
      POSITION: [16, 7.5, 1, 0, 4.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [11.5, 7.5, -1.33, 1, 4.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [16, 7.5, 1, 0, -4.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [11.5, 7.5, -1.33, 1, -4.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [22.5, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [20.4, 9, 1, 0, 0, 0, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18.3, 9, 1, 0, 0, 0, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minigun,
          g.twin,
          g.spam,
          g.spam,
          { damage: 0.45 },
        ]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.watchwoman = {
  PARENT: "genericTank",
  LABEL: "Watchwoman",
  DANGER: 7,
  SHAPE: 5,
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "pentagon",
    },
  ],
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: 1.1,
  },
  GUNS: [
    {
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1, 15.5, 0, 0, 1 / 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          {
            reload: 7.5,
            size: 2,
            health: 4,
            damage: 1.2,
            pen: 1.2,
            speed: 0.45,
            maxSpeed: 0.45,
          },
        ]),
        TYPE: "sentinelLauncherMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [12, 14, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1, 15.5, 0, 0, 1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          {
            reload: 7.5,
            size: 2,
            health: 4,
            damage: 1.2,
            pen: 1.2,
            speed: 0.45,
            maxSpeed: 0.45,
          },
        ]),
        TYPE: "sentinelCrossbowMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [2, 14, 1, 15.5, 0, 0, 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          {
            reload: 7.5,
            size: 2,
            health: 4,
            damage: 1.2,
            pen: 1.2,
            speed: 0.45,
            maxSpeed: 0.45,
          },
        ]),
        TYPE: "sentinelMinigunMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
  ],
};
Class.megaMinion = {
  PARENT: "minion",
  LABEL: "Mega Minion",
  GUNS: [
    {
      POSITION: [17, 13, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.minionGun,
          g.pounder,
          g.destroyer,
          { reload: 0.7, damage: 0.75, health: 0.75 },
        ]),
        WAIT_TO_CYCLE: true,
        TYPE: "bullet",
      },
    },
  ],
};
Class.topBanana = {
  PARENT: "factory",
  LABEL: "Top Banana",
  GUNS: [
    {
      POSITION: [5, 17, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [2, 20, 1, 15.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          { reload: 5, size: 1.1, health: 6, speed: 0.5, maxSpeed: 0.55 },
        ]),
        TYPE: "megaMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [12, 20, 1, 0, 0, 0, 0],
    },
  ],
};
Class.foundry = {
  PARENT: "factory",
  LABEL: "Foundry",
  GUNS: [
    {
      POSITION: [5, 13, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [2, 16, 1, 15.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          { reload: 3.5, size: 1.1, health: 2, speed: 0.65, maxSpeed: 0.7 },
        ]),
        TYPE: "megaMinion",
        MAX_CHILDREN: 3,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [12, 16, 1, 0, 0, 0, 0],
    },
  ],
};
Class.enchanter = {
  PARENT: "genericTank",
  LABEL: "Enchanter",
  DANGER: 7,
  NECRO: true,
  STAT_NAMES: statnames.necro,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  SHAPE: 3,
  MAX_CHILDREN: 14,
  GUNS: weaponArray(
    {
      POSITION: [5.25, 12, 1.2, 8, 0, 60, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
        ]),
        TYPE: "trichip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
    3
  ),
};
Class.preacher = {
  PARENT: "genericTank",
  LABEL: "Preacher",
  DANGER: 7,
  NECRO: true,
  STAT_NAMES: statnames.necro,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  SHAPE: 5,
  MAX_CHILDREN: 8,
  GUNS: weaponArray(
    {
      POSITION: [5.25, 9, 1.2, 8, 0, 30, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
          g.pounder,
          { size: 2, speed: 0.9, maxSpeed: 0.9 },
        ]),
        TYPE: "pentachip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
    5, 1/5
  ),
};
Class.necroa = {
  PARENT: "genericTank",
  LABEL: "Necroa",
  DANGER: 7,
  NECRO: true,
  STAT_NAMES: statnames.necro,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  SHAPE: 6,
  MAX_CHILDREN: 6,
  GUNS: weaponArray(
    {
      POSITION: [5.25, 8, 1.2, 8, 0, 0, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
          g.pounder,
          g.destroyer,
          { size: 2.5, speed: 1.4, maxSpeed: 1.4 },
        ]),
        TYPE: "falsechip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
    6, 1/6
  ),
};
Class.sunchippoly = {
  PARENT: "sunchip",
  NECRO: [3, 4, 5, 6],
};
Class.trichippoly = {
  PARENT: "trichip",
  NECRO: [3, 4, 5, 6],
};
Class.pentachippoly = {
  PARENT: "pentachip",
  NECRO: [3, 4, 5, 6],
};
Class.hexachippoly = {
  PARENT: "realchip",
  NECRO: [3, 4, 5, 6],
};
Class.polyseer = {
  PARENT: "genericTank",
  LABEL: "Polyseer",
  DANGER: 6,
  UPGRADE_TOOLTIP:
    "[WARNING] This tank cannot use it's body to reanimate shapes!",
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  SHAPE: 7,
  MAX_CHILDREN: 14,
  GUNS: polyGuns,
};
Class.polymancer = {
  PARENT: "genericTank",
  LABEL: "Polymancer",
  DANGER: 6,
  UPGRADE_TOOLTIP:
    "[WARNING] This tank cannot use it's body to reanimate shapes!",
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  SHAPE: 8,
  MAX_CHILDREN: 14,
  GUNS: [
    ...polyGuns,
    {
      POSITION: [7.25, 9, 1.2, 8, 0, 180, 0],
    },
    {
      POSITION: [7.25, 9, 1.2, 8, 0, 0, 0],
    },
    {
      POSITION: [5.25, 12, 1.2, 8, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
          g.pounder,
          { reload: 1.5, size: 1.5 },
        ]),
        TYPE: "pentachippoly",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
    {
      POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
          g.pounder,
          { reload: 2, size: 2 },
        ]),
        TYPE: "hexachippoly",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
  ],
};
Class.screamer = {
  PARENT: "genericTank",
  LABEL: "Screamer",
  DANGER: 6,
  UPGRADE_TOOLTIP:
    "[WARNING] This tank cannot use it's body to reanimate shapes!",
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.1,
  },
  MAX_CHILDREN: 14,
  GUNS: [
    ...polyGuns,
    {
      POSITION: {
        LENGTH: 24,
        WIDTH: 8.5,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [21, 14, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.kiloMinion = {
  PARENT: "minion",
  LABEL: "Big Minion",
  GUNS: [
    {
      POSITION: [17, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.pounder]),
        WAIT_TO_CYCLE: true,
        TYPE: "bullet",
      },
    },
  ],
};
Class.trapMinion = {
  PARENT: "minion",
  LABEL: "Trapper Minion",
  GUNS: [
    {
      POSITION: {
        LENGTH: 15,
        WIDTH: 7,
      },
    },
    {
      POSITION: {
        LENGTH: 3,
        WIDTH: 7,
        ASPECT: 1.7,
        X: 15,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.minionGun]),
        TYPE: "trap",
        STAT_CALCULATOR: "trap",
      },
    },
  ],
};
Class.desmosMinion = {
  PARENT: "minion",
  LABEL: "Desmos Minion",
  GUNS: [
    {
      POSITION: [20, 8, -4 / 3, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
        TYPE: ["bullet", { CONTROLLERS: ["snake"] }],
      },
    },
    {
      POSITION: [3.75, 10, 2.125, 1.5, -6.25, 90, 0],
    },
    {
      POSITION: [3.75, 10, 2.125, 1.5, 6.25, -90, 0],
    },
  ],
};
Class.cloner = {
  PARENT: "factory",
  LABEL: "Cloner",
  GUNS: [
    {
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [2, 17, 1, 15.5, 0, 0, 1 / 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory]),
        TYPE: "desmosMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [12, 14, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [2, 17, 1, 15.5, 0, 0, 1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory]),
        TYPE: "trapMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [2, 17, 1, 15.5, 0, 0, 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          { reload: 3, size: 1.2, health: 4, speed: 0.75, maxSpeed: 0.75 },
        ]),
        TYPE: "kiloMinion",
        MAX_CHILDREN: 1,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
  ],
};
Class.triMinion = {
  PARENT: "minion",
  LABEL: "Triangle Minion",
  SHAPE: 3,
  GUNS: weaponArray(
    {
      POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          { damage: 2, health: 1.5, reload: 1.75 },
        ]),
        TYPE: "swarm",
        STAT_CALCULATOR: "swarm",
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
      },
    },
    3,
    1 / 3
  ),
};
Class.inventor = {
  PARENT: "factory",
  LABEL: "Inventor",
  SHAPE: 3,
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "triangle",
    },
  ],
  GUNS: [
    {
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1, 15.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { reload: 2.35, health: 2 }]),
        TYPE: "triMinion",
        MAX_CHILDREN: 3,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [12, 14, 1, 0, 0, 0, 0],
    },
  ],
};
Class.squareMinion = {
  PARENT: "minion",
  LABEL: "Square Minion",
  SHAPE: 4,
  GUNS: [
    {
      POSITION: [7, 7.5, 0.7, 7, 5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.twin]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [7, 7.5, 0.7, 7, -5.5, 0, 1 / 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.twin]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.sqrtFactory = {
  PARENT: "factory",
  LABEL: "Square Dance",
  SHAPE: 4,
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "square",
    },
  ],
  GUNS: [
    {
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1, 15.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { reload: 1.7, health: 1.5 }]),
        TYPE: "squareMinion",
        MAX_CHILDREN: 4,
        STAT_CALCULATOR: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
      },
    },
    {
      POSITION: [12, 14, 1, 0, 0, 0, 0],
    },
  ],
};
Class.realstar = {
  PARENT: "genericTank",
  LABEL: "Star",
  GUNS: weaponArray(
    {
      POSITION: {
        LENGTH: 20.5,
        WIDTH: 12,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
        TYPE: "bullet",
      },
    },
    3
  ),
};
Class.deathstar = {
  PARENT: "genericTank",
  LABEL: "Death Star",
  GUNS: weaponArray(
    {
      POSITION: {
        LENGTH: 20.5,
        WIDTH: 12,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
        TYPE: "bullet",
      },
    },
    6,
    0.5
  ),
};
Class.neutronstar = {
  PARENT: "genericTank",
  LABEL: "Neutron Star",
  GUNS: weaponArray(
    {
      POSITION: [21, 14, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flankGuard,
          g.pounder,
          g.destroyer,
        ]),
        TYPE: "bullet",
      },
    },
    3
  ),
};
Class.apex = {
  PARENT: "genericTank",
  LABEL: "Apex",
  GUNS: weaponArray(
    [
      {
        POSITION: [24, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.sniper,
            g.hunter,
            g.hunterSecondary,
            g.flankGuard,
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [21, 12, 1, 0, 0, 0, 0.25],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.sniper,
            g.hunter,
            g.flankGuard,
          ]),
          TYPE: "bullet",
        },
      },
    ],
    3
  ),
};
Class.ringer = {
  PARENT: "genericTank",
  LABEL: "Ringer",
  GUNS: weaponArray(
    {
      POSITION: {
        LENGTH: 24,
        WIDTH: 8,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.sniper]),
        TYPE: "bullet",
      },
    },
    3
  ),
};
Class.winger = {
  PARENT: "genericTank",
  LABEL: "Winger",
  GUNS: weaponArray(
    {
      POSITION: {
        LENGTH: 24,
        WIDTH: 8,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.sniper]),
        TYPE: "bullet",
      },
    },
    6,
    0.5
  ),
};
Class.singer = {
  PARENT: "genericTank",
  LABEL: "Singer",
  GUNS: weaponArray(
    [
      {
        POSITION: [27, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [5, 8, -1.4, 8, 0, 0, 0],
      },
    ],
    3
  ),
};
Class.fullyAutomatic = {
  PARENT: "genericTank",
  LABEL: "Fully Automatic",
  BODY: {
    FOV: 1.2 * base.FOV,
  },
  GUNS: [
    {
      POSITION: {
        LENGTH: 24,
        WIDTH: 8.5,
        ASPECT: 1.4,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.machineGun]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.assaulter = {
  PARENT: "genericTank",
  LABEL: "Assaulter",
  BODY: {
    FOV: 1.2 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [28, 7, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.machineGun,
          g.lowPower,
          g.pelleter,
          g.sniper,
          { recoil: 1.15 },
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: {
        LENGTH: 24,
        WIDTH: 8.5,
        ASPECT: 1.4,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.machineGun]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.microgun = {
  PARENT: "genericTank",
  LABEL: "Microgun",
  DANGER: 6,
  BODY: {
    FOV: base.FOV * 1.2,
  },
  GUNS: [
    {
      POSITION: [24, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.sniper]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [22, 9, 1, 0, 0, 0, 1 / 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.sniper]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [20, 9, 1, 0, 0, 0, 1 / 2],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.sniper]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.hider = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Hider",
  BODY: {
    FOV: 1.35 * base.FOV,
  },
  INVISIBLE: [0.08, 0.03],
  TOOLTIP: "Stay still to turn invisible.",
  GUNS: [
    {
      POSITION: [24, 8, -1.8, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.cloak = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Cloak",
  ALPHA: 0.3,
  BODY: {
    FOV: 1.35 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [24, 8, -1.8, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.rogue = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Rogue",
  ALPHA: 0.5,
  GUNS: [
    {
      POSITION: [19, 11, -1.8, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.leader = {
  PARENT: "genericTank",
  LABEL: "Leader",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: 1.1 * base.FOV,
  },
  ALPHA: 0.3,
  MAX_CHILDREN: 8,
  GUNS: [
    {
      POSITION: [6, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { reload: 0.5 }]),
        TYPE: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
      },
    },
  ],
};
Class.shadowsunchip = {
  PARENT: "sunchip",
  NECRO: [3, 4, 5, 6],
  ALPHA: 0.3,
};
Class.shadowtrichip = {
  PARENT: "trichip",
  NECRO: [3, 4, 5, 6],
  ALPHA: 0.3,
};
Class.polyshadow = {
  PARENT: "genericTank",
  LABEL: "Polyshadower",
  DANGER: 6,
  UPGRADE_TOOLTIP:
    "[WARNING] This tank cannot use it's body to reanimate shapes!",
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: base.FOV * 1.2,
  },
  SHAPE: 9,
  MAX_CHILDREN: 14,
  ALPHA: 0.3,
  GUNS: [
    {
      POSITION: [7.25, 9, 1.2, 8, 0, 0, 0],
    },
    {
      POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
          { reload: 0.8 },
        ]),
        TYPE: "shadowsunchip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
    {
      POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          g.negro,
          { reload: 0.8 },
        ]),
        TYPE: "shadowtrichip",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "necro",
        WAIT_TO_CYCLE: true,
        DELAY_SPAWN: false,
      },
    },
  ],
};
Class.hawk = makeOver(Class.triAngle, "Hawk", { count: 1, independent: true });
Class.smashGuard = {
  PARENT: "basic",
  LABEL: "Smasher Guard",
  TURRETS: [...smashBody],
  GUNS: [
    {
      POSITION: [14, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.tankGuardian = {
  PARENT: "trapGuard",
  LABEL: "Tank Guardian",

  TURRETS: [...smashBody],
};
Class.homelandDefender = {
  PARENT: "bushwhacker",
  LABEL: "Homeland Defender",

  TURRETS: [...smashBody],
};
Class.autoTrap = makeAuto(Class.trap, "Auto-Trap", { type: "droneAutoTurret" });
Class.clusterDeco = makeDeco(0);
Class.clusterMissile = {
  PARENT: "bullet",
  LABEL: "Missile",
  INDEPENDENT: true,
  BODY: { RANGE: 120 },
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "clusterDeco",
    },
  ],
  GUNS: [
    {
      POSITION: [14, 6, 1, 0, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0.5 }, g.lowPower]),
        TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
      },
    },
    ...weaponArray(
      {
        POSITION: [1, 6, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic]),
          TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
          ALPHA: 0,
          SHOOT_ON_DEATH: true,
        },
      },
      8
    ),
  ],
};
Class.cluster = {
  PARENT: "bullet",
  LABEL: "Cluster",
  INDEPENDENT: true,
  BODY: { RANGE: 120 },
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "clusterDeco",
    },
  ],
  GUNS: weaponArray(
    {
      POSITION: [1, 6, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
        ALPHA: 0,
        SHOOT_ON_DEATH: true,
      },
    },
    8
  ),
};
Class.hyperClusterMissile = {
  PARENT: "bullet",
  LABEL: "Missile",
  INDEPENDENT: true,
  BODY: { RANGE: 120 },
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "clusterDeco",
    },
  ],
  GUNS: [
    {
      POSITION: [14, 6, 1, 0, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0.5 }, g.lowPower]),
        TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
      },
    },
    ...weaponArray(
      {
        POSITION: [1, 6, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, { size: 3 }]),
          TYPE: ["cluster", { PERSISTS_AFTER_DEATH: true }],
          ALPHA: 0,
          SHOOT_ON_DEATH: true,
        },
      },
      3
    ),
  ],
};
Class.neutronMissile = {
  PARENT: "bullet",
  LABEL: "Missile",
  INDEPENDENT: true,
  BODY: { RANGE: 120 },
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "clusterDeco",
    },
  ],
  GUNS: weaponArray(
    {
      POSITION: [1, 6, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.launcher,
          g.pounder,
          { size: 2.5 },
        ]),
        TYPE: ["minimissile", { PERSISTS_AFTER_DEATH: true }],
        ALPHA: 0,
        SHOOT_ON_DEATH: true,
      },
    },
    4
  ),
};
Class.tank = {
  PARENT: "genericTank",
  LABEL: "Tank"
};
Class.single = {
  PARENT: "genericTank",
  LABEL: "Single",
  DANGER: 4,
  GUNS: [
    {
      POSITION: {
        LENGTH: 18,
        WIDTH: 8,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.heavy = {
  PARENT: "genericTank",
  LABEL: "Heavy",
  DANGER: 4,
  GUNS: [
    {
      POSITION: {
        LENGTH: 17,
        WIDTH: 10.5,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.heavier]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.planetary = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Planetary",
  STAT_NAMES: statnames.mixed,
  REVERSE_TARGET_WITH_TANK: true,
  GUNS: [
    {
      POSITION: [20.5, 12, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pounder]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 12, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [2, 12, 1.1, 18, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
        TYPE: "setTrap",
        STAT_CALCULATOR: "block",
      },
    },
  ],
};
Class.barracuda = {
  PARENT: "genericTank",
  DANGER: 6,
  LABEL: "Barracuda",
  STAT_NAMES: statnames.trap,
  BODY: {
    FOV: 1.1,
  },
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [4, 8, 1.3, 18, 0, 0, 1 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.minigun, g.barricade, { range: 0.5 }]),
        TYPE: "trap",
        STAT_CALCULATOR: "trap",
      },
    },
    {
      POSITION: [4, 8, 1.3, 14, 0, 0, 2 / 3],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.minigun, g.barricade, { range: 0.5 }]),
        TYPE: "trap",
        STAT_CALCULATOR: "trap",
      },
    },
  ],
};
Class.parryer = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Parryer",
  STAT_NAMES: statnames.trap,
  FACING_TYPE: "locksFacing",
  BODY: {
    FOV: base.FOV * 1.15,
  },
  GUNS: [
    {
      POSITION: [5, 10, 1, 13, 0, 0, 0],
    },
    {
      POSITION: [6, 10, -1.5, 7, 0, 0, 0],
    },
    {
      POSITION: [2, 10, 1.3, 18, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang]),
        TYPE: "boomerang",
        STAT_CALCULATOR: "block",
      },
    },
    {
      POSITION: [6, 6, 1, 18, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: "bullet",
      },
    },
  ],
};
Class.highlord = makeOver(
  {
    PARENT: "genericTank",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    BODY: {
      FOV: base.FOV * 1.2,
    },
    GUNS: [
      {
        POSITION: [14, 8, 1, 0, 0, 180, 0],
      },
      {
        POSITION: [4, 8, 1.5, 14, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap]),
          TYPE: "trap",
          STAT_CALCULATOR: "trap",
        },
      },
      {
        POSITION: [20, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
          TYPE: "bullet",
        },
      },
    ],
  },
  "Highlord"
);
Class.bomber = {
  PARENT: "genericTank",
  LABEL: "Bomber",
  BODY: {
    DENSITY: base.DENSITY * 0.6,
  },
  DANGER: 7,
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flankGuard,
          g.triAngle,
          g.triAngleFront,
        ]),
        TYPE: "bullet",
        LABEL: "Front",
      },
    },
    {
      POSITION: [18, 8, 1, 0, 0, 130, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle]),
        TYPE: "bullet",
        LABEL: "Wing",
      },
    },
    {
      POSITION: [18, 8, 1, 0, 0, 230, 0.1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle]),
        TYPE: "bullet",
        LABEL: "Wing",
      },
    },
    {
      POSITION: [4, 8, 1.7, 13, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap]),
        TYPE: "trap",
        STAT_CALCULATOR: "trap",
      },
    },
    {
      POSITION: [13, 8, 1, 0, 0, 180, 0],
    },
    {
      POSITION: [4, 8, 1.7, 15, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap]),
        TYPE: "trap",
        STAT_CALCULATOR: "trap",
      },
    },
    {
      POSITION: [15, 8, 1, 0, 0, 180, 0],
    },
  ],
};
Class.parapet = {
  PARENT: "genericTank",
  LABEL: "Parapet",
  STAT_NAMES: statnames.mixed,
  DANGER: 7,
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flankGuard,
          g.flankGuard,
          g.twin,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.flankGuard,
          g.flankGuard,
          g.twin,
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 9, 1, 0, 5.5, 185, 0],
    },
    {
      POSITION: [2, 9, 1.1, 18, 5.5, 185, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.trap,
          g.twin,
          g.setTrap,
          g.twin,
          g.twin,
        ]),
        TYPE: "setTrap",
        STAT_CALCULATOR: "block",
      },
    },
    {
      POSITION: [18, 9, 1, 0, -5.5, 175, 0],
    },
    {
      POSITION: [2, 9, 1.1, 18, -5.5, 175, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.trap,
          g.twin,
          g.setTrap,
          g.twin,
          g.twin,
        ]),
        TYPE: "setTrap",
        STAT_CALCULATOR: "block",
      },
    },
  ],
};
Class.octoTrapper = {
  PARENT: "genericTank",
  LABEL: "Octo Trapper",
  DANGER: 7,
  STAT_NAMES: statnames.trap,
  HAS_NO_RECOIL: true,
  GUNS: weaponArray(
    [
      {
        POSITION: [15, 7, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
          TYPE: "trap",
          STAT_CALCULATOR: "trap",
        },
      },
      {
        POSITION: [15, 7, 1, 0, 0, 45, 0],
      },
      {
        POSITION: [3, 7, 1.7, 15, 0, 45, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
          TYPE: "trap",
          STAT_CALCULATOR: "trap",
        },
      },
    ],
    4
  ),
};
Class.coop = {
  PARENT: "genericTank",
  LABEL: "Co-Operator",
  DANGER: 6,
  STAT_NAMES: statnames.trap,
  BODY: {
    FOV: 1.15 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [18, 14, 1, 0, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1.1, 18, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.coop]),
        TYPE: "setTrap",
        STAT_CALCULATOR: "block",
      },
    },
  ],
};
Class.strangler = {
  PARENT: "genericTank",
  LABEL: "Strangler",
  DANGER: 6,
  STAT_NAMES: statnames.drone,
  BODY: {
    FOV: 1.05 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [6, 12, 1.2, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone]),
        TYPE: "turretedDrone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        WAIT_TO_CYCLE: true,
        MAX_CHILDREN: 6,
      },
    },
    {
      POSITION: [4, 8, 1, 8, 0, 0, 0],
    },
  ],
};
Class.mechanic = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Mechanic",
  STAT_NAMES: statnames.trap,
  BODY: {
    FOV: 1.15 * base.FOV,
  },
  GUNS: weaponArray(
    [
      {
        POSITION: [5, 11, 1, 10.5, 0, 0, 0],
      },
      {
        POSITION: [3, 14, 1, 15.5, 0, 0, 0],
      },
      {
        POSITION: [2, 14, 1.3, 18, 0, 0, 0],
        PROPERTIES: {
          MAX_CHILDREN: 4,
          SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
          TYPE: "unsetPillbox",
          SYNCS_SKILLS: true,
          DESTROY_OLDEST_CHILD: true,
          STAT_CALCULATOR: "block",
        },
      },
      {
        POSITION: [4, 14, 1, 8, 0, 0, 0],
      },
    ],
    3
  ),
};
Class.specializedPillbox = {
  PARENT: "pillbox",
  LABEL: "Specialized Pillbox",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: "autoSmasherTurret",
    },
  ],
};
Class.specializer = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Specializer",
  STAT_NAMES: statnames.trap,
  BODY: {
    FOV: 1.15 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [3, 14, 1, 15.5, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1.3, 18, 0, 0, 0],
      PROPERTIES: {
        MAX_CHILDREN: 6,
        SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
        TYPE: "specializedPillbox",
        SYNCS_SKILLS: true,
        DESTROY_OLDEST_CHILD: true,
        STAT_CALCULATOR: "block",
      },
    },
    {
      POSITION: [4, 14, 1, 8, 0, 0, 0],
    },
    {
      POSITION: [2, 2, 0.1, 18, 4, 0, 0],
    },
    {
      POSITION: [2, 2, 0.1, 18, -4, 0, 0],
    },
  ],
};
Class.programAura = addAura(0.6, 1.4);
Class.programPillbox = {
  PARENT: "pillbox",
  LABEL: "Programmed Pillbox",
  TURRETS: [
    {
      POSITION: [9, 0, 0, 0, 360, 1],
      TYPE: "programAura",
    },
  ],
};
Class.programmer = {
  PARENT: "genericTank",
  DANGER: 7,
  LABEL: "Programmer",
  STAT_NAMES: statnames.trap,
  BODY: {
    FOV: 1.15 * base.FOV,
  },
  GUNS: [
    {
      POSITION: [5, 11, 1, 10.5, 0, 0, 0],
    },
    {
      POSITION: [3, 14, 1, 15.5, 0, 0, 0],
    },
    {
      POSITION: [2, 14, 1.3, 18, 0, 0, 0],
      PROPERTIES: {
        MAX_CHILDREN: 6,
        SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
        TYPE: "programPillbox",
        SYNCS_SKILLS: true,
        DESTROY_OLDEST_CHILD: true,
        STAT_CALCULATOR: "block",
      },
    },
    {
      POSITION: [4, 14, 1, 8, 0, 0, 0],
    },
    {
      POSITION: [3, 4, 0.6, 13.5, 0, 0, 0],
    },
  ],
};
Class.directTurret = {
  PARENT: "genericTank",
  LABEL: "",
  SHAPE: 4,
  COLOR: "grey",
  BODY: {FOV: 2},
  GUNS: [
    {
      POSITION: [0, 11, 1.3, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.babyDrone]),
        TYPE: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        MAX_CHILDREN: 4,
        WAIT_TO_CYCLE: true
      },
    },
  ],
}
Class.seerTurret = {
  PARENT: "genericTank",
  LABEL: "",
  SHAPE: 4,
  COLOR: "grey",
  BODY: {FOV: 2},
  GUNS: [
    {
      POSITION: [0, 11, 1.3, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.babyDrone]),
        TYPE: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        MAX_CHILDREN: 3,
        WAIT_TO_CYCLE: true
      },
    },
  ],
}
Class.seedTurret = {
  PARENT: "genericTank",
  LABEL: "",
  SHAPE: 4,
  COLOR: "grey",
  BODY: {FOV: 2},
  GUNS: [
    {
      POSITION: [0, 11, 1.3, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.babyDrone]),
        TYPE: "drone",
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        STAT_CALCULATOR: "drone",
        MAX_CHILDREN: 2,
        WAIT_TO_CYCLE: true
      },
    },
  ],
}
Class.primary = {
  PARENT: "tank",
  LABEL: "Primary",
  TURRETS: [
    {
      POSITION: [9, 0, 0, 0, 0, 1],
      TYPE: "directTurret",
    },
  ],
};
Class.droneShip = {
  PARENT: "tank",
  LABEL: "Babyship",
  TURRETS: [
    {
      POSITION: [8, 0, -6.5, 90, 0, 1],
      TYPE: "seerTurret",
    },
    {
      POSITION: [8, 0, 6.5, 90, 0, 1],
      TYPE: "seerTurret",
    }
  ],
};
Class.hydraShip = {
  PARENT: "tank",
  LABEL: "Hydraship",
  TURRETS: weaponArray(
      {
        POSITION: [8, 0, 6.5, 120, 0, 1],
        TYPE: "seedTurret",
      }, 3
  )
};
Class.fleet = {
  PARENT: "tank",
  LABEL: "Fleet",
  TURRETS: weaponArray(
      {
        POSITION: [8, 0, 8, 45, 0, 1],
        TYPE: "seedTurret",
      }, 4
  )
};
Class.autoTankTurret = makeTurret(
  {
    GUNS: [
      {
        POSITION: [22, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.flankGuard,
            { recoil: 0.1 },
          ]),
          TYPE: "bullet",
          STAT_CALCULATOR: "fixedReload",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 3 }
);
Class.autoTankGunMega = makeTurret(
  {
    GUNS: [
      {
        POSITION: [22, 13, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 3 }
);
Class.autoTankGunGiga = makeTurret(
  {
    GUNS: [
      {
        POSITION: [22, 15, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.flankGuard,
            g.pounder,
            g.destroyer,
          ]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 3 }
);
Class.autoTankGunTera = makeTurret(
  {
    GUNS: [
      {
        POSITION: [26, 16, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.flankGuard,
            g.pounder,
            g.destroyer,
            g.sniper,
          ]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 3 }
);
Class.autoDoubleTurret = makeTurret(
  {
    GUNS: [
      {
        POSITION: [20, 6, 1, 0, 5, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.flankGuard,
            g.twin,
            { recoil: 0.1 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [20, 6, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.flankGuard,
            g.twin,
            { recoil: 0.1 },
          ]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { fov: 3, limitFov: true }
);
Class.tripletAutoTankTurret = makeTurret(
  {
    GUNS: [
      {
        POSITION: [18, 10, 1, 0, 5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { recoil: 0.1 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [18, 10, 1, 0, -5, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { recoil: 0.1 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [21, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { recoil: 0.1 },
          ]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 3 }
);
Class.quadrupletTurret = makeTurret(
  {
    GUNS: [
      {
        POSITION: [18, 10, 1, 0, 5.25, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { recoil: 0 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [18, 10, 1, 0, -5.25, 0, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { recoil: 0 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [21, 10, 1, 0, 2, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { recoil: 0 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: [21, 7, 1, 0, -4, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            g.triplet,
            { size: 1.5, recoil: 0 },
          ]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 3 }
);
Class.autoTank = {
  PARENT: "tank",
  LABEL: "Auto",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],
};
Class.doubleAutoTank = {
  PARENT: "tank",
  LABEL: "MACH-II",
  TURRETS: [
    {
      POSITION: [6, -1, 4.5, 0, 360, 1],
      TYPE: [
        "autoTankGun",
        { INDEPENDENT: true, GUN_STAT_SCALE: { reload: 1.1 } },
      ],
    },
    {
      POSITION: [6, -1, -4.5, 0, 360, 1],
      TYPE: [
        "autoTankGun",
        { INDEPENDENT: true, GUN_STAT_SCALE: { reload: 1.1 } },
      ],
    },
  ],
};
Class.tripleAutoTank = {
  PARENT: "tank",
  LABEL: "Mechanism",
  TURRETS: [
    {
      POSITION: [6, 4.5, 0, 0, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
    {
      POSITION: [6, 4.5, 0, 120, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
    {
      POSITION: [6, 4.5, 0, -120, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
  ],
};
Class.pentaAutoTank = {
  PARENT: "tank",
  LABEL: "Skynet",
  TURRETS: [
    {
      POSITION: [6, 6.25, 0, 0, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
    {
      POSITION: [6, 6.25, 0, 72, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
    {
      POSITION: [6, 6.25, 0, 144, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
    {
      POSITION: [6, 6.25, 0, -144, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
    {
      POSITION: [6, 6.25, 0, -72, 360, 1],
      TYPE: ["autoTankTurret", { INDEPENDENT: true }],
    },
  ],
};
Class.megaAutoTank = {
  PARENT: "tank",
  LABEL: "Megabyte",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGunMega", { INDEPENDENT: true }],
    },
  ],
};
Class.gigaAutoTank = {
  PARENT: "tank",
  LABEL: "Gigabyte",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGunGiga", { INDEPENDENT: true }],
    },
  ],
};
Class.teraAutoTank = {
  PARENT: "tank",
  LABEL: "Terabyte",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGunTera", { INDEPENDENT: true }],
    },
  ],
};
Class.doublegAutoTank = {
  PARENT: "tank",
  LABEL: "Main",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoDoubleTurret", { INDEPENDENT: true }],
    },
  ],
};
Class.tripletAutoTank = {
  PARENT: "tank",
  LABEL: "Triplet",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["tripletAutoTankTurret", { INDEPENDENT: true }],
    },
  ],
};
Class.quadrupleAutoTank = {
  PARENT: "tank",
  LABEL: "Quadruplet",
  TURRETS: [
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["quadrupletTurret", { INDEPENDENT: true }],
    },
  ],
};
Class.machine = {
  PARENT: "tank",
  LABEL: "Machine",
  SHAPE: 6,
  BODY: {
    HEALTH: 1.75 * base.HEALTH * 1.5,
  },
};
Class.bigDeco = makeDeco(4.5, "mirror");
Class.brickTank = {
  PARENT: "tank",
  LABEL: "City",
  SHAPE: 7,
  BODY: {
    HEALTH: 2.5 * base.HEALTH * 1.5,
  },
  PROPS: [
    {
      POSITION: [8, 0, 0, 0, 1],
      TYPE: "bigDeco",
    },
  ],
};
Class.biggerDeco = makeDeco(5, "mirror");
Class.headquarters = {
  PARENT: "tank",
  LABEL: "Headquarters",
  SHAPE: 7,
  BODY: {
    HEALTH: 3.75 * base.HEALTH * 1.5,
  },
  PROPS: [
    {
      POSITION: [10, 0, 0, 0, 1],
      TYPE: "biggerDeco",
    },
  ],
};
Class.bunker = {
  PARENT: "tank",
  LABEL: "Bunker",
  SHAPE: 7,
  BODY: {
    HEALTH: 5 * base.HEALTH * 1.5,
  },
  PROPS: [
    {
      POSITION: [11, 0, 0, 0, 1],
      TYPE: "biggerDeco",
    },
    {
      POSITION: [4.5, 0, 0, 0, 1],
      TYPE: "bigDeco",
    },
  ],
};
Class.smashTankBody = {
  LABEL: "",
  FACING_TYPE: ["spin", { speed: 0.1 }],
  COLOR: "black",
  SHAPE: 6,
  INDEPENDENT: true,
};
Class.smasherTank = {
  PARENT: "tank",
  LABEL: "Smasher",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
  ],
  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.crusherBody = {
  LABEL: "",
  FACING_TYPE: ["spin", { speed: 0.1 }],
  COLOR: "black",
  SHAPE: 5,
  INDEPENDENT: true,
};
Class.crusher = {
  PARENT: "tank",
  LABEL: "Crusher",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "crusherBody",
    },
  ],
  BODY: {
    DAMAGE: 2 * base.DAMAGE,
  },
};
Class.brambleBody = {
  LABEL: "",
  FACING_TYPE: ["spin", { speed: 0.1 }],
  COLOR: "black",
  SHAPE: 4,
  INDEPENDENT: true,
};
Class.bramble = {
  PARENT: "tank",
  LABEL: "Bramble",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "brambleBody",
    },
  ],
  BODY: {
    DAMAGE: 2.5 * base.DAMAGE,
  },
};
Class.nettleBody = {
  LABEL: "",
  FACING_TYPE: ["spin", { speed: 0.1 }],
  COLOR: "black",
  SHAPE: 4.5,
  INDEPENDENT: true,
};
Class.nettle = {
  PARENT: "tank",
  LABEL: "Nettle",
  TURRETS: [
    {
      POSITION: [25, 0, 0, 0, 360, 0],
      TYPE: "nettleBody",
    },
  ],
  BODY: {
    DAMAGE: 2.5 * base.DAMAGE,
    SPEED: 1.1
  },
};
Class.auraTankGen = addAura();
Class.auraTank = {
  PARENT: "tank",
  LABEL: "Aura",
  TURRETS: [
    {
      POSITION: [13, 0, 0, 0, 0, 1],
      TYPE: "auraTankGen",
    },
  ],
};
Class.decorativeAura1 = addAura(0.01, 1.15, 0.45);
Class.auraTankGenBig = addAura(1, 1.2, 0.4);
Class.forgery = {
  PARENT: "tank",
  LABEL: "Forgery",
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "auraTankGenBig",
    },
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "decorativeAura1",
    }
  ],
};
Class.decorativeAura2 = addAura(0.01, 1.3, 0.45);
Class.decorativeAura3 = addAura(0.01, 1.2, 0.5);
Class.auraTankGenBigger = addAura(1, 1.35, 0.4);
Class.lifebane = {
  PARENT: "tank",
  LABEL: "Lifebane",
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "auraTankGenBigger",
    },
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "decorativeAura2",
    },
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "decorativeAura3",
    },
  ],
};
Class.decorativeAura5 = addAura(0.01, 1.3, 0.6);
Class.decorativeAura4 = addAura(0.01, 1.4, 0.5);
Class.auraTankGenBiggest = addAura(1.1, 1.5);
Class.halberd = {
  PARENT: "tank",
  LABEL: "Halberd",
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "auraTankGenBiggest",
    },
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "decorativeAura5",
    },
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "decorativeAura4",
    },
  ],
};
Class.auraTankGenSmall = addAura(0.6, 1.8);
Class.heliosphere = {
  PARENT: "tank",
  LABEL: "Heliosphere",
  TURRETS: weaponArray({
    POSITION: [6, 4.5, 0, 0, 360, 1],
    TYPE: "auraTankGenSmall",
  }, 3)
};
Class.realm = {
  PARENT: "tank",
  LABEL: "Realm",
  TURRETS: weaponArray({
    POSITION: [6, 6.25, 0, 0, 360, 1],
    TYPE: "auraTankGenSmall",
  }, 5)
};
Class.healAuraTankGen = addAura(-1);
Class.thermosphere = {
  PARENT: "tank",
  LABEL: "Thermosphere",
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "healAuraTankGen",
    },
  ],
};
Class.menderAura = addAura(-2.1, 1.5);
Class.mender = {
  PARENT: "tank",
  LABEL: "Mender",
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: "menderAura",
    },
  ],
};
Class.thermalAura = addAura(-0.6, 2);
Class.thermostation = {
  PARENT: "tank",
  LABEL: "Thermostation",
  TURRETS: [
    {
      POSITION: [6, 6.25, 0, 0, 360, 1],
      TYPE: "thermalAura",
    },
    {
      POSITION: [6, 6.25, 0, 72, 360, 1],
      TYPE: "thermalAura",
    },
    {
      POSITION: [6, 6.25, 0, -72, 360, 1],
      TYPE: "thermalAura",
    },
    {
      POSITION: [6, 6.25, 0, 144, 360, 1],
      TYPE: "thermalAura",
    },
    {
      POSITION: [6, 6.25, 0, -144, 360, 1],
      TYPE: "thermalAura",
    },
  ],
};
// Mixing
Class.top = {
  PARENT: "tank",
  LABEL: "Top",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.presidio = {
  PARENT: "tank",
  LABEL: "Presidio",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "crusherBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 2 * base.DAMAGE,
  },
};
Class.entrenchment = {
  PARENT: "tank",
  LABEL: "Entrenchment",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "brambleBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 2.5 * base.DAMAGE,
  },
};
Class.outpost = {
  PARENT: "tank",
  LABEL: "Outpost",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoDoubleTurret", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.stockade = {
  PARENT: "tank",
  LABEL: "Stockade",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["tripletAutoTankTurret", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.buffer = {
  PARENT: "tank",
  LABEL: "Buffer",
  SHAPE: 6,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
    HEALTH: 1.75 * base.HEALTH * 2,
  },
};
Class.cage = {
  PARENT: "tank",
  LABEL: "Cage",
  SHAPE: 7,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],
  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
    HEALTH: 2.5 * base.HEALTH * 2,
  },
  PROPS: [
    {
      POSITION: [8, 0, 0, 0, 1],
      TYPE: "bigDeco",
    },
  ],
};
Class.consolidation = {
  PARENT: "tank",
  LABEL: "Consolidation",
  SHAPE: 6,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoDoubleTurret", { INDEPENDENT: true }],
    },
  ],

  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
    HEALTH: 1.75 * base.HEALTH * 2,
  },
};
Class.penitaniary = {
  PARENT: "tank",
  LABEL: "Penitaniary",
  SHAPE: 6,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "crusherBody",
    },
    {
      POSITION: [11, 0, 0, 0, 360, 1],
      TYPE: ["autoTankGun", { INDEPENDENT: true }],
    },
  ],

  BODY: {
    DAMAGE: 2 * base.DAMAGE,
    HEALTH: 1.75 * base.HEALTH * 2,
  },
};

Class.garrison = {
  PARENT: "tank",
  LABEL: "Garrison",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGen",
    },
  ],

  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.commandPost = {
  PARENT: "tank",
  LABEL: "Command Post",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGenBig",
    },
  ],

  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.hangar = {
  PARENT: "tank",
  LABEL: "Hangar",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGenBigger",
    },
  ],

  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
  },
};
Class.aerosols = {
  PARENT: "tank",
  LABEL: "Aerosol",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "crusherBody",
    },
    {
      POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGen",
    },
  ],

  BODY: {
    DAMAGE: 2 * base.DAMAGE,
  },
};
Class.drizzle = {
  PARENT: "tank",
  LABEL: "Drizzle",
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "crusherBody",
    },
    {
      POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGenBig",
    },
  ],

  BODY: {
    DAMAGE: 2 * base.DAMAGE,
  },
};
Class.greenhouse = {
  PARENT: "tank",
  LABEL: "Greenhouse",
  TURRETS: [
    {
      POSITION: { SIZE: 21.5, ARC: 360, LAYER: 0 },
      TYPE: "brambleBody",
    },
    {
      POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGen",
    },
  ],
  BODY: {
    DAMAGE: 2.5 * base.DAMAGE,
  },
};
Class.jetstream = {
  PARENT: "tank",
  LABEL: "Jetstream",
  SHAPE: 6,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGen",
    },
  ],

  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
    HEALTH: 1.75 * base.HEALTH * 2,
  },
};
Class.arboretum = {
  PARENT: "tank",
  LABEL: "Arboretum",
  SHAPE: 6,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "crusherBody",
    },
    {
      POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGen",
    },
  ],

  BODY: {
    DAMAGE: 2 * base.DAMAGE,
    HEALTH: 1.75 * base.HEALTH * 2,
  },
};
Class.ozoneDeco = makeDeco(0, "darkGrey");
Class.ozone = {
  PARENT: "tank",
  LABEL: "Ozone",
  SHAPE: 7,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: { SIZE: 13, ARC: 360, LAYER: 0 },
      TYPE: "auraTankGen",
    },
  ],

  BODY: {
    DAMAGE: 1.5 * base.DAMAGE,
    HEALTH: 2.5 * base.HEALTH * 2,
  },
  PROPS: [
    {
      POSITION: [14, 0, 0, 0, 1],
      TYPE: "ozoneDeco",
    },
    {
      POSITION: [9.5, 0, 0, 0, 1],
      TYPE: ["bigDeco", { COLOR: "teal" }],
    },
  ],
};
Class.orchard = {
  PARENT: "tank",
  LABEL: "Orchard",
  SHAPE: 6,
  TURRETS: [
    {
      POSITION: [21.5, 0, 0, 0, 360, 0],
      TYPE: "smashTankBody",
    },
    {
      POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
      TYPE: "auraTankGenBig",
    },
  ],

  BODY: {
    DAMAGE: 2 * base.DAMAGE,
    HEALTH: 1.75 * base.HEALTH * 2,
  },
};
//ETHEREALS
const etherealDeco = {
  PARENT: "genericTank",
  SHAPE: 3.5,
  COLOR: "teal",
  SIZE: 20,
};
const smolEtherealBody = {
  SPEED: base.SPEED * 0.7,
  HEALTH: base.HEALTH * 10,
  SHIELD: base.SHIELD * 2.5,
  REGEN: base.REGEN * 1.25,
  DENSITY: base.DENSITY * 2.5,
  ACCELERATION: base.ACCEL * 0.8,
};
Class.genericSmolEthereal = {
  ...etherealDeco,
  BODY: smolEtherealBody,
};
const normEtherealBody = {
  SPEED: base.SPEED * 0.625,
  HEALTH: base.HEALTH * 20,
  SHIELD: base.SHIELD * 3,
  REGEN: base.REGEN * 1.5,
  DENSITY: base.DENSITY * 3,
  ACCELERATION: base.ACCEL * 0.55,
};
Class.genericNormEthereal = {
  ...etherealDeco,
  BODY: normEtherealBody,
};
const bigEtherealBody = {
  SPEED: base.SPEED * 0.55,
  HEALTH: base.HEALTH * 30,
  SHIELD: base.SHIELD * 3.6,
  REGEN: base.REGEN * 1.6,
  DENSITY: base.DENSITY * 3.6,
  ACCELERATION: base.ACCEL * 0.4,
};
Class.genericBigEthereal = {
  ...etherealDeco,
  BODY: bigEtherealBody,
};
Class.etherealAutoGun = makeTurret(
  {
    GUNS: [
      {
        POSITION: [22, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.flankGuard,
            g.heavier,
            { reload: 1.25, range: 1.1 },
          ]),
          TYPE: "bullet",
        },
      },
    ],
  },
  { canRepel: true, limitFov: true, fov: 2 }
);
Class.ethereal = {
  PARENT: "genericSmolEthereal",
  UPGRADE_LABEL: "ASCEND",
  UPGRADE_TOOLTIP:
    "WARNING: Upgrade the body first, then the guns, otherwise you'll lose a lot of skill points!",
  LABEL: "Ethereal",
  EXTRA_SKILL: 6,
};
Class.etherealBody = {
  PARENT: "genericSmolEthereal",
  UPGRADE_LABEL: "ASCEND",
  UPGRADE_TOOLTIP:
    "WARNING: Upgrade the body first, then the guns, otherwise you'll lose a lot of skill points!",
  LABEL: "Node",
  EXTRA_SKILL: 6,
};
Class.etherealHull = {
  PARENT: "genericSmolEthereal",
  UPGRADE_LABEL: "ASCEND",
  LABEL: "Hull",
};
Class.philistine = {
  PARENT: "genericSmolEthereal",
  LABEL: "Philistine",
  UPGRADE_TOOLTIP: "Bullet Spam",
  GUNS: weaponArray(
    [
      {
        POSITION: {
          LENGTH: 13.5,
          WIDTH: 6,
          Y: 5.5,
        },
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            { reload: 1.05, range: 0.9, health: 1.1 },
          ]),
          TYPE: "bullet",
        },
      },
      {
        POSITION: {
          LENGTH: 13.5,
          WIDTH: 6,
          Y: -5.5,
          DELAY: 0.5,
        },
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.basic,
            g.twin,
            { reload: 1.05, range: 0.9, health: 1.1 },
          ]),
          TYPE: "bullet",
        },
      },
    ],
    3
  ),
};
Class.spear = {
  PARENT: "genericSmolEthereal",
  LABEL: "Spear",
  UPGRADE_TOOLTIP: "Sniper Branch (higher range, stronger, faster bullets)",
  GUNS: weaponArray(
    {
      POSITION: {
        LENGTH: 23,
        WIDTH: 7,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.assassin,
          {
            reload: 1.25,
            health: 1.35,
            speed: 1.1,
            maxSpeed: 1.1,
            density: 1.2,
            range: 0.65,
          },
        ]),
        TYPE: "bullet",
      },
    },
    3
  ),
};
Class.sundowner = {
  PARENT: "genericSmolEthereal",
  LABEL: "Sundowner",
  UPGRADE_TOOLTIP: "Necromancer, Drones, Minions",
  GUNS: weaponArray(
    [
      {
        POSITION: {
          LENGTH: 14,
          WIDTH: 5.5,
          ASPECT: 1.7,
          Y: 6.5,
        },
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.drone,
            g.overseer,
            { reload: 1.05, maxSpeed: 0.9, health: 1.1, size: 1.75 },
          ]),
          TYPE: "drone",
          MAX_CHILDREN: 2,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: "drone",
          WAIT_TO_CYCLE: true,
        },
      },
      {
        POSITION: {
          LENGTH: 14,
          WIDTH: 5.5,
          ASPECT: 1.7,
          Y: -6.5,
          DELAY: 0.5,
        },
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.drone,
            g.overseer,
            { reload: 1.05, maxSpeed: 0.9, health: 1.1, size: 1.75 },
          ]),
          TYPE: "drone",
          MAX_CHILDREN: 2,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALCULATOR: "drone",
          WAIT_TO_CYCLE: true,
        },
      },
    ],
    3
  ),
};
Class.despoiler = {
  PARENT: "genericSmolEthereal",
  LABEL: "Despoiler",
  UPGRADE_TOOLTIP: "Heavy Barrels (Super strong bullets)",
  GUNS: weaponArray(
    {
      POSITION: {
        LENGTH: 17,
        WIDTH: 9,
      },
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pounder,
          { reload: 0.9, range: 0.9 },
        ]),
        TYPE: "bullet",
      },
    },
    3
  ),
};
Class.centaur = {
  PARENT: "genericSmolEthereal",
  LABEL: "Centaur",
  UPGRADE_TOOLTIP: "Static, defensive.",
  GUNS: weaponArray(
    [
      {
        POSITION: [13, 7, 1, 0, 0, 0, 0],
      },
      {
        POSITION: [3, 7, 1.5, 13, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([
            g.trap,
            g.pounder,
            { health: 1.15, shudder: 0.4, speed: 0.85, range: 0.85 },
          ]),
          TYPE: "trap",
          STAT_CALCULATOR: "trap",
        },
      },
    ],
    3
  ),
};
Class.mechanism = {
  PARENT: "genericSmolEthereal",
  LABEL: "Mechanism",
  UPGRADE_TOOLTIP: "Mainly focuses on auto-turrets.",
  TURRETS: [
    {
      POSITION: [9, 0, 0, 0, 360, 1],
      TYPE: ["etherealAutoGun", { INDEPENDENT: true }],
    },
  ],
};

//Cutthroat
//length, width, aspect, x, y, angle, delay
//size, x, y, angle, arc, layer

//Class.smasher.UPGRADES_TIER_3.push("expansive", "smashGuard")
//Class.smasher.UPGRADES_TIER_6 = ["starSystem"]
Class.annihilator.UPGRADES_TIER_8 = ["doubleDestroyer"];
Class.twin.UPGRADES_TIER_8 = ["doubleDestroyer", "bulldozer"];
Class.musket.UPGRADES_TIER_8 = ["doubleDestroyer", "bulldozer"];
Class.smasher.UPGRADES_TIER_6 = ["starSystem"];
//Class.whirlwind.UPGRADES_TIER_3.push("prophet")
Class.overseer.UPGRADES_TIER_3.push("sentrySeer");
Class.spawner.UPGRADES_TIER_3.push(
  "topBanana",
  "watchwoman",
  "cloner",
  "sqrtFactory",
  "inventor"
);
Class.underseer.UPGRADES_TIER_3.push(
  "polyseer",
  "enchanter",
  "preacher",
  "necroa"
);
Class.megaTornado.UPGRADES_TIER_6 = ["starSystem"];
//Class.hexaTank.UPGRADES_TIER_3.push("hexaWhirl")
Class.beeNest.UPGRADES_TIER_3 = [
  "beeHive",
  "waspNest",
  "hornetNest",
  "queenBee",
  "megaNest",
];
Class.realtor.UPGRADES_TIER_8 = ["arbitrator"];
Class.bumblebee.UPGRADES_TIER_2 = ["beeNest"];
Class.bumblebee.UPGRADES_TIER_3 = ["wraith"];
Class.cruiser.UPGRADES_TIER_3.push("wraith", "gunnerCruiser");
//Class.auto3.UPGRADES_TIER_3.push("whirl3")
//Class.artillery.UPGRADES_TIER_3.push("munition");
Class.director.UPGRADES_TIER_1.push("strangler");
Class.strangler.UPGRADES_TIER_2 = ["storm", "overdrive"];
Class.storm.UPGRADES_TIER_3 = ["cortex"];
Class.radical.UPGRADES_TIER_2 = ["bumblebee", "healer", "desmos"];
Class.radical.UPGRADES_TIER_4 = ["advanced"];
Class.gunner.UPGRADES_TIER_3.push("gunnerCruiser");
//Class.trapGuard.UPGRADES_TIER_3.push("whirlGuard")
Class.advanced.UPGRADES_TIER_5 = ["switcheroo", "realtor", "screamer", "flail"];
Class.polyseer.UPGRADES_TIER_3 = ["polymancer", "polyshadow"];
Class.fullyAutomatic.UPGRADES_TIER_3 = ["assaulter", "microgun"];
Class.flankGuard.UPGRADES_TIER_2.push("ringer", "realstar");
Class.ringer.UPGRADES_TIER_3 = ["winger", "singer"];
Class.realstar.UPGRADES_TIER_3 = ["deathstar", "neutronstar", "apex"];
Class.hider.UPGRADES_TIER_3 = ["rogue", "cloak", "leader", "stalker"];
Class.manager.UPGRADES_TIER_3 = ["leader"];
Class.destroyer.UPGRADES_TIER_3.push("rogue");
Class.sniper.UPGRADES_TIER_2.push("hider", "ringer");
Class.pounder.UPGRADES_TIER_2.push("realstar");
Class.triAngle.UPGRADES_TIER_3.push("hawk");
Class.smashGuard.UPGRADES_TIER_4 = ["tankGuardian"];
Class.tankGuardian.UPGRADES_TIER_5 = ["homelandDefender"];
Class.basic.UPGRADES_TIER_1 = [];
Class.basic.UPGRADES_TIER_2 = ["radical"];
Class.basic.UPGRADES_TIER_0 = ["single", "director", "heavy", "trapper"];
Class.single.UPGRADES_TIER_1 = ["twin", "machineGun", "flankGuard"];
Class.heavy.UPGRADES_TIER_1 = ["pounder", "sniper"];
Class.trapper.UPGRADES_TIER_1 = ["builder", "triTrapper", "trapGuard"];
Class.trapper.UPGRADES_TIER_2 = ["overtrapper", "barracuda"];
Class.triTrapper.UPGRADES_TIER_2 = ["hexaTrapper", "architect"];
Class.trapGuard.UPGRADES_TIER_2 = [
  "bushwhacker",
  "hijacker",
  "planetary",
  "bulwark",
  "overtrapper",
];
Class.builder.UPGRADES_TIER_2 = [
  "coop",
  "engineer",
  "boomer",
  "assembler",
  "architect",
  "planetary",
];
Class.hexaTrapper.UPGRADES_TIER_3 = ["fortress", "octoTrapper"];
Class.coop.UPGRADES_TIER_3 = ["construct"];
Class.planetary.UPGRADES_TIER_3 = ["conqueror"];
Class.boomer.UPGRADES_TIER_3 = ["parryer"];
Class.overtrapper.UPGRADES_TIER_3 = ["highlord"];
Class.bulwark.UPGRADES_TIER_3 = ["parapet"];
Class.engineer.UPGRADES_TIER_3 = ["mechanic", "specializer", "programmer"];
Class.barracuda.UPGRADES_TIER_3 = ["barricade"];
Class.tank.UPGRADES_TIER_0 = [
  "auraTank",
  "smasherTank",
  "autoTank",
  "machine",
  "primary",
];
Class.primary.UPGRADES_TIER_1 = ["droneShip"];
Class.droneShip.UPGRADES_TIER_2 = ["hydraShip"];
Class.hydraShip.UPGRADES_TIER_3 = ["fleet"];
Class.autoTank.UPGRADES_TIER_1 = [
  "doubleAutoTank",
  "megaAutoTank",
  "doublegAutoTank",
  "top",
];
Class.doubleAutoTank.UPGRADES_TIER_2 = ["tripleAutoTank"];
Class.tripleAutoTank.UPGRADES_TIER_3 = ["pentaAutoTank"];
Class.megaAutoTank.UPGRADES_TIER_2 = ["gigaAutoTank"];
Class.gigaAutoTank.UPGRADES_TIER_3 = ["teraAutoTank"];
Class.doublegAutoTank.UPGRADES_TIER_2 = ["tripletAutoTank"];
Class.tripletAutoTank.UPGRADES_TIER_3 = ["quadrupleAutoTank"];
Class.machine.UPGRADES_TIER_1 = ["brickTank"];
Class.brickTank.UPGRADES_TIER_2 = ["headquarters"];
Class.headquarters.UPGRADES_TIER_3 = ["bunker"];
Class.smasherTank.UPGRADES_TIER_1 = ["crusher", "top", "garrison"];
Class.crusher.UPGRADES_TIER_2 = ["bramble"];
Class.bramble.UPGRADES_TIER_3 = ["nettle"];
Class.auraTank.UPGRADES_TIER_1 = ["forgery"];
Class.forgery.UPGRADES_TIER_2 = ["lifebane", "thermosphere", "heliosphere"];
Class.heliosphere.UPGRADES_TIER_3 = ["realm"];
Class.lifebane.UPGRADES_TIER_3 = ["halberd"];
Class.thermosphere.UPGRADES_TIER_3 = ["mender", "thermostation"];
Class.top.UPGRADES_TIER_2 = ["presidio", "outpost", "buffer"];
Class.presidio.UPGRADES_TIER_3 = ["entrenchment", "penitaniary"];
Class.outpost.UPGRADES_TIER_3 = ["stockade", "consolidation"];
Class.buffer.UPGRADES_TIER_3 = ["cage", "penitaniary", "consolidation"];
Class.garrison.UPGRADES_TIER_2 = ["commandPost", "aerosols", "jetstream"];
Class.commandPost.UPGRADES_TIER_3 = ["hangar", "drizzle", "orchard"];
Class.aerosols.UPGRADES_TIER_3 = ["drizzle", "greenhouse", "arboretum"];
Class.jetstream.UPGRADES_TIER_3 = ["ozone", "orchard", "arboretum"];
//Class.basic.UPGRADES_TIER_8 = [["etherealHull", "ethereal"]];
Class.tank.UPGRADES_TIER_8 = ["etherealBody"];
Class.ethereal.UPGRADES_TIER_8 = [
  "philistine",
  "sundowner",
  "spear",
  "despoiler",
  "centaur",
];
Class.etherealBody.UPGRADES_TIER_8 = ["mechanism"];
