const { base} = require('../constants.js');
const g = require('../gunvals.js')
const { addAura, makeAuto, makeDeco, makeTurret, makeOver, combineStats, weaponArray } = require("../facilitators.js");
const { statnames, smshskl } = require("../constants.js");
const {makeGuard, makeIrdA, makeIrdB, makeBird} = require("../facilitators");
const {basePlayerHealth} = require("../constants");
const {basic: my} = require("../gunvals");
const {advancedcollide} = require("../../physics/collisionFunctions");
// Addon for base turretopia stuff
const fakeGun = [
    {
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.machineGunner, { size: 0.6 }]),
            TYPE: "bullet",
        }
    },
]
const dobloong = [
    {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
            TYPE: "bullet",
        },
    },
    {
        POSITION: [15, 3.5, 1, 0, 0, -90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
            TYPE: "bullet",
        },
    },
    {
        POSITION: [15, 3.5, 1, 0, 0, 55, 1/2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
            TYPE: "bullet",
        },
    },
    {
        POSITION: [15, 3.5, 1, 0, 0, -55, 1/2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
            TYPE: "bullet",
        },
    },
    {
        POSITION: [15, 3.5, 1, 0, 0, 125, 1/2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
            TYPE: "bullet",
        },
    },
    {
        POSITION: [15, 3.5, 1, 0, 0, -125, 1/2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
            TYPE: "bullet",
        },
    },
]
const healProperties = {
    HEALER: true,
    BODY: {
      DAMAGE: -1
  },
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
}
const smashBody = [
    {
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "smasherBody"
    }
]
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
}
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
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.negro, {reload: 0.8, damage: 0.8}]),
            TYPE: "sunchippoly",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "necro",
            WAIT_TO_CYCLE: true,
            DELAY_SPAWN: false
        }
    },
    {
        POSITION: [5.25, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.negro, {reload: 0.8, damage: 0.32}]),
            TYPE: "trichippoly",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "necro",
            WAIT_TO_CYCLE: true,
            DELAY_SPAWN: false
        }
    }
]

Class.healerTrap = {
    PARENT: "trap",
    ...healProperties
}
Class.healerSwarm = {
    PARENT: "swarm",
    ...healProperties
}

Class.fireAura1 = addAura(1, 1, 0.36)
Class.fireAura2 = addAura(1, 1.25, 0.33)
Class.fireAura3 = addAura(1, 1.5, 0.3)
Class.smashAura1 = addAura(5, 1, 0.36)
Class.smashAura2 = addAura(5, 1.25, 0.33)
Class.smashAura3 = addAura(5, 1.5, 0.3)

Class.auraSmasher = {
    PARENT: 'smasher',
    LABEL: 'Troposphere Smasher',
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "smashAura3"
        }
    ]
}

Class.doubleAuraSmasher = {
    PARENT: 'smasher',
    LABEL: 'Stratosphere Smasher',
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "smashAura2"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "smashAura3"
        }
    ]
}

Class.tripleAuraSmasher = {
    PARENT: 'smasher',
    LABEL: 'Mesosphere Smasher',
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "smashAura1"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "smashAura2"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "smashAura3"
        }
    ]
}
Class.radical = {
    PARENT: "genericTank",
    LABEL: "Radical",
    DANGER: 5,
    BODY: {
        PUSHABILITY: 1,
        HETERO: 3
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
                DELAY: 0
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: [5, 5.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
                TYPE: "swarm",
            }
        },
    ],
}
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
                DELAY: 0
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        },
        ...fakeGun
    ],
}
Class.arbitrator = {
    PARENT: "genericTank",
    LABEL: "Arbitrator",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [10.5, 15.75, 1.33, 5.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.05, range: 0.8, reload: 1, recoil: 0.1}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [10.5, 14.5, 1.33, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.65, health: 1.05, range: 0.8, reload: 1.05, recoil: 0.1}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [10.5, 12.25, 1.25, 9.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.05, range: 0.8, reload: 1.1, recoil: 0.1}]),
                TYPE: "bullet",
            },
        },
        ...fakeGun
    ],
}
Class.realtor = {
    PARENT: "genericTank",
    LABEL: "Retaliator",
    DANGER: 7,
    GUNS: [
         {
            POSITION: [10.5, 14.5, 1.33, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.65, health: 1.05, range: 0.8, reload: 1.05, recoil: 0.1}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [10.5, 12.25, 1.25, 9.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.05, range: 0.8, reload: 1.1, recoil: 0.1}]),
                TYPE: "bullet",
            },
        },
        ...fakeGun
    ],
}
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
                    ANGLE: 15
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
                    DELAY: 1/2
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
                    TYPE: ["bee", { INDEPENDENT: true }],
                    STAT_CALCULATOR: "swarm",
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            }
        ],
}
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
            SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.nest]),
            TYPE: ["bee", { INDEPENDENT: true }],
            STAT_CALCULATOR: "swarm",
            SYNCS_SKILLS: true,
            WAIT_TO_CYCLE: true,
        },
    }, 3, 1/3),
}
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
            SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.pounder, g.nest]),
            TYPE: ["bee", { INDEPENDENT: true }],
            STAT_CALCULATOR: "swarm",
            SYNCS_SKILLS: true,
            WAIT_TO_CYCLE: true,
        },
    }, 3, 1/3),
}
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
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.nest]),
                TYPE: ["bee", { INDEPENDENT: true }],
                STAT_CALCULATOR: "swarm",
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true,
            },
        }, 6, 1/6),
}
Class.wasp = makeAuto(Class.bee, "Wasp", {type: 'droneAutoTurret'})
Class.beeGuardian = {
    PARENT: "elite",
    LABEL: "Bee Guardian",
    SHAPE: 6,
    SIZE: 36,
    COLOR: 'gold',
    GUNS: [
        ...weaponArray(
            {
                POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.bee, g.nest, {speed: 0.6, maxSpeed: 0.6, health: 1.1, resist: 1.05, size: 0.7}]),
                    TYPE: "wasp",
                    STAT_CALCULATOR: "swarm",
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            }, 3),
        ...weaponArray(
            {
                POSITION: [7, 7.5, 0.7, 7, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.bee, g.nest, {speed: 0.6, maxSpeed: 0.6, health: 1.1, resist: 1.05, size: 0.7}]),
                    TYPE: "wasp",
                    STAT_CALCULATOR: "swarm",
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            }, 3),
    ],
    TURRETS: weaponArray({
        POSITION: [3.5, 7, 0, 0, 360, 1],
        TYPE: [ "autoTankGun", { INDEPENDENT: true, COLOR: 'gold' } ],
    }, 6)
}
Class.hornet = {
    PARENT: "bee",
    BODY: {
        HEALTH: 0.1,
        DAMAGE: 6.5,
        PENETRATION: 3,
        SPEED: 5
    }
}
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
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.nest, { size: 0.7 }]),
                TYPE: ["hornet", { INDEPENDENT: true }],
                STAT_CALCULATOR: "swarm",
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true,
            },
        }, 3, 1/3)
}
Class.waspNest = {
    PARENT: "genericTank",
    LABEL: "Wasp Nest",
    DANGER: 7,
    SHAPE: 6,
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.3 * base.FOV,
    },
    GUNS: weaponArray([
        {
            POSITION: [7, 7.5, 0.7, 7, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.nest,]),
                TYPE: ["wasp", { INDEPENDENT: true }],
                STAT_CALCULATOR: "swarm",
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [5, 6, 0, 7, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.fake, {reload:99}]),
            },
        }
    ], 3, 1/3)
}
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
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bee, g.machineGunner, g.nest, { reload: 0.7 }]),
                    TYPE: ["bee", { INDEPENDENT: true }],
                    STAT_CALCULATOR: "swarm",
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            }, 3, 1/3),
}
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
                Y: -7.5
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
                DELAY: 1/2
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        }
    ]
}
Class.bulldozer = {
    PARENT: "genericTank",
    LABEL: "Bulldozer",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.25,
        DAMAGE: 0.7 * base.DAMAGE
    },
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 6, 1, 0, 5.5, 25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { recoil: 0.85, size: 0.6 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 6, 1, 0, -5.5, -25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { recoil: 0.85, size: 0.6 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 19, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [18, 7, 1, 0, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 7, 1, 0, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 5, 1, 0, 5.5, 205, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { recoil: 1.15, size: 0.6 }]),
                TYPE: "bullet"
            }
        },
        
        {
            POSITION: [14, 5, 1, 0, -5.5, -205, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { recoil: 1.15, size: 0.6 }]),
                TYPE: "bullet"
            }
        },
    ]
}
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
    TURRETS: [
        ...smashBody
    ]
}
Class.starDeco = makeDeco(6, "darkGrey")
Class.starSystem = {
    PARENT: "genericSmasher",
    LABEL: "Star System",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.starSystem,
    SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, 0],
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "starDeco"
        },
        ...smashBody
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 3; i++) { 
            output.push({ 
                POSITION: {WIDTH: 16, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.destroyer, g.pounder, { size: 1.4, reload: 3.65, damage: 0.85 }]), 
                    TYPE: ["planet", {ANGLE: i * 120}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true,
                    STAT_CALCULATOR: "fixedReload"
                }
            }) 
        }
        return output
    })()
}
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
                    X: -3
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { speed: 0.6, damage: 0.81 }]),
                    TYPE: ["bee", { INDEPENDENT: true }],
                    STAT_CALCULATOR: ["swarm", "fixedReload"],
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            },
        ],
}
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
                    X: -3
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { speed: 0.75, size: 0.75, damage: 0.25 }, g.babyDrone]),
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
                    DELAY: 1/2
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { speed: 0.75, size: 0.75, damage: 0.25 }, g.babyDrone]),
                    TYPE: "bee",
                    STAT_CALCULATOR: ["swarm", "fixedReload"],
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            }
        ],
}
Class.beeTurret = makeTurret(Class.beeTank, {hasAI: true,  INDEPENDENT: true, limitFov: true, fov: 3})
Class.bee2Turret = makeTurret(Class.bee2Tank, {hasAI: true,  INDEPENDENT: true, limitFov: true, fov: 3})
Class.beeDrone = makeAuto(Class.drone, "Soldier", {type: "beeTurret"})
Class.beeDrone2 = makeAuto(Class.drone, "Super Soldier", {type: "bee2Turret"})
Class.storm = {
    PARENT: "genericTank",
    LABEL: "Storm",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
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
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 6,
            }
        }
    ],
}
Class.cortex = {
    PARENT: "genericTank",
    LABEL: "Cortex",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
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
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 6,
            }
        }
    ]
}
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
                    ANGLE: 15
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
                    ANGLE: -15
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
                    Y: 5.5
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
                    DELAY: 1/2
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
                    TYPE: "swarm",
                    STAT_CALCULATOR: "swarm",
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            }
        ],
}
Class.occult = makeDeco(4)
Class.explosion = {
    PARENT: "growBullet",
    BODY: {
        DAMAGE: 9,
        HEALTH: 9,
        PEN: 9
    },
    LABEL: "Explosion"
}
Class.expansive = {
    PARENT: "genericSmasher",
    LABEL: "Expansive",
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
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
                DELAY: 0
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, {recoil: 0, reload: 7.5, speed: 0.01, maxSpeed: 0.01, damage: 2.25, health: 2.25, pen: 2.25}]),
                TYPE: "explosion",
                ALPHA: 0
            }
        }
    ]
}
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
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ],
}
Class.triangleSatellite = {
    PARENT: "satellite",
    SHAPE: 3
}
Class.sentryDeco = makeDeco(3, "pink")
Class.sentrySeer = {
    PARENT: "genericTank",
    LABEL: "Sentryseer",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {reload: 2, size: 1.5, speed: 0.6, maxSpeed: 0.6, heath: 0.9}]),
                TYPE: ["sentrySwarmMinion", { COLOR: "mirror"}],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
            },
        }, {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {reload: 2, size: 1.5, speed: 0.6, maxSpeed: 0.6, heath: 0.9}]),
                TYPE: ["sentryTrapMinion", { COLOR: "mirror"}],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
            },
        }, {
            POSITION: [6, 12, 1.2, 8, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {reload: 2, size: 1.5, speed: 0.6, maxSpeed: 0.6, heath: 0.9}]),
                TYPE: ["sentryGunMinion", { COLOR: "mirror"}],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
            },
        },
        ...weaponArray(
            {
                POSITION: [6, 12, 0.1, 8, 0, 120, 0]
            }, 3
        )
    ],
}
Class.sentinelLauncherMinion = {
    ...sentinelMinionProps,
    LABEL: "Missile Sentinel",
    GUNS: [
        {
            POSITION: [3, 12.45, -1.35, 17.2, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher, { damage: 0.45 }]),
                TYPE: "sentinelMissile",
            },
        }, {
            POSITION: [17.5, 13, 1.25, 0, 0, 0, 0],
        }, {
            POSITION: [18.55, 20.25, 0.25, 1, 0, 0, 0],
        },
    ],
}
Class.overviewer = {
    PARENT: "genericTank",
    LABEL: "Overviewer",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: weaponArray({
        POSITION: [6, 12, 1.2, 8, 0, 120, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { reload: 1.1 }]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 8,
        }
    }, 3)
}
Class.sentinelCrossbowMinion = {
    ...sentinelMinionProps,
    LABEL: "Crossbow Sentinel",
    GUNS: [
        {
            POSITION: [15, 2.5, 1, 0, 3.5, 35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [15, 2.5, 1, 0, -3.5, -35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3.5, 1, 0, 4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3.5, 1, 0, -4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7, reload: 2, recoil: 0.5 }, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.sentinelMinigunMinion = {
    ...sentinelMinionProps,
    LABEL: "Minigun Sentinel",
    GUNS: [
        {
            POSITION: [16, 7.5, 1, 0, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [11.5, 7.5, -1.33, 1, 4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [16, 7.5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [11.5, 7.5, -1.33, 1, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [22.5, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [20.4, 9, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [18.3, 9, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam, { damage: 0.45 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.watchwoman = {
    PARENT: "genericTank",
    LABEL: "Watchwoman",
    DANGER: 7,
    SHAPE: 5,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 7.5, size: 2, health: 4, damage: 1.2, pen: 1.2, speed: 0.45, maxSpeed: 0.45 }]),
                TYPE: "sentinelLauncherMinion",
                MAX_CHILDREN: 1,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true
            },
        },
        {
            POSITION: [12, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 7.5, size: 2, health: 4, damage: 1.2, pen: 1.2, speed: 0.45, maxSpeed: 0.45 }]),
                TYPE: "sentinelCrossbowMinion",
                MAX_CHILDREN: 1,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true
            },
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 7.5, size: 2, health: 4, damage: 1.2, pen: 1.2, speed: 0.45, maxSpeed: 0.45 }]),
                TYPE: "sentinelMinigunMinion",
                MAX_CHILDREN: 1,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true
            },
        },
        {
            POSITION: [ 4, 4, 0.6, 13, 0, 0, 0, ],
        },
    ],
}
Class.megaMinion = {
    PARENT: "minion",
    LABEL: "Mega Minion",
    GUNS: [
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
}
Class.bananaMinion = {
    PARENT: "minion",
    LABEL: "Giga Minion",
    GUNS: [
        {
            POSITION: [17, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
    BODY: {
        FOV: 0.5,
        SPEED: 2.825,
        ACCELERATION: 1,
        HEALTH: 10,
        SHIELD: 0,
        DAMAGE: 1.6,
        RESIST: 1,
        PENETRATION: 1.1,
        DENSITY: 0.4,
    },
}
Class.creator = {
    PARENT: "genericTank",
    LABEL: "The Creator",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.2,
    },
    GUNS: [
        {
            POSITION: [6, 14, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 17, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: "minion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 7,
            },
        },
        {
            POSITION: [12, 17, 1, 0, 0, 0, 0],
        },
    ],
};
Class.topBanana = {
    PARENT: "factory",
    LABEL: "Top Banana",
    BODY: {FOV: 1.1 * base.FOV},
    GUNS: [
        {
            POSITION: [5, 17, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 20, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 5, size: 1.1, health: 5, speed: 0.5, maxSpeed: 0.5 }]),
                TYPE: "bananaMinion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                DELAY_SPAWN: true,
                MAX_CHILDREN: 1,
            },
        },
        {
            POSITION: [12, 20, 1, 0, 0, 0, 0],
        },
    ],
}
Class.foundry = {
    PARENT: "factory",
    LABEL: "Foundry",
    BODY: {FOV: 1.1 * base.FOV},
    GUNS: [
        {
            POSITION: [5, 13, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 3, size: 1.15, health: 2, speed: 0.6, maxSpeed: 0.6 }]),
                TYPE: "megaMinion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [12, 16, 1, 0, 0, 0, 0],
        },
    ],
}
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
            POSITION: [5.25, 9, 1.2, 8, 0, 60, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.drone,
                    g.sunchip,
                    g.negro,
                    { damage: 0.32, size: 0.7, reload: 0.7 },
                    { size: 1.5 }
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
                    { size: 2.1, speed: 0.9, maxSpeed: 0.9 },
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
    NECRO: [3,4,5,6]
}
Class.trichippoly = {
    PARENT: "trichip",
    NECRO: [3,4,5,6]
}
Class.pentachippoly = {
    PARENT: "pentachip",
    NECRO: [3,4,5,6]
}
Class.hexachippoly = {
    PARENT: "realchip",
    NECRO: [3,4,5,6]
}
Class.polyseer = {
    PARENT: "genericTank",
    LABEL: "Polyseer",
    DANGER: 6,
    UPGRADE_TOOLTIP: "[WARNING] This tank cannot use it's body to reanimate shapes!",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    SHAPE: 7,
    MAX_CHILDREN: 10,
    GUNS: polyGuns
}
Class.polymancer = {
    PARENT: "genericTank",
    LABEL: "Polymancer",
    DANGER: 6,
    UPGRADE_TOOLTIP: "[WARNING] This tank cannot use it's body to reanimate shapes!",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
        SPEED: 0.9
    },
    SHAPE: 8,
    MAX_CHILDREN: 12,
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
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.negro, g.pounder, { reload: 1.5, size: 1.5 }]),
            TYPE: "pentachippoly",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "necro",
            WAIT_TO_CYCLE: true,
            DELAY_SPAWN: false
        }
    },
    {
        POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.negro, g.pounder, g.destroyer, { reload: 2, size: 2, speed: 1.4, maxSpeed: 1.4 }]),
            TYPE: "hexachippoly",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "necro",
            WAIT_TO_CYCLE: true,
            DELAY_SPAWN: false
        }
    }
]
}
Class.screamer = {
    PARENT: "genericTank",
    LABEL: "Screamer",
    DANGER: 6,
    UPGRADE_TOOLTIP: "[WARNING] This tank cannot use it's body to reanimate shapes!",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    MAX_CHILDREN: 14,
    GUNS: [
        ...polyGuns,
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 14, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        },
]
}
Class.trapMinion = {
    PARENT: "minion",
    LABEL: "Trapper Minion",
    GUNS: [
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 7
            }
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 15
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minionGun]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap"
            }
        }
    ],
}
Class.desmosMinion = {
    PARENT: "minion",
    LABEL: "Desmos Minion",
    GUNS: [
        {
            POSITION: [20, 8, -4/3, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.5, -6.25, 90, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.5, 6.25, -90, 0]
        }
    ],
}
Class.cloner = {
    PARENT: "factory",
    LABEL: "Cloner",
    BODY: {FOV: 1.1 * base.FOV},
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 17, 1, 15.5, 0, 0, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: "desmosMinion",
                MAX_CHILDREN: 1,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true
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
                SYNCS_SKILLS: true
            },
        },
        {
            POSITION: [2, 17, 1, 15.5, 0, 0, 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 2, size: 1.2, health: 3, speed: 0.75, maxSpeed: 0.75 }]),
                TYPE: "megaMinion",
                MAX_CHILDREN: 1,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true
            },
        },
    ],
}
Class.squareMinion = {
    PARENT: "minion",
    LABEL: "Square Minion",
    SHAPE: 4,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.7, 7, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.twin]),
                TYPE: "bullet"
            },
        },
        {
            POSITION: [7, 7.5, 0.7, 7, -5.5, 0, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.twin]),
                TYPE: "bullet"
            },
        },
    ]
}
Class.watchman = {
    PARENT: "factory",
    LABEL: "Watchman",
    SHAPE: 4,
    BODY: {FOV: 1.1 * base.FOV},
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, { reload: 2, health: 1.2 }]),
                TYPE: "squareMinion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [12, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [ 2, 2, 0.1, 15.5, 4, 0, 0, ],
        }, {
            POSITION: [ 2, 2, 0.1, 15.5, -4, 0, 0, ],
        },
    ],
}
Class.industry = {
    PARENT: "genericTank",
    LABEL: "Industry",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.1,
    },
    GUNS: weaponArray([
        {
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, {health: 0.4, damage: 0.4}]),
                TYPE: "minion",
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 12, 1, 0, 0, 0, 0],
        },
    ], 3),
};
Class.despot = makeOver({
    PARENT: "genericTank",
    LABEL: "Despot",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [19, 2, 1, 0, -3.5, 0, 0.67],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.power,
                    g.twin,
                    { speed: 0.7, maxSpeed: 0.7 },
                    g.flankGuard,
                    { recoil: 1.8 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 3.5, 0, 0.33],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.power,
                    g.twin,
                    { speed: 0.7, maxSpeed: 0.7 },
                    g.flankGuard,
                    { recoil: 1.8 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.power,
                    g.twin,
                    { speed: 0.7, maxSpeed: 0.7 },
                    g.flankGuard,
                    { recoil: 1.8 },
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 13, 1, 0, 0, 0, 0],
        },
    ],
}, "Despot");
Class.realstar = {
    PARENT: "genericTank",
    LABEL: "Star",
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 20.5,
            WIDTH: 12
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
            TYPE: "bullet"
        }
    }, 3)
}
Class.deathstar = {
    PARENT: "genericTank",
    LABEL: "Death Star",
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 20.5,
            WIDTH: 12
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
            TYPE: "bullet"
        }
    }, 6, 0.5)
}
Class.neutronstar = {
    PARENT: "genericTank",
    LABEL: "Neutron Star",
    GUNS: weaponArray({
        POSITION: [21, 14, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder, g.destroyer]),
            TYPE: "bullet"
        }
    }, 3)
}
Class.apex = {
    PARENT: "hunter",
    LABEL: "Apex",
    BODY: { FOV: 1.2 * base.FOV },
    GUNS: weaponArray([
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ], 3)
}
Class.ringer = {
    PARENT: "sniper",
    LABEL: "Ringer",
    BODY: { FOV: 1.2 * base.FOV },
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 24,
            WIDTH: 8
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.sniper]),
            TYPE: "bullet"
        }
    }, 3)
}
Class.winger = {
    PARENT: "sniper",
    BODY: { FOV: 1.2 * base.FOV },
    LABEL: "Winger",
    GUNS: weaponArray({
        POSITION: {
            LENGTH: 24,
            WIDTH: 8
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.sniper]),
            TYPE: "bullet"
        }
    }, 6, 0.5)
}
Class.singer = {
    PARENT: "assassin",
    LABEL: "Singer",
    BODY: {
        FOV: 1.55 * base.FOV,
    },
    GUNS: weaponArray(
        [{
            POSITION: [27, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
                TYPE: "bullet"
            }
        },], 3)
}
Class.fullyAutomatic = {
    PARENT: "genericTank",
    LABEL: "Fully Automatic",
    BODY: {
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8.5,
                ASPECT: 1.4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.assaulter = {
    PARENT: "genericTank",
    LABEL: "Assaulter",
    DANGER: 7,
    BODY: {
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: [28, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, g.sniper, { recoil: 1.15, damage: 0.9 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8.5,
                ASPECT: 1.4
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.machineGun, { damage: 0.9 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.microgun = {
    PARENT: "genericTank",
    LABEL: "Microgun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [24, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.sniper, { damage: 0.9 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [22, 9, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.sniper, { damage: 0.9 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 9, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.sniper, { damage: 0.9 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.hider = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Hider",
    BODY: {
        FOV: 1.35 * base.FOV
    },
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible.",
    GUNS: [
        {
            POSITION: [24, 8, -1.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.rogue = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Rogue",
    ALPHA: 0.3,
    GUNS: [
        {
            POSITION: [19, 11, -1.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        },
    ]
}
Class.leader = {
    PARENT: "genericTank",
    LABEL: "Leader",
    DANGER: 7,
    ALPHA: 0.25,
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { reload: 0.6 }]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 8,
            },
        },
    ],
}
Class.autoBoomerang = makeAuto(Class.boomerang)
Class.kinballer = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Fender",
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
            POSITION: [2, 10, 1.3, 20, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang]),
                TYPE: "autoBoomerang",
                STAT_CALCULATOR: "block",
            },
        },
        {
            POSITION: [2, 12, 1, 18, 0, 0, 0],
        },
    ],
};
Class.quadBuilder = {
    PARENT: "genericTank",
    LABEL: "Quad Builder",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: weaponArray(
        [
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                    TYPE: "unsetTrap",
                    STAT_CALCULATOR: "block",
                    DESTROY_OLDEST_CHILD: true,
                    MAX_CHILDREN: 6
                },
            },
        ], 4
    )
}
Class.pentaBuilder = {
    PARENT: "genericTank",
    LABEL: "Penta Builder",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: weaponArray(
        [
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                    TYPE: "unsetTrap",
                    STAT_CALCULATOR: "block",
                    DESTROY_OLDEST_CHILD: true,
                    MAX_CHILDREN: 6
                },
            },
        ], 5
    )
}
Class.shadowsunchip = {
    PARENT: "sunchip",
    NECRO: [3,4,5,6],
    ALPHA: 0.3
}
Class.shadowtrichip = {
    PARENT: "trichip",
    NECRO: [3,4,5,6],
    ALPHA: 0.3
}
Class.polyshadow = {
    PARENT: "genericTank",
    LABEL: "Femaleficitor",
    DANGER: 6,
    UPGRADE_TOOLTIP: "[WARNING] This tank cannot use it's body to reanimate shapes!",
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
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.negro, {reload: 0.8, damage: 0.8}]),
                TYPE: "shadowsunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "necro",
                WAIT_TO_CYCLE: true,
                DELAY_SPAWN: false
            }
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.negro, {reload: 0.8, damage: 0.32}]),
                TYPE: "shadowtrichip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "necro",
                WAIT_TO_CYCLE: true,
                DELAY_SPAWN: false
            }
        }
    ]
}
Class.hawk = makeOver(Class.triAngle, "Hawk", { count: 1, independet: true })
Class.smashGuard = {
    PARENT: "basic",
    LABEL: "Smasher Guard",
    
    TURRETS: [
        ...smashBody
    ],
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ]
}
Class.tankGuardian = {
    PARENT: "trapGuard",
    LABEL: "Tank Guardian",
    
    TURRETS: [
        ...smashBody
    ]
}
Class.homelandDefender = {
    PARENT: "bushwhacker",
    LABEL: "Homeland Defender",
    
    TURRETS: [
        ...smashBody
    ]
}
Class.autoTrap = makeAuto(Class.trap, "Auto-Trap", { type: "droneAutoTurret" })
Class.clusterDeco = makeDeco(0);
Class.clusterMissile = {
    PARENT: "bullet",
	LABEL: "Missile",
	INDEPENDENT: true,
	BODY: { RANGE: 120 },
    PROPS: [{
        POSITION: [10, 0, 0, 0, 1],
        TYPE: "clusterDeco"
    }],
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
                    SHOOT_ON_DEATH: true
                },
            }, 8
        )
    ]
};
Class.cluster = {
    PARENT: "bullet", 
    LABEL: "Cluster",
    INDEPENDENT: true,
    BODY: { RANGE: 120 },   
    PROPS: [{
        POSITION: [10, 0, 0, 0, 1],
        TYPE: "clusterDeco"
    }],
    GUNS: weaponArray(
        {
            POSITION: [1, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                ALPHA: 0,
                SHOOT_ON_DEATH: true
            },
        }, 8
    )
}
Class.hyperClusterMissile = {
    PARENT: "bullet",
	LABEL: "Missile",
	INDEPENDENT: true,
	BODY: { RANGE: 120 },
    PROPS: [{
        POSITION: [10, 0, 0, 0, 1],
        TYPE: "clusterDeco"
    }],
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
                    SHOOT_ON_DEATH: true
                },
            }, 3
        )
    ]
}
Class.neutronMissile = {
    PARENT: "bullet", 
    LABEL: "Missile",
    INDEPENDENT: true,
    BODY: { RANGE: 120 },   
    PROPS: [{
        POSITION: [10, 0, 0, 0, 1],
        TYPE: "clusterDeco"
    }],
    GUNS: weaponArray(
        {
            POSITION: [1, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.launcher, g.pounder, { size: 2.5 }]),
                TYPE: ["minimissile", { PERSISTS_AFTER_DEATH: true }],
                ALPHA: 0,
                SHOOT_ON_DEATH: true
            },
        }, 4
    )
}
Class.pen = {
    PARENT: "genericTank",
    LABEL: "Pen",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: 1,
                X: 0,
                Y: 0,
                ANGLE: 0,
                DELAY: 0
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
            },
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
};
Class.overpen = makeOver(Class.pen, "Overpen", {count: 2, independent: false})
Class.hexadecimator = {
    PARENT: "genericTank",
    LABEL: "Hexadecimator",
    STAT_NAMES: statnames.mixed,
    GUNS: weaponArray([
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: 1,
                X: 0,
                Y: 0,
                ANGLE: 0,
                DELAY: 0
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.doubleTwin, g.twin]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                ANGLE: 180
            },
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13,
                ANGLE: 180
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.doubleTwin, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ], 3),
};
Class.employer = {
    PARENT: "genericTank",
    LABEL: "Employer",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: {
                LENGTH: 22,
                WIDTH: 8,
                ASPECT: 1,
                X: 0,
                Y: 0,
                ANGLE: 0,
                DELAY: 0
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.doubleTwin, g.twin]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 15,
                WIDTH: 8,
            },
        },
        {
            POSITION: {
                LENGTH: 12,
                WIDTH: 12,
            },
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 15,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.doubleTwin, g.twin]),
                TYPE: "autoTrap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
};
Class.kraal = {
    PARENT: "genericTank",
    LABEL: "Kraal",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 24,
                WIDTH: 8,
                ASPECT: 1,
                X: 0,
                Y: 0,
                ANGLE: 0,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.twin]),
                TYPE: "setTrap",
                STAT_CALCULATOR: "block",
            },
        },
    ],
};
Class.cache = {
    PARENT: "genericTank",
    LABEL: "Cache",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: 1,
                X: 0,
                Y: 5.5,
                ANGLE: 0,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                Y: 5.5,
                ANGLE: 8
            },
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13,
                Y: 5.5,
                ANGLE: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: {
                LENGTH: 20,
                WIDTH: 8,
                ASPECT: 1,
                X: 0,
                Y: -5.5,
                ANGLE: 0,
                DELAY: 1/2
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 8,
                Y: -5.5,
                ANGLE: -8
            },
        },
        {
            POSITION: {
                LENGTH: 4,
                WIDTH: 8,
                ASPECT: 1.7,
                X: 13,
                Y: -5.5,
                DELAY: 1/2,
                ANGLE: -8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
};
Class.tank = {
    PARENT: "genericTank",
    LABEL: "Tank",
    BODY: {
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: basePlayerHealth,
        DAMAGE: base.DAMAGE,
        PENETRATION: base.PENETRATION,
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 1,
        HETERO: 3,
    },
}
Class.single = {
    PARENT: "genericTank",
    LABEL: "Single",
    DANGER: 4,
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        }
    ]
}
Class.heavy = {
    PARENT: "genericTank",
    LABEL: "Heavy",
    DANGER: 4,
    GUNS: [
        {
            POSITION: {
                LENGTH: 17,
                WIDTH: 10.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier]),
                TYPE: "bullet",
            }
        }
    ]
}
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
                STAT_CALCULATOR: "block"
            },
        },
    ],
}
Class.wark = {
    PARENT: "genericTank",
    LABEL: "Wark",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                Y: 5.5,
                ANGLE: 8
            },
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 13,
                Y: 5.5,
                ANGLE: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                Y: -5.5,
                DELAY: 1/2,
                ANGLE: -8
            },
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 13,
                Y: -5.5,
                DELAY: 1/2,
                ANGLE: -8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
};
Class.warkloon = {
    PARENT: "genericTank",
    LABEL: "Warkloon",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 3.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 60, 1 / 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -60, 1 / 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 120, 1 / 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -120, 1 / 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                Y: 5.5,
                ANGLE: 8
            },
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 13,
                Y: 5.5,
                ANGLE: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                Y: -5.5,
                DELAY: 1 / 2,
                ANGLE: -8
            },
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 13,
                Y: -5.5,
                DELAY: 1 / 2,
                ANGLE: -8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                Y: 5.5,
                ANGLE: 188
            },
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 13,
                Y: 5.5,
                ANGLE: 188
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: {
                LENGTH: 13,
                WIDTH: 7,
                Y: -5.5,
                DELAY: 1 / 2,
                ANGLE: -188
            },
        },
        {
            POSITION: {
                LENGTH: 3,
                WIDTH: 7,
                ASPECT: 1.7,
                X: 13,
                Y: -5.5,
                DELAY: 1 / 2,
                ANGLE: -188
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
Class.raider = {
    PARENT: "genericTank",
    LABEL: "Raider",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    BODY: {FOV: 1.2 * base.FOV},
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.flankGuard,
                    g.twin,
                    g.doubleTwin,
                    g.sniper
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.flankGuard,
                    g.twin,
                    g.doubleTwin,
                    g.sniper
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 8, 1, 0, 5.5, 185, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 185, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, 175, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, 175, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
};
Class.dobloon = {
    PARENT: "genericTank",
    LABEL: "Dobloon",
    DANGER: 7,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
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
        ...dobloong
    ],
};
Class.oobloon = {
    PARENT: "genericTank",
    LABEL: "Oobloon",
    DANGER: 7,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
        ...dobloong
    ],
};
Class.superloon = {
    PARENT: "genericTank",
    LABEL: "Superloon",
    DANGER: 7,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },

        {
            POSITION: [15, 3.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 35, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -35, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 142.5, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -142.5, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 115, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -115, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 62.5, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -62.5, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.twinloon = {
    PARENT: "doubleTwin",
    LABEL: "Twinloon",
    DANGER: 7,
    HAS_NO_RECOIL: true,
    GUNS: [
        ...weaponArray(
        [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                    TYPE: "bullet",
                },
            },
        ], 2
        ),
        ...dobloong
    ]
}
Class.equalizer = {
    PARENT: "genericTank",
    LABEL: "Equalizer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [3.5, 3.5, 1.7, 12, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.twin,
                    g.gunner,
                    { speed: 1.2, damage: 1.4, health: 1.25 },
                ]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [3.5, 3.5, 1.7, 12, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.twin,
                    g.gunner,
                    { speed: 1.2, damage: 1.4, health: 1.25 },
                ]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5]
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75]
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0]
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25]
        },
        {
            POSITION: [2.5, 3.5, 1.7, 16, 3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.twin,
                    g.gunner,
                    { speed: 1.2, damage: 1.4, health: 1.25 },
                ]),
                TYPE: "trap",
            },
        },
        {
            POSITION: [2.5, 3.5, 1.7, 16, -3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.twin,
                    g.gunner,
                    { speed: 1.2, damage: 1.4, health: 1.25 },
                ]),
                TYPE: "trap",
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
            POSITION: [4, 8, 1.3, 18, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun,  { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        {
            POSITION: [4, 8, 1.3, 14, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun,  { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
    ],
}
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
            POSITION: [6, 6, 1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet"
            },
        },
        {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang]),
                TYPE: "boomerang",
                STAT_CALCULATOR: "block"
            },
        },
    ],
}
Class.highlord = makeOver({
    PARENT: "genericTank",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    BODY: {
        FOV: base.FOV * 1.2
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
                    STAT_CALCULATOR: "trap"
                }
            },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet"
            }
        }
    ]
}, "Highlord")
Class.parapet = {
    PARENT: "genericTank",
    LABEL: "Parapet",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 9, 1, 0, 5.5, 185, 0],
        },
        {
            POSITION: [2, 9, 1.1, 18, 5.5, 185, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.setTrap, g.twin, g.twin]),
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
                SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.setTrap, g.twin, g.twin]),
                TYPE: "setTrap",
                STAT_CALCULATOR: "block",
            },
        },
    ],
}
Class.hyperbolia = makeOver({
    PARENT: "genericTank",
    LABEL: "Hyperbolia",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier, g.lessReload, { damage: 2, size: 0.75 }]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
    ]
}, "Hyperbolia", { count: 1, independent: true })
Class.fogOfWar = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "The Fog of War",
    STAT_NAMES: statnames.generic,
    BODY: {
        FOV: 1.05 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.lessReload, {damage: 2}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.lessReload, {damage: 2}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },

        {
            POSITION: [15, 3.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone, g.lessReload, { damage: 2 }]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone, g.lessReload, { damage: 2 }]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 45, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone, g.lessReload, { damage: 2 }]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -45, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone, g.lessReload, { damage: 2 }]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 135, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone, g.lessReload, { damage: 2 }]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, -135, 1/2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone, g.lessReload, { damage: 2 }]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            },
        },
    ]
}
Class.fog = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Fog",
    STAT_NAMES: statnames.generic,
    BODY: {
        FOV: 1.05 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.lessReload, {damage: 2}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        }
    ]
}
Class.daze = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Daze",
    STAT_NAMES: statnames.generic,
    BODY: {
        FOV: 1.05 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [13, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.lessReload, g.fog, {damage: 2}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        }
    ]
}
Class.hypnosis = {
    PARENT: "genericTank",
    DANGER: 8,
    LABEL: "Hypnosis",
    STAT_NAMES: statnames.generic,
    BODY: {
        FOV: 1.05 * base.FOV
    },
    GUNS: [
        {
            POSITION: [8, 8, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {reload: 2}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [8, 8, 1, 0, -5.5, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {reload: 2}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [18, 19, 1, 0, 0, 0, 0.7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fog, {damage: 3.5, speed: 0.7, health: 1.3, reload: 8}]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: [13, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.lessReload, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5}]),
                TYPE: "bullet",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [20, 0.3, -48, 2.5, 2.7, 20, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [15, 0.3, -35, 0.3, 4.5, 23, 0],
        },
        {
            POSITION: [20, 0.3, -48, 2.5, -2.7, -20, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [15, 0.3, -35, 0.3, -4.5, -23, 0],
        },
    ]
}
Class.trance = {
    PARENT: "genericTank",
    LABEL: "Trance",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
    ]
}
Class.reverie = {
    PARENT: "genericTank",
    LABEL: "Reverie",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [3.5, 9, 2.4, -12.5, -4.8, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, 4.8, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -12.5, -0.55, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -12.5, 0.55, -90, 0],
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, -10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
    ]
}
Class.daydream = {
    PARENT: "genericTank",
    LABEL: "Daydream",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.asphyxia = {
    PARENT: "genericTank",
    LABEL: "Asphyxia",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [3.5, 9, 2.4, -12.5, -4.8, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, 4.8, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -12.5, -0.55, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -12.5, 0.55, -90, 0],
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [21, 0.3, -50, 0, 3.25, -19, 0],
            PROPERTIES: {
                COLOR: "#219167"
            }
        },
        {
            POSITION: [21, 0.3, -50, 0, -3.25, 19, 0],
            PROPERTIES: {
                COLOR: "#219167"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: ["bullet", {CONTROLLERS: ['snake']}],
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: ["bullet", {CONTROLLERS: [['snake', {invert: true}]]}],
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, -10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
    ]
}
Class.flashback = {
    PARENT: "genericTank",
    LABEL: "Flashback",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [3.5, 9, 2.4, -12.5, -4.8, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, 4.8, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -12.5, -0.55, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -12.5, 0.55, -90, 0],
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, -10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.mirage = {
    PARENT: "genericTank",
    LABEL: "Mirage",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [17, 4.75, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.awe = {
    PARENT: "genericTank",
    LABEL: "Awe",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [3.5, 9, 2.4, -12.5, -4.8, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, 4.8, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -12.5, -0.55, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -12.5, 0.55, -90, 0],
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, -10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [15, 4, 1.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.machineGun, g.doubleTwin, { pen:1.5, health: 1.6, speed: 0.7, size: 1.6, reload: 0.85}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.illusion = {
    PARENT: "genericTank",
    LABEL: "Illusion",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [17, 4.75, -1.4, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fog, {damage: 2, health: 1.5, reload: 1.8}]),
                TYPE: "swarm",
                COLOR: "#30d5c8",
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.25, -1.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.fog, {damage: 2, health: 1.5, reload: 1.8}]),
                TYPE: "swarm",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.hallucination = {
    PARENT: "genericTank",
    LABEL: "Hallucination",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [18, 4.75, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                COLOR: "#26615c",
            }
        },
        {
            POSITION: [2, 4.75, 1.45, 18, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.fog, {damage: 2}]),
                MAX_CHILDREN: 8,
                DESTROY_OLDEST_CHILD: true,
                TYPE: "trap",
                COLOR: "#26615c",
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                COLOR: "#26615c",
            }
        },
        {
            POSITION: [2, 4.75, 1.45, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.fog, {damage: 2}]),
                MAX_CHILDREN: 8,
                DESTROY_OLDEST_CHILD: true,
                TYPE: "trap",
                COLOR: "#26615c",
            }
        },
    ]
}
Class.nostalgia = {
    PARENT: "genericTank",
    LABEL: "Nostalgia",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [3.5, 9, 2.4, -12.5, -4.8, 90, 0],
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, 4.8, -90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -12.5, -0.55, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -12.5, 0.55, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, -10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.reminiscence = {
    PARENT: "genericTank",
    LABEL: "Reminiscence",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [17, 4.75, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, -4.8, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [3.5, 9, 2.4, -12.5, 4.8, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -12.5, -0.55, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -12.5, 0.55, -90, 0],
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, -10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 10.75, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,]),
                TYPE: "bullet",
                ALPHA: 0,
            }
        },
        {
            POSITION: [13, 4.75, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2}]),
                TYPE: "bullet",
                COLOR: "#30d5c8",
            }
        },
    ]
}
Class.stupefaction = {
    PARENT: "genericTank",
    LABEL: "Stupefaction",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,{damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
    ]
}
Class.stupor = {
    PARENT: "genericTank",
    LABEL: "Stupor",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 0.3, -50, 0, 0, 0, 0],
            PROPERTIES: {
                COLOR: "#5a5a5a"
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog,{damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.fog,]),
                MAX_CHILDREN: 3,
                TYPE: "drone",
                ALPHA: 0,
            }
        },
    ]
}
Class.narcosis = {
    PARENT: "genericTank",
    LABEL: "Narcosis",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 0.3, -50, 0, 0, 0, 0],
            PROPERTIES: {
                COLOR: "#00008b"
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, g.fog,]),
                MAX_CHILDREN: 3,
                TYPE: "minion",
                ALPHA: 0,
            }
        },
    ]
}
Class.rapture = {
    PARENT: "genericTank",
    LABEL: "Rapture",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 0.3, -50, 0, 0, 0, 0],
            PROPERTIES: {
                COLOR: "#5a5a5a"
            }
        },
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2.5, speed: 1.5, health: 1.5, reload: 1.5, size: 0.3}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
            PROPERTIES: {
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [8, 5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 5, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 2, reload: 2, health: 1.3}]),
                TYPE: "heatMissile",
                ALPHA: 0,
            }
        },
        {
            POSITION: [8, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.fog,]),
                MAX_CHILDREN: 3,
                TYPE: "turretedDrone",
                ALPHA: 0,
            }
        },
    ],
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco"
        }
    ]
}
Class.disorientation = {
    PARENT: "genericTank",
    LABEL: "Disorientation",
    STAT_NAMES: statnames.generic,
    GUNS: [
        {
            POSITION: [15, 16, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.fog, {damage: 7, speed: 0.8, health: 4.3, reload: 5.5}]),
                TYPE: "heatMissile",
                COLOR: "#30d5c8"
            }
        },
        {
            POSITION: [5, 10, 2.4, -8, -7.25, 90, 0],
        },
        {
            POSITION: [5, 10, 2.4, -8, 7.25, -90, 0],
        },
        {
            POSITION: [5, 10, 2.1, -8, -3, 90, 0],
            PROPERTIES: {
                COLOR: "#003546"
            }
        },
        {
            POSITION: [5, 10, 2.1, -8, 3, -90, 0],
            PROPERTIES: {
                COLOR: "#003546"
            }
        },
    ]
}
Class.executor = {
    PARENT: "genericTank",
    LABEL: "Executor",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            POSITION: {
                LENGTH: 14.5,
                WIDTH: 11,
                ASPECT: 1.3,
                X: 7,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 8,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
};
Class.octoTrapper = {
    PARENT: "genericTank",
    LABEL: "Octo Trapper",
    DANGER: 7,
    STAT_NAMES: statnames.trap,
    GUNS: weaponArray([
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
    ], 4),
}
Class.superHeavyArtillery = {
    PARENT: "genericTank",
    LABEL: "Superheavy Artillery",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -7, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 7, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19.5, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.artillery]),
                TYPE: "bullet",
                LABEL: "Superheavy",
            },
        },
    ],
};
Class.artillery = {
    PARENT: "genericTank",
    LABEL: "Artillery",
    GUNS: [
        {
            POSITION: [15, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.howitzer = {
    PARENT: "genericTank",
    LABEL: "Howitzer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [11, 3, 1, 0, -6, -7, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [11, 3, 1, 0, 6, 7, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, -4, -7, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, 4, 7, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.queller = {
    PARENT: "genericTank",
    LABEL: "Queller",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [7, 3, 1, 0, -8, -7, 5/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [7, 3, 1, 0, 8, 7, 6/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [11, 3, 1, 0, -6, -7, 3/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [11, 3, 1, 0, 6, 7, 4/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, -4, -7, 1/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, 4, 7, 2/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pelleter,
                    g.artillery,
                    g.twin,
                ]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.beeGuard = {
    PARENT: "genericTank",
    LABEL: "Bee Guard",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [14, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 2 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "swarm",
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [14, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 2 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "swarm",
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.beemaster = {
    PARENT: "genericTank",
    LABEL: "Beemaster",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [10, 3, 1, 0, -8, -7, 3/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 2 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "swarm",
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [10, 3, 1, 0, 8, 7, 4/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 2 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "swarm",
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [14, 3, 1, 0, -6, -7, 1/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 2 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "swarm",
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [14, 3, 1, 0, 6, 7, 2/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee, { size: 2 }]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "swarm",
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heavier, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
};
Class.coop = {
    PARENT: "genericTank",
    LABEL: "Co-Operator",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    BODY: {
        FOV: 1.15 * base.FOV
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
                STAT_CALCULATOR: "block"
            }
        }
    ]
}
Class.mechanic = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Mechanic",
    STAT_NAMES: statnames.trap,
    BUFF_VS_FOOD: true,
    HAS_NO_RECOIL: true,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: weaponArray([
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
                STAT_CALCULATOR: "block"
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ], 3),
}
Class.specializedPillbox = {
    PARENT: "pillbox",
    LABEL: "Specialized Pillbox",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "autoDoubleTurret",
        }
    ],
}
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
                STAT_CALCULATOR: "block"
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
        {
            POSITION: [ 2, 2, 0.1, 18, 4, 0, 0, ],
        }, {
            POSITION: [ 2, 2, 0.1, 18, -4, 0, 0, ],
        },
    ],
}
Class.programAura = addAura(0.6, 2)
Class.programPillbox = {
    PARENT: "pillbox",
    LABEL: "Programmed Pillbox",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "programAura",
        }
    ],
}
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
                STAT_CALCULATOR: "block"
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
        {
            POSITION: [ 3, 4, 0.6, 13.5, 0, 0, 0, ],
        },
    ],
}
Class.mugger = {
    PARENT: "genericTank",
    LABEL: "Mugger",
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
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
            POSITION: [18, 12, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "unsetTrap",
                STAT_CALCULATOR: "block",
            },
        },
    ],
}
Class.hotbed = {
    PARENT: "genericTank",
    LABEL: "Hotbed",
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            POSITION: [ 16, 10, 0.7, 0, 0, 25, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [ 16, 10, 0.7, 0, 0, -25, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.honcho = {
    PARENT: "genericTank",
    LABEL: "Honcho",
    STAT_NAMES: statnames.drone,
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [16, 12, 1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {health: 1.3, damage: 1.3, size: 1.18}]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 5,
            },
        },
    ],
};
Class.executive = {
    PARENT: "genericTank",
    LABEL: "Executive",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            POSITION: [18, 14, 1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, {health: 2, damage: 1.8, pen: 1.15, reload: 1.2, size: 1.35 }]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: "drone",
                MAX_CHILDREN: 3,
            },
        },
    ],
};
Class.villain = makeGuard("assassin", "Villain");
Class.bigSwiss = {
    PARENT: "genericTank",
    LABEL: "Big Swiss",
    DANGER: 6,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [14, 10, 0.6, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer, g.pounder, g.destroyer, { speed: 1.5, maxSpeed: 2.5, size: 1.65, damage: 0.8 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
        {
            POSITION: [14, 10, 0.6, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.swarmeer, g.pounder, g.destroyer, { speed: 1.5, maxSpeed: 2.5, size: 1.65, damage: 0.8 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
};
Class.vulcan = {
    PARENT: "genericTank",
    LABEL: "Vulcan",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [ 20, 4, 1, 0, 0, 0, 0, ],
        },
        {
            POSITION: [ 20, 4, 1, 0, 6.5, 0, 0, ],
        },
        {
            POSITION: [ 20, 4, 1, 0, -6.5, 0, 0, ],
        },
        {
            POSITION: [ 5, 4, 1, 20, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.vulcan,
                ]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: [ 5, 4, 1, 20, 6.5, 0, 1/3, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.vulcan,
                ]),
                TYPE: "bullet",
            }
        },
        {
            POSITION: [ 5, 4, 1, 20, -6.5, 0, 2/3, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.gunner,
                    g.vulcan,
                ]),
                TYPE: "bullet",
            }
        },
    ],
};
Class.bird = makeBird(Class.single, "Bird")
Class.superbird = makeBird(Class.single, "Superbird", {super: true})
Class.cockatiel = makeBird(Class.pen, "Cockatiel")
Class.sunbird = makeBird(Class.gunner, "Sunbird")
Class.siskin = makeBird(Class.honcho, "Siskin")
Class.shoebill = makeBird(Class.coop, "Shoebill")
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
            TYPE: "seerTurret",
        },
    ],
};
Class.droneShip = {
    PARENT: "tank",
    LABEL: "Babyship",
    TURRETS: [
        {
            POSITION: [8, 0, -6.5, 90, 0, 1],
            TYPE: "seedTurret",
        },
        {
            POSITION: [8, 0, 6.5, 90, 0, 1],
            TYPE: "seedTurret",
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
Class.autoTankTurret = makeTurret({
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, { recoil: 0.1 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: "fixedReload"
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.autoTankGunMega = makeTurret({
    GUNS: [
        {
            POSITION: [22, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.autoTankGunGiga = makeTurret({
    GUNS: [
        {
            POSITION: [22, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.autoTankGunTera = makeTurret({
    GUNS: [
        {
            POSITION: [26, 18, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.pounder, g.destroyer, g.sniper]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.autoDoubleTurret = makeTurret({
    GUNS: [
        {
            POSITION: [20, 6, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.twin, { recoil: 0.1 }]),
                TYPE: "bullet"
            },
        },
        {
            POSITION: [20, 6, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.twin, { recoil: 0.1 }]),
                TYPE: "bullet"
            },
        },
    ],
}, {fov: 3, limitFov: true})
Class.tripletAutoTankTurret = makeTurret({
    GUNS: [
        {
            POSITION: [18, 10, 1, 0, 5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, { recoil: 0.1 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [18, 10, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, { recoil: 0.1 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [21, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, { recoil: 0.1 }]),
                TYPE: "bullet",
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.quadrupletTurret = makeTurret({
    GUNS: [
        {
            POSITION: [18, 10, 1, 0, 5.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.doubleTwin, { recoil: 0 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [18, 10, 1, 0, -5.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet,g.doubleTwin, { recoil: 0 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [21, 10, 1, 0, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet,g.doubleTwin, { recoil: 0 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [21, 7, 1, 0, -4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet,g.doubleTwin, { size: 1.5, recoil: 0 }]),
                TYPE: "bullet",
            },
        }
    ],
}, {canRepel: true, limitFov: true, fov: 3})
Class.autoTank = {
    PARENT: "tank",
    LABEL: "Auto",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true }]
        }
    ]
}
Class.doubleAutoTank = {
    PARENT: "tank",
    LABEL: "MACH-II",
    TURRETS: [
        {
            POSITION: [6, -1, 4.5, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true, GUN_STAT_SCALE: { reload: 1.1 } }]
        },
        {
            POSITION: [6, -1, -4.5, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true, GUN_STAT_SCALE: { reload: 1.1 } }]
        }
    ]
}
Class.tripleAutoTank = {
    PARENT: "tank",
    LABEL: "Mechanism",
    TURRETS: [
        {
            POSITION: [6, 4.5, 0, 0, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [6, 4.5, 0, 120, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [6, 4.5, 0, -120, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        }
    ]
}
Class.pentaAutoTank = {
    PARENT: "tank",
    LABEL: "Skynet",
    TURRETS: [
        {
            POSITION: [6, 6.25, 0, 0, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [6, 6.25, 0, 72, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [6, 6.25, 0, 144, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [6, 6.25, 0, -144, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [6, 6.25, 0, -72, 360, 1],
            TYPE: ["autoTankTurret", { INDEPENDENT: true }]
        }
    ]
}
Class.megaAutoTank = {
    PARENT: "tank",
    LABEL: "Megabyte",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGunMega", { INDEPENDENT: true }]
        }
    ]
}
Class.gigaAutoTank = {
    PARENT: "tank",
    LABEL: "Gigabyte",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGunGiga", { INDEPENDENT: true }]
        }
    ]
}
Class.teraAutoTank = {
    PARENT: "tank",
    LABEL: "Terabyte",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGunTera", { INDEPENDENT: true }]
        }
    ]
}
Class.doublegAutoTank = {
    PARENT: "tank",
    LABEL: "Main",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoDoubleTurret", { INDEPENDENT: true, }]
        }
    ]
}
Class.tripletAutoTank = {
    PARENT: "tank",
    LABEL: "Triplet",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["tripletAutoTankTurret", { INDEPENDENT: true, }]
        }
    ]
}
Class.quadrupleAutoTank = {
    PARENT: "tank",
    LABEL: "Quadruplet",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["quadrupletTurret", { INDEPENDENT: true, }]
        }
    ]
}
Class.machine = {
    PARENT: "tank",
    LABEL: "Machine",
    SHAPE: 6,
    BODY: {
        HEALTH: 2.5 * basePlayerHealth,
    }
}
Class.bigDeco = makeDeco(4.5, "mirror")
Class.brickTank = {
    PARENT: "tank",
    LABEL: "City",
    SHAPE: 7,
    BODY: {
        HEALTH: 3.5 * basePlayerHealth,
    },
    PROPS: [
        {
            POSITION: [8, 0, 0, 0, 1],
            TYPE: 'bigDeco'
        }
    ]
}
Class.biggerDeco = makeDeco(5, "mirror")
Class.headquarters = {
    PARENT: "tank",
    LABEL: "Headquarters",
    SHAPE: 7,
    BODY: {
        HEALTH: 4.5 * basePlayerHealth,
    },
    PROPS: [
        {
            POSITION: [10, 0, 0, 0, 1],
            TYPE: 'biggerDeco'
        }
    ]
}
Class.bunker = {
    PARENT: "tank",
    LABEL: "Bunker",
    SHAPE: 7,
    BODY: {
        HEALTH: 5 * basePlayerHealth,
    },
    PROPS: [
        {
            POSITION: [11, 0, 0, 0, 1],
            TYPE: 'biggerDeco'
        },
        {
            POSITION: [4.5, 0, 0, 0, 1],
            TYPE: 'bigDeco'
        }
    ]
}
Class.smashTankBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true
}
Class.smasherTank = {
    PARENT: "tank",
    LABEL: "Smasher",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        }
    ],
    BODY: {
        DAMAGE: 1.4 * base.DAMAGE
    }
}
Class.crusherBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: "black",
    SHAPE: 5,
    INDEPENDENT: true
}
Class.crusher = {
    PARENT: "tank",
    LABEL: "Crusher",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "crusherBody"
        }
    ],
    BODY: {
        DAMAGE: 1.6 * base.DAMAGE
    }
}
Class.brambleBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: "black",
    SHAPE: 4,
    INDEPENDENT: true
}
Class.bramble = {
    PARENT: "tank",
    LABEL: "Bramble",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "brambleBody"
        }
    ],
    BODY: {
        DAMAGE: 1.8 * base.DAMAGE
    }
}
Class.nettleBody = {
    LABEL: "",
    FACING_TYPE: ["spin", { speed: 0.1 }],
    COLOR: "black",
    SHAPE: 4.5,
    INDEPENDENT: true
}
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
        DAMAGE: 1.8 * base.DAMAGE,
        SPEED: 1.1 * base.SPEED
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
Class.decorativeAura1 = addAura(0, 1.15);
Class.auraTankGenBig = addAura(1, 1.2);
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
Class.decorativeAura2 = addAura(0, 1.3);
Class.decorativeAura3 = addAura(0, 1.2);
Class.auraTankGenBigger = addAura(1, 1.35);
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
Class.decorativeAura5 = addAura(0, 1.3);
Class.decorativeAura4 = addAura(0, 1.4);
Class.auraTankGenBiggest = addAura(1.5, 1.5);
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
Class.auraTankGenSmall = addAura(0.6, 1.8)
Class.heliosphere = {
    PARENT: "tank",
    LABEL: "Heliosphere",
    TURRETS: [
        {
            POSITION: [6, 4.5, 0, 0, 360, 1],
            TYPE: "auraTankGenSmall"
        },
        {
            POSITION: [6, 4.5, 0, 120, 360, 1],
            TYPE: "auraTankGenSmall"
        },
        {
            POSITION: [6, 4.5, 0, -120, 360, 1],
            TYPE: "auraTankGenSmall"
        },
    ]
}
Class.realm = {
    PARENT: "tank",
    LABEL: "Realm",
    TURRETS: [
        {
            POSITION: [6, 6.25, 0, 0, 360, 1],
            TYPE: "auraTankGenSmall"
        },
        {
            POSITION: [6, 6.25, 0, 72, 360, 1],
            TYPE: "auraTankGenSmall"
        },
        {
            POSITION: [6, 6.25, 0, -72, 360, 1],
            TYPE: "auraTankGenSmall"
        },
        {
            POSITION: [6, 6.25, 0, 144, 360, 1],
            TYPE: "auraTankGenSmall"
        },
        {
            POSITION: [6, 6.25, 0, -144, 360, 1],
            TYPE: "auraTankGenSmall"
        }
    ]
}
Class.healAuraTankGen = addAura(-1)
Class.thermosphere = {
    PARENT: "tank",
    LABEL: "Thermosphere",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "healAuraTankGen"
        }
    ]
}
Class.menderAura = addAura(-2.1, 1.5)
Class.mender = {
    PARENT: "tank",
    LABEL: "Mender",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "menderAura"
        }
    ]
}
Class.thermalAura = addAura(-0.6, 2)
Class.thermostation = {
    PARENT: "tank",
    LABEL: "Thermostation",
    TURRETS: [
        {
            POSITION: [6, 6.25, 0, 0, 360, 1],
            TYPE: "thermalAura"
        },
        {
            POSITION: [6, 6.25, 0, 72, 360, 1],
            TYPE: "thermalAura"
        },
        {
            POSITION: [6, 6.25, 0, -72, 360, 1],
            TYPE: "thermalAura"
        },
        {
            POSITION: [6, 6.25, 0, 144, 360, 1],
            TYPE: "thermalAura"
        },
        {
            POSITION: [6, 6.25, 0, -144, 360, 1],
            TYPE: "thermalAura"
        }
    ]
}
Class.system = {
    PARENT: "tank",
    LABEL: "System",
    PROPS: [
        {
            POSITION: [8, 0, 0, 0, 1],
            TYPE: ["pentagon", {COLOR: "grey"}]
        }
    ]
}
Class.flankspinTurret = {
    PARENT: "genericTank",
    BODY: { FOV: 3 },
    CONTROLLERS: ["nearestDifferentMaster"],
    FACING_TYPE: "fastspin",
    GUNS: weaponArray({
        POSITION: [14, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: false,
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.spinner]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            STAT_CALCULATOR: "thruster",
            WAIT_TO_CYCLE: true,
            COLOR: "mirror"
        },
    }, 3),
}
Class.spinner = {
    PARENT: "tank",
    LABEL: "Spinner",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["flankspinTurret", { INDEPENDENT: true }]
        }
    ]
}
Class.hyperspinTurret = {
    PARENT: "genericTank",
    BODY: { FOV: 3 },
    CONTROLLERS: ["nearestDifferentMaster"],
    FACING_TYPE: "fastspin",
    GUNS: weaponArray({
        POSITION: [14, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            AUTOFIRE: false,
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.spinner]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            WAIT_TO_CYCLE: true,
            COLOR: "mirror"
        },
    }, 4),
}
Class.hyperspinner = {
    PARENT: "tank",
    LABEL: "Hyperspinner",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["hyperspinTurret", { INDEPENDENT: true }]
        }
    ]
}
Class.ultraspinTurret = {
    PARENT: "genericTank",
    BODY: { FOV: 3 },
    CONTROLLERS: ["nearestDifferentMaster"],
    FACING_TYPE: "fastspin",
    GUNS: weaponArray({
        POSITION: [14, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.spinner]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            WAIT_TO_CYCLE: true,
            COLOR: "mirror"
        },
    }, 6, 0.5),
}
Class.ultraspinner = {
    PARENT: "tank",
    LABEL: "Ultraspinner",
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["ultraspinTurret", { INDEPENDENT: true }]
        }
    ]
}
// Mixing
Class.top = {
    PARENT: "tank",
    LABEL: "Top",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE
    }
}
Class.presidio = {
    PARENT: "tank",
    LABEL: "Presidio",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "crusherBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 2 * base.DAMAGE
    }
}
Class.entrenchment = {
    PARENT: "tank",
    LABEL: "Entrenchment",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "brambleBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 2.5 * base.DAMAGE
    }
}
Class.outpost = {
    PARENT: "tank",
    LABEL: "Outpost",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoDoubleTurret", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE
    }
}
Class.stockade = {
    PARENT: "tank",
    LABEL: "Stockade",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["tripletAutoTankTurret", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE
    }
}
Class.buffer = {
    PARENT: "tank",
    LABEL: "Buffer",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
Class.cage = {
    PARENT: "tank",
    LABEL: "Cage",
    SHAPE: 7,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true, COLOR: "mirror" }]
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE,
        HEALTH: 3.5 * basePlayerHealth
    },
}
Class.consolidation = {
    PARENT: "tank",
    LABEL: "Consolidation",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoDoubleTurret", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
Class.penitaniary = {
    PARENT: "tank",
    LABEL: "Penitaniary",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "crusherBody"
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["autoTankGun", { INDEPENDENT: true }]
        }
    ],
    BODY: {
        DAMAGE: 2 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
Class.garrison = {
    PARENT: "tank",
    LABEL: "Garrison",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGen"
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE
    }
}
Class.commandPost = {
    PARENT: "tank",
    LABEL: "Command Post",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGenBig"
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE
    }
}
Class.hangar = {
    PARENT: "tank",
    LABEL: "Hangar",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGenBigger"
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE
    }
}
Class.aerosols = {
    PARENT: "tank",
    LABEL: "Aerosol",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "crusherBody"
        },
        {
            POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGen"
        }
    ],
    BODY: {
        DAMAGE: 2 * base.DAMAGE
    }
}
Class.drizzle = {
    PARENT: "tank",
    LABEL: "Drizzle",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "crusherBody"
        },
        {
            POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGenBig"
        }
    ],
    
    BODY: {
        DAMAGE: 2 * base.DAMAGE
    }
}
Class.greenhouse = {
    PARENT: "tank",
    LABEL: "Greenhouse",
    TURRETS: [
        {
            POSITION: { SIZE: 21.5, ARC:360, LAYER: 0 },
            TYPE: "brambleBody"
        },
        {
            POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGen"
        }
    ],
    BODY: {
        DAMAGE: 2.5 * base.DAMAGE
    }
}
Class.jetstream= {
    PARENT: "tank",
    LABEL: "Jetstream",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGen"
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
Class.arboretum= {
    PARENT: "tank",
    LABEL: "Arboretum",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "crusherBody"
        },
        {
            POSITION: { SIZE: 13, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGen"
        }
    ],
    BODY: {
        DAMAGE: 2 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
Class.ozoneDeco = makeDeco(0, "darkGrey")
Class.ozone= {
    PARENT: "tank",
    LABEL: "Ozone",
    SHAPE: 7,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: { SIZE: 13, ARC: 360, LAYER: 0 },
            TYPE: "auraTankGen"
        }
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE,
        HEALTH: 3.5 * basePlayerHealth
    },
    PROPS: [
        {
            POSITION: [14, 0, 0, 0, 1],
            TYPE: "ozoneDeco"
        },
        {
            POSITION: [9.5, 0, 0, 0, 1],
            TYPE: ['bigDeco', { COLOR: "teal" }]
        }
    ]
}
Class.orchard= {
    PARENT: "tank",
    LABEL: "Orchard",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
        {
            POSITION: { SIZE: 14, ARC: 360, LAYER: 1 },
            TYPE: "auraTankGenBig"
        }
    ],
    
    BODY: {
        DAMAGE: 2 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
Class.hut = {
    PARENT: "tank",
    LABEL: "Hut",
    SHAPE: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smashTankBody"
        },
    ],
    BODY: {
        DAMAGE: 1.5 * base.DAMAGE,
        HEALTH: 2.5 * basePlayerHealth
    }
}
//ETHEREALS
const etherealDeco = {
    PARENT: "genericTank",
    SHAPE: 3.5,
    COLOR: "lavender",
    SIZE: 20,
    IS_ETHEREAL: true,
    REROOT_UPGRADE_TREE: "ethereal"
}
const smolEtherealBody = {
    SPEED: base.SPEED * 0.65,
    HEALTH: base.HEALTH * 12,
	SHIELD: base.SHIELD * 2.5,
	REGEN: base.REGEN * 1.25,
    DENSITY: base.DENSITY * 2.5,
    ACCELERATION: base.ACCEL * 0.8,
}
Class.genericSmolEthereal = {
    ...etherealDeco,
    BODY: smolEtherealBody
}
const normEtherealBody = {
    SPEED: base.SPEED * 0.575,
	HEALTH: base.HEALTH * 25,
	SHIELD: base.SHIELD * 3,
	REGEN: base.REGEN * 1.5,
	DENSITY: base.DENSITY * 3,
	ACCELERATION: base.ACCEL * 0.55,
}
Class.genericNormEthereal = {
    ...etherealDeco,
    BODY: normEtherealBody
}
const bigEtherealBody = {
    SPEED: base.SPEED * 0.52,
    HEALTH: base.HEALTH * 40,
	SHIELD: base.SHIELD * 3.6,
	REGEN: base.REGEN * 1.6,
	DENSITY: base.DENSITY * 3.6,
	ACCELERATION: base.ACCEL * 0.4,
}
Class.genericBigEthereal = {
    ...etherealDeco,
    BODY: bigEtherealBody
}
g.autoGun = {recoil: 0.125}
Class.etherealAutoGun = makeTurret({
    GUNS: [
        {
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.heavier, g.autoGun, g.autoTurret, { range: 1.1, damage: 1.275, health: 1.05, reload: 1.05 }]),
                TYPE: "bullet"
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 2})
Class.bombardAutoTurret = makeTurret({
    GUNS: [
        {
            POSITION: [24, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.autoGun, g.autoTurret, { range: 1.1, damage: 1.275, health: 1.05, reload: 1.05 }]),
                TYPE: "bullet"
            },
        },
    ],
}, {canRepel: true, limitFov: true, fov: 2})
Class.spamAutoTurret = {
    PARENT: "autoTankGun",
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.autoTurret, g.autoGun, {recoil: 0.125}]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.ethereal = {
    PARENT: "genericSmolEthereal",
    UPGRADE_LABEL: "ASCEND",
    LABEL: "Ethereal",
}
Class.etherealBody = {
    PARENT: "genericSmolEthereal",
    UPGRADE_LABEL: "ASCEND",
    LABEL: "Node",
}
Class.philistine = {
    PARENT: "genericSmolEthereal",
    LABEL: "Philistine",
    UPGRADE_TOOLTIP: "Bullet Spam",
    GUNS: weaponArray(
        [
            {
                POSITION: {
                    LENGTH: 13.5,
                    WIDTH: 6
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { reload: 1.05, range: 0.9 }]),
                    TYPE: "bullet"
                }
            },
        ], 3
    )
}
Class.spear = {
    PARENT: "genericSmolEthereal",
    LABEL: "Spear",
    UPGRADE_TOOLTIP: "Sniper Branch (higher range, stronger, faster bullets)",
    GUNS: weaponArray(
        {
            POSITION: {
                LENGTH: 23,
                WIDTH: 7
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, {reload: 1.25, health: 1.35, speed: 1.1, maxSpeed: 1.1, density: 1.2, range: 0.65}]),
                TYPE: "bullet",
            },
        }, 3
    )
}
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
                    ASPECT: 1.7
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { reload: 1.05, maxSpeed: 0.9, health: 1.2, damage: 1.2, size: 1.75 }]),
                    TYPE: "drone",
                    MAX_CHILDREN: 2,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: "drone",
                    WAIT_TO_CYCLE: true,
                }
            },
        ], 3
    )
}
Class.despoiler = {
    PARENT: "genericSmolEthereal",
    LABEL: "Despoiler",
    UPGRADE_TOOLTIP: "Heavy Barrels (Super strong bullets)",
    GUNS: weaponArray(
            {
                POSITION: {
                    LENGTH: 17,
                    WIDTH: 9
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pounder, {reload: 0.9, range: 0.9}]),
                    TYPE: "bullet"
                }
            }, 3
    )
}
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
                SHOOT_SETTINGS: combineStats([g.trap, g.pounder, {health: 1.15, shudder: 0.4, speed: 0.85, range: 0.85}]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
            },
        },
        ], 3
    )
}
Class.autoEth = {
    PARENT: "genericSmolEthereal",
    LABEL: "Auto",
    UPGRADE_TOOLTIP: "Mainly focuses on auto-turrets.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: ["etherealAutoGun", { INDEPENDENT: true }]
        }
    ]
}
Class.networks = {
    PARENT: "genericSmolEthereal",
    LABEL: "Network",
    UPGRADE_TOOLTIP: "Center auto turret with more small ones.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: ["etherealAutoGun", { INDEPENDENT: true }]
        },
        {
            POSITION: [5, 8, 0, 60, 360, 1],
            TYPE: ["spamAutoTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [5, 8, 0, 180, 360, 1],
            TYPE: ["spamAutoTurret", { INDEPENDENT: true }]
        },
        {
            POSITION: [5, 8, 0, 300, 360, 1],
            TYPE: ["spamAutoTurret", { INDEPENDENT: true }]
        }
    ]
}
Class.bombard = {
    PARENT: "genericSmolEthereal",
    LABEL: "Bombard",
    UPGRADE_TOOLTIP: "Beefy boi.",
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: ["bombardAutoTurret", { INDEPENDENT: true }]
        }
    ]
}
const timer = (run, duration) => {
    let timer = setInterval(() => run(), 31.25);
    setTimeout(() => {
        clearInterval(timer);
    }, duration * 1000);
};
const damageOnTick = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.poisoned) {
        them.poisoned = true;
        setTimeout(() => {
            them.poisoned = false;
        }, 2 * duration * 1000);
        timer(() => {
            if (them.poisoned && them.health.amount > 10) {
                them.health.amount -= multiplier * 0.5;
            }
        }, 2 * duration);
    }
};
// && instance.type === "food" && instance.type === "tank" && instance.type === "miniboss" && instance.type === "crasher"
const slowOnTick = (body, instance, multiplier, duration) => {
    if (!instance) return
    if (!instance.invuln && !instance.godmode && instance.team !== body.team) timer(() => {
        instance.velocity.x /= 1.05 * multiplier;
        instance.velocity.y /= 1.05 * multiplier;
    }, 1.5 * duration);
};
const paralyze = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.paralyzed) {
        them.paralyzed = true;
        setTimeout(() => {
            them.paralyzed = false;
        }, duration * 1000 * 0.5);
        timer(() => {
            if (them.paralyzed) {
                them.velocity.x = -them.accel.x;
                them.velocity.y = -them.accel.y;
            }
        }, duration * 0.5);
    }
};
const fire = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.isOnFire  && them.type === "food" && them.type === "tank" && them.type === "miniboss" && them.type === "crasher") {
        them.isOnFire = true;
        setTimeout(() => {
            them.isOnFire = false;
        }, duration * 1000);
        timer(() => {
            if (them.isOnFire && them.health.amount > 10) {
                them.health.amount -= multiplier;
            }
        }, duration);
    }
};
const acid = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.acid  && them.type === "food" && them.type === "tank" && them.type === "miniboss" && them.type === "crasher") {
        them.acid = true;
        setTimeout(() => {
            them.acid = false;
        }, 2 * duration * 1000);
        timer(() => {
            if (them.acid) {
                them.shield.amount = Math.max(them.shield.amount - multiplier * 0.2, 0)
                if (them.shield.amount === 0) {
                    if (them.health.amount > 10) {
                        them.health.amount -= 1
                    }
                }
            }
        }, 2 * duration);
    }
};
const lava = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.lava  && them.type === "food" && them.type === "tank" && them.type === "miniboss" && them.type === "crasher") {
        them.lava = true;
        setTimeout(() => {
            them.lava = false;
        }, duration * 1000);
        timer(() => {
            if (them.lava) {
                them.shield.amount = Math.max(them.shield.amount - multiplier * 0.4, 0)
                if (them.shield.amount === 0) {
                    if (them.health.amount > 10) {
                        them.health.amount -= 2
                    }
                }
            }
        }, duration);
    }
};
const pacify = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.pacify) {
        them.pacify = true;
        setTimeout(() => {
            them.pacify = false;
            if (them.socket) {
                if (them.socket.player) {
                    them.socket.player.command.override = them.$overrideStatus
                }
            }
            them.autoOverride = them.store.$overrideStatus
            them.$overrideStatus = null
        }, duration * 1000);
        timer(() => {
            if (them.pacify) {
                // save the orginal override status!
                if (!them.store.$overrideStatus) {
                    let failed = false;
                    //a lotta checks to make sure socket exists.
                    if (them.socket) {
                        if (them.socket.player) {
                            them.$overrideStatus = them.socket.player.command.override
                        } else {
                            failed = true
                        }
                    } else {
                        failed = true
                    }
                    //most likely not a player.
                    if (failed) {
                        them.$overrideStatus = them.autoOverride
                    }
                }

                // Now lets change override to true!!!
                if (them.socket) {
                    if (them.socket.player) {
                        them.socket.player.override = true
                    }
                }
                //second one to be REALLY sure it does work!
                them.autoOverride = true
            }
        }, duration);
    }
};
const toggleGuns = (instance, barrelCanShoot) => {
    if (instance.guns) {
        for (let i = 0; i < instance.guns.length; i++) {
            let gun = instance.guns[i];
            if (gun.settings && gun.bulletType) {
                gun.canShoot = barrelCanShoot
                gun.PROPERTIES.AUTOFIRE = barrelCanShoot
            }
        }
    }
    if (instance.turrets) {
        for (let i = 0; i < instance.turrets.length; i++) {
            let turret = instance.turrets[i];
            if (instance.turrets.GUNS) {
                for (let i = 0; i < instance.turrets.GUNS.length; i++) {
                    turret.GUNS.canShoot = barrelCanShoot
                    turret.GUNS.PROPERTIES.AUTOFIRE = barrelCanShoot
                }
            }
        }
    }
}
const disableWeapons = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.disableWeapons) {
        them.disableWeapons = true;
        setTimeout(() => {
            them.disableWeapons = false;
            toggleGuns(them, true)
        }, duration * 1000);
        timer(() => {
            if (them.disableWeapons) {
                toggleGuns(them, false)
            }
        }, duration);
    }
};
const wither = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.wither  && them.type === "food" && them.type === "tank" && them.type === "miniboss" && them.type === "crasher"
    ) {
        them.wither = true;
        setTimeout(() => {
            them.wither = false;
        }, 2 * duration * 1000);
        timer(() => {
            if (them.wither && them.health.max > 10) {
                them.HEALTH -= multiplier * 0.002
            }
        }, 2 * duration);
    }
};
const decay = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.decay) {
        them.decay = true;
        setTimeout(() => {
            them.decay = false;
        }, 2 * duration * 1000);
        timer(() => {
            if (them.decay && them.shield.max > 10) {
                them.SHIELD -= multiplier * 0.001;
            }
        }, 2 * duration);
    }
};
const radiation = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.radiation) {
        them.radiation = true;
        setTimeout(() => {
            them.radiation = false;
        }, 7 * duration * 1000);
        timer(() => {
            if (them.radiation && them.health.amount) {
                them.health.amount -= multiplier * 0.03;
            }
        }, 7 * duration);
    }
};
const vulnerable = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.vulnerable  && them.type === "food" && them.type === "tank" && them.type === "miniboss" && them.type === "crasher") {
        them.vulnerable = true
        them.store.$savedResist = them.RESIST;
        setTimeout(() => {
            them.vulnerable = false;
            them.RESIST = them.store.$savedResist
            them.store.$savedResist = null
        }, 2 * duration * 1000);
        timer(() => {
            if (them.vulnerable) {
                them.RESIST = them.store.$savedResist / multiplier
            }
        }, 2 * duration);
    }
};
const emp = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.emp) {
        them.emp = true
        setTimeout(() => {
            them.emp = false;
            them.store.$oldShieldAmount = null
        }, 2 * duration * 1000);
        timer(() => {
            if (them.emp) {
                them.shield.amount = 0
                them.store.$oldShieldAmount = them.store.$oldShieldAmount ? them.store.$oldShieldAmount : them.shield.amount
                them.shield.amount = Math.min(them.shield.amount, them.store.$oldShieldAmount)
                them.store.$oldShieldAmount = them.shield.amount
            }
        }, 2 * duration);
    }
};
const fatigued = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.fatigued  && them.type === "food" && them.type === "tank" && them.type === "miniboss" && them.type === "crasher") {
        them.fatigued = true
        setTimeout(() => {
            them.fatigued = false;
            them.store.$oldHealthAmount = null
            them.store.$oldShieldAmount = null
        }, 2 * duration * 1000);
        timer(() => {
            if (them.fatigued) {
                them.store.$oldShieldAmount = them.store.$oldShieldAmount ? them.store.$oldShieldAmount : them.shield.amount
                them.shield.amount = Math.min(them.shield.amount, them.store.$oldShieldAmount)
                them.store.$oldShieldAmount = them.shield.amount

                them.store.$oldHealthAmount = them.store.$oldHealthAmount ? them.store.$oldHealthAmount : them.health.amount
                them.health.amount = Math.min(them.health.amount, them.store.$oldHealthAmount)
                them.store.$oldHealthAmount = them.health.amount
            }
        }, 2 * duration);
    }
};
const ice = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.ice) {
        them.ice = true
        them.store.$savedAcceleration = them.store.$savedAcceleration ?? them.ACCELERATION;
        them.store.$iceMulti = multiplier;
        setTimeout(() => {
            them.ice = false;
            them.ACCELERATION = them.store.$savedAcceleration
            them.store.$savedAcceleration = them.store.$frostbiteMulti ? them.store.$savedAcceleration : null
            them.store.$iceMulti = null;
        }, 2 * duration * 1000);
        timer(() => {
            if (them.ice) {
                them.ACCELERATION = them.store.$savedAcceleration / (multiplier * (them.store.$frostbiteMulti ?? 1))
            }
        }, 2 * duration);
    }
};
const frostbite = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.frostbite) {
        them.frostbite = true
        them.store.$savedAcceleration = them.store.$savedAcceleration ?? them.ACCELERATION;
        them.store.$frostbiteMulti = multiplier;
        them.store.$forstbiteIntensityStore = 0;
        setTimeout(() => {
            them.frostbite = false;
            them.ACCELERATION = them.store.$savedAcceleration
            them.store.$savedAcceleration = them.store.$iceMulti ? them.store.$savedAcceleration : null
            them.store.$frostbiteMulti = null
            them.store.$forstbiteIntensityStore = 0
        }, 3 * duration * 1000);
        timer(() => {
            if (them.frostbite) {
                them.ACCELERATION = them.store.$savedAcceleration / (them.store.$frostbiteMulti * (them.store.$iceMulti ?? 1))
                them.health.amount =  Math.max(them.health.amount - them.store.$forstbiteIntensityStore, 2)

                them.store.$forstbiteIntensityStore = Math.min(Math.max((them.store.$forstbiteIntensityStore + 0.025) - Math.min(Math.round(them.velocity.length), 0.1),0), 1.5)

            }
        }, 3 * duration);
    }
};

const blind = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.blind) {
        them.blind = true
        them.store.$savedFOV = them.FOV;
        them.store.$savedfov = them.fov;
        setTimeout(() => {
            them.blind = false;
            them.FOV = them.store.$savedFOV;
            them.fov = them.store.$savedfov;
            them.store.$savedFOV = null
            them.store.$savedfov = null
        }, 2 * duration * 1000);
        timer(() => {
            if (them.blind) {
                them.FOV = them.store.$savedFOV / multiplier
                them.fov = them.store.$savedfov / multiplier
            }
        }, 2 * duration);
    }
};
const curse = (them, multiplier) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.curse) {
        them.curse = true
        them.store.$savedDamage = them.DAMAGE;
        them.store.$savedPenetration = them.PENETRATION;
        them.store.$savedHetero = them.HETERO;
        timer(() => {
            if (them.curse) {
                them.DAMAGE = them.store.$savedDamage / multiplier
                them.PENETRATION = them.store.$savedPenetration / multiplier
                them.HETERO = them.store.$savedHetero * multiplier
            }
        }, 200000);
    }
};
const suffocation = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.suffocation) {
        them.suffocation = true;
        setTimeout(() => {
            them.suffocation = false;
        }, 2 * duration * 1000);
        timer(() => {
            if (them.suffocation && them.health.amount > 10) {
                them.health.amount -= them.health.max * 0.000025;
            }
        }, 2 * duration);
    }
};
const glue = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.glue) {
        them.glue = true
        them.store.$savedSpeed = them.SPEED;
        setTimeout(() => {
            them.glue = false;
            them.SPEED = them.store.$savedSpeed;
            them.store.$savedSpeed = null
        }, 2 * duration * 1000);
        timer(() => {
            if (them.glue) {
                them.SPEED = them.store.$savedSpeed / multiplier
            }
        }, 2 * duration);
    }
};
Class.poisonbullet = {
    PARENT: "bullet",
    PROPS: [{
        POSITION: [7, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: "green" }]
    }],
    ON: [{
        event: "damage",
        handler: ({ other }) => {
            damageOnTick(other, 0.5, 1);
        }
    }]
}
Class.slowbullet = {
    PARENT: "bullet",
    PROPS: [{
        POSITION: [7, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: "teal" }]
    }],
    ON: [{
        event: "damage",
        handler: ({ body, damageTool }) => {
            slowOnTick(body, damageTool[0], 1, 1, true);
        }
    }]
}
Class.icebullet = {
    PARENT: "bullet",
    PROPS: [{
        POSITION: [7, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: "blue" }]
    }],
    ON: [{
        event: "damage",
        handler: ({ other }) => {
            paralyze(other, 1);
        }
    }]
}
Class.iceGunner = {
    PARENT: "single",
    LABEL: "Ice Gunner",
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "slowbullet",
                COLOR: "teal"
            }
        }
    ]
}
Class.testtank = {
    PARENT: "single",
    LABEL: "PLACEHOLDER A",
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "icebullet",
                COLOR: "blue"
            }
        }
    ]
}
Class.executorBullet = {
    PARENT: 'bullet',
    PROPS: [{
        POSITION: [7, 0, 0, 0, 1],
        TYPE: ["egg", { COLOR: "rainbow" }]
    }],
    ON: [
        {
            event: "collide",
            handler: ({ instance, other }) => {
                if (other.team !== instance.master.master.master.team && other.master === other && other.type !== 'wall') {
                    damageOnTick(other, 2,3) // brings people down to 10 health slowly
                    fire(other,2,3) // poison but does more damage per tick for a shorter amount of time
                    acid(other,2,3) // shield version of poison, if there is no shield it does massive damage to health
                    lava(other,2,3) // shield version of fire, if there is no shield it does massive damage to health
                    paralyze(other, 3) // stops movement
                    pacify(other, 3) // forces override to be on (minions/drones dont automatically attack)
                    disableWeapons(other,3) // disables all guns
                    wither(other,2,3) // slowly lowers max health
                    decay(other,2,3) // slowly lowers shields max health
                    radiation(other,2,3) // slow long lasting poison that doesnt stop at ten health
                    vulnerable(other, 2,3) // people take more damage
                    curse(other,2) // permanent debuff to body stats damage, penetration and hetero
                    emp(other,3) // disables shield and shield regen
                    fatigued(other,3) // disables all regen
                    glue(other,2,3) // lowers max speed
                    ice(other,2,3) // lowers acceleration
                    blind(other,2,3) // lowers fov
                    suffocation(other,2,3) // does 0.0025% of a players max health damage per tick.
                    frostbite(other,2,3) // does increasing damage when the player doesnt move.
                }
            }
        },
    ],
}
Class.placeholderb = {
    PARENT: "genericTank",
    LABEL: "PLACEHOLDER B",
    BODY: {
        FOV: base.FOV
    },
    HAS_NO_RECOIL:true,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 1/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 2/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 3/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 4/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
                COLOR: "rainbow"
            }
        },
    ]
}
Class.poisonGunner = {
    PARENT: "single",
    LABEL: "Poison Gunner",
    GUNS: [
        {
            POSITION: {
                LENGTH: 18,
                WIDTH: 8
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "poisonbullet",
                COLOR: "green"
            }
        }
    ]
}
//IRIDESCENT
//a
Class.irdbasic = makeIrdA("basic")
Class.irddirector = makeIrdA("director")
//b
Class.irdtank = makeIrdB("tank")
Class.irdprimary = makeIrdB("primary")

//Cutthroat

//length, width, aspect, x, y, angle, delay
//size, x, y, angle, arc, layer

Class.annihilator.UPGRADES_TIER_8 = ["doubleDestroyer"];
Class.twin.UPGRADES_TIER_8 = ["doubleDestroyer", "bulldozer"];
Class.musket.UPGRADES_TIER_8 = ["doubleDestroyer", "bulldozer"];
Class.smasher.UPGRADES_TIER_6 = ["starSystem"];
//Class.whirlwind.UPGRADES_TIER_3.push("prophet")
Class.megaTornado.UPGRADES_TIER_6 = ["starSystem"];
//Class.hexaTank.UPGRADES_TIER_3.push("hexaWhirl")
Class.beeNest.UPGRADES_TIER_3 = ["beeHive", "waspNest", "hornetNest", "queenBee", "megaNest",];
Class.realtor.UPGRADES_TIER_8 = ["arbitrator"];
Class.bumblebee.UPGRADES_TIER_2 = ["beeNest"];
Class.bumblebee.UPGRADES_TIER_3 = ["wraith"];
//Class.auto3.UPGRADES_TIER_3.push("whirl3")
//Class.artillery.UPGRADES_TIER_3.push("munition");
Class.radical.UPGRADES_TIER_2 = ["bumblebee", /*"healer",*/ "desmos"];
Class.radical.UPGRADES_TIER_3 = ["advanced"];
Class.gunner.UPGRADES_TIER_3.push("gunnerCruiser", "vulcan");
//Class.trapGuard.UPGRADES_TIER_3.push("whirlGuard")
Class.advanced.UPGRADES_TIER_3 = ["turbinate"]
Class.advanced.UPGRADES_TIER_5 = ["switcheroo", "realtor", "screamer", "flail"];
Class.polyseer.UPGRADES_TIER_3 = ["polymancer", "polyshadow"];
Class.fullyAutomatic.UPGRADES_TIER_3 = ["assaulter", "microgun"];
Class.flankGuard.UPGRADES_TIER_2.push("ringer", "realstar");
Class.triAngle.UPGRADES_TIER_3.push("hawk");
Class.smashGuard.UPGRADES_TIER_4 = ["tankGuardian"];
Class.tankGuardian.UPGRADES_TIER_5 = ["homelandDefender"];
Class.basic.UPGRADES_TIER_0 = ["single", "director", "heavy", "trapper", "radical", "fog"];
        Class.fog.UPGRADES_TIER_2 = ["daze"]
            Class.daze.UPGRADES_TIER_3 = ["hypnosis", "trance", "fogOfWar"]
            Class.trance.UPGRADES_TIER_3 = ["reverie", "daydream", "stupefaction", "hyperbolia"]
            Class.reverie.UPGRADES_TIER_3 = ["flashback", "asphyxia"]
            Class.daydream.UPGRADES_TIER_3 = ["flashback", "mirage"]
            Class.flashback.UPGRADES_TIER_3 = ["nostalgia", "reminiscence", "awe"]
            Class.mirage.UPGRADES_TIER_3 = ["reminiscence", "illusion", "hallucination"]
            Class.stupefaction.UPGRADES_TIER_3 = ["stupor", "disorientation"]
            Class.stupor.UPGRADES_TIER_3 = ["narcosis", "rapture"]
Class.single.UPGRADES_TIER_1 = ["twin", "machineGun", "flankGuard", "trapGuard"];
    Class.flankGuard.UPGRADES_TIER_2.push("bird");
        Class.bird.UPGRADES_TIER_3 = ["superbird", "shoebill", "cockatiel", "sunbird", "siskin", "falcon", "eagle", "vulture", "phoenix"]
Class.trapper.UPGRADES_TIER_1 = ["builder", "triTrapper", "trapGuard", "overtrapper", "barracuda", "wark"];
    Class.triTrapper.UPGRADES_TIER_2 = ["hexaTrapper", "quadBuilder", "hexadecimator"];
    Class.trapGuard.UPGRADES_TIER_2 = ["bushwhacker", "planetary", "bulwark", "highlord", "pen", "hexadecimator"];
        Class.trapGuard.UPGRADES_TIER_3 = ["hijacker"]
    Class.builder.UPGRADES_TIER_2 = ["coop", "engineer", "boomer", "quadBuilder", "planetary"];
        Class.quadBuilder.UPGRADES_TIER_3 = ["mechanic", "architect", "pentaBuilder"];
        Class.hexaTrapper.UPGRADES_TIER_3 = ["fortress", "octoTrapper", "pentaBuilder"];
        Class.coop.UPGRADES_TIER_3 = ["construct", "assembler", "conqueror", "mugger"];
        Class.planetary.UPGRADES_TIER_3 = ["conqueror"];
        Class.boomer.UPGRADES_TIER_3 = ["parryer", "kinballer"];
        Class.overtrapper.UPGRADES_TIER_3 = ["highlord"];
        Class.bulwark.UPGRADES_TIER_3 = ["parapet", "highlord", "conqueror", "raider"];
        Class.engineer.UPGRADES_TIER_3 = ["mechanic", "specializer", "programmer"];
        Class.barracuda.UPGRADES_TIER_3 = ["barricade", "cache"];
        Class.pen.UPGRADES_TIER_3 = ["employer", "kraal", "cache", "overpen", "parryer"];
    Class.wark.UPGRADES_TIER_2 = ["bulwark", "hexadecimator", "barracuda"]
        Class.wark.UPGRADES_TIER_3 = ["equalizer", "cache", "programmer"];
Class.director.UPGRADES_TIER_1 = ["overseer", "executor"];
    Class.executor.UPGRADES_TIER_2 = ["manager", "honcho", "cruiser", "storm", "factory"];
        Class.honcho.UPGRADES_TIER_3 = ["bigCheese", "bigSwiss", "executive"]
        Class.storm.UPGRADES_TIER_3 = ["cortex"];
        Class.manager.UPGRADES_TIER_3 = ["leader"];
    Class.overseer.UPGRADES_TIER_2 = ["overviewer", "overtrapper", "overgunner", "overdrive", "underseer"];
        Class.overviewer.UPGRADES_TIER_3 = ["overlord", "commander", "banshee", "sentrySeer"];
        Class.cruiser.UPGRADES_TIER_3 = ["carrier", "battleship", "fortress", "commander", "wraith", "gunnerCruiser", "bigSwiss"];
        Class.underseer.UPGRADES_TIER_3 = ["necromancer", "maleficitor", "infestor", "polyseer", "enchanter", "preacher", "necroa"];
        Class.factory.UPGRADES_TIER_3 = ["creator", "topBanana", "foundry", "industry", "cloner", "watchwoman", "watchman"];
Class.heavy.UPGRADES_TIER_1 = ["pounder", "sniper", "builder", "artillery"]
    Class.artillery.UPGRADES_TIER_2 = ["howitzer", "beeGuard", "heavyArtillery"]
        Class.howitzer.UPGRADES_TIER_3 = ["queller"]
        Class.beeGuard.UPGRADES_TIER_3 = ["beemaster"]
    Class.pounder.UPGRADES_TIER_2 = ["destroyer", "heavyArtillery", "launcher", "planetary", "realstar"]
        Class.realstar.UPGRADES_TIER_3 = ["deathstar", "neutronstar", "apex"];
        Class.pounder.UPGRADES_TIER_3 = ["shotgun", "eagle"]
        Class.heavyArtillery.UPGRADES_TIER_3 = ["mortar", "ordnance", "beekeeper", "fieldGun", "superHeavyArtillery"];
        Class.destroyer.UPGRADES_TIER_3 = ["conqueror", "annihilator", "hybrid", "construct", "rogue", "dobloon"];
    Class.sniper.UPGRADES_TIER_2 = ["assassin", "hunter", "minigun", "rifle", "marksman", "bushwhacker", "hider", "ringer"];
            Class.ringer.UPGRADES_TIER_3 = ["winger", "singer"];
            Class.hider.UPGRADES_TIER_3 = ["rogue", "leader", "stalker"];
            Class.bushwhacker.UPGRADES_TIER_3 = ["mugger", "villain", "raider"]
            Class.assassin.UPGRADES_TIER_3 = ["ranger", "falcon", "stalker", "deadeye",];
            Class.hunter.UPGRADES_TIER_3 = ["predator", "xHunter", "poacher", "ordnance", "dual", "nimrod",];
            Class.rifle.UPGRADES_TIER_3 = ["musket", "crossbow", "armsman", "revolver"];
            Class.marksman.UPGRADES_TIER_3 = ["deadeye", "nimrod", "revolver", "fork"];
            Class.healer.UPGRADES_TIER_3 = ["medic", "ambulance", "surgeon", "paramedic"];
Class.tank.UPGRADES_TIER_0 = ["auraTank", "smasherTank", "autoTank", "machine", "primary", "system"];
Class.system.UPGRADES_TIER_1 = ["spinner", "whirlwind"];
    Class.primary.UPGRADES_TIER_1 = ["droneShip"];
        Class.droneShip.UPGRADES_TIER_2 = ["hydraShip"];
            Class.hydraShip.UPGRADES_TIER_3 = ["fleet"];
    Class.autoTank.UPGRADES_TIER_1 = ["doubleAutoTank", "megaAutoTank", "doublegAutoTank", "top",];
        Class.doubleAutoTank.UPGRADES_TIER_2 = ["tripleAutoTank"];
            Class.tripleAutoTank.UPGRADES_TIER_3 = ["pentaAutoTank"];
        Class.megaAutoTank.UPGRADES_TIER_2 = ["gigaAutoTank"];
            Class.gigaAutoTank.UPGRADES_TIER_3 = ["teraAutoTank"];
        Class.doublegAutoTank.UPGRADES_TIER_2 = ["tripletAutoTank"];
            Class.tripletAutoTank.UPGRADES_TIER_3 = ["quadrupleAutoTank"];
    Class.machine.UPGRADES_TIER_1 = ["brickTank", "hut"];
        Class.brickTank.UPGRADES_TIER_2 = ["headquarters"];
            Class.headquarters.UPGRADES_TIER_3 = ["bunker"];
    Class.smasherTank.UPGRADES_TIER_1 = ["crusher", "top", "garrison", "hut"];
        Class.crusher.UPGRADES_TIER_2 = ["bramble"];
            Class.bramble.UPGRADES_TIER_3 = ["nettle"];
    Class.auraTank.UPGRADES_TIER_1 = ["forgery", "garrison"];
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
        Class.hut.UPGRADES_TIER_2 = ["jetstream", "buffer"];
        Class.spinner.UPGRADES_TIER_2 = ["hyperspinner"];
            Class.hyperspinner.UPGRADES_TIER_3 = ["ultraspinner"];
Class.ethereal.UPGRADES_TIER_8 = ["philistine", "sundowner", "spear", "despoiler", "centaur"];
Class.etherealBody.UPGRADES_TIER_8 = ["autoEth"];
Class.autoEth.UPGRADES_TIER_8 = ["networks"];
Class.minigun.UPGRADES_TIER_3.push("hotbed")
