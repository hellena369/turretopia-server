const { combineStats, weaponArray, makeCrasher, makeLaby, skillSet } = require('../facilitators.js');
const { base } = require('../constants.js');
const g = require('../gunvals.js')
const { addAura, makeAuto, makeDeco, makeTurret } = require("../facilitators.js");

Class.siren = {
    PARENT: "dominator",
    LABEL: "Siren",
    HAS_NO_RECOIL: true,
    LEVEL: 45,
    SIZE: 40,
    DANGER: 12,
    FACING_TYPE: ["spin", {speed: 0.02}],
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
    }),
    BODY: {
        HEALTH: 450,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    DISPLAY_NAME: false,
    TURRETS: [{
        POSITION: { SIZE: 22 },
        TYPE: "dominationBody",
    }]
}

Class.barracks = {
    PARENT: ['siren'],
    NAME: 'Barracks',
    BODY: {
        HEALTH: 500,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    GUNS: weaponArray([
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, g.factory, {maxSpeed: 1.2, size: 1.3}]),
                TYPE: "pentachip",
                MAX_CHILDREN: 5,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [12, 14, 1, 0, 0, 0, 0],
        },
    ], 4, 1/4)
}

Class.armory = {
    PARENT: ['siren'],
    NAME: 'Armory',
    BODY: {
        HEALTH: 500,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    GUNS: weaponArray([
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, g.factory, {maxSpeed: 1.2, size: 1.3 }]),
                TYPE: "falsechip",
                MAX_CHILDREN: 5,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [12, 14, 1, 0, 0, 0, 0],
        },
    ], 4, 1/4)
}

Class.necrochip = {
    PARENT: "sunchip",
    COLOR: "darkGrey",
    NECRO: [4]
}

Class.necrokeep = {
    PARENT: ['siren'],
    NAME: 'Necrokeep',
    SHAPE: 4,
    BODY: {
        HEALTH: 550,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
        FOV: 2
    },
    COLOR: "darkGrey",
    GUNS: weaponArray([
        {
            POSITION: {
                X: -10,
                LENGHT: 5,
                WIDTH: 10,
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.summoner, {maxSpeed: 1.2, damage: 2, health: 2}]),
                TYPE: "necrochip",
                MAX_CHILDREN: 10,
                STAT_CALCULATOR: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                ALPHA: 0
            },
        },
    ], 4, 1/4),
    TURRETS: []
}

Class.radar = {
    PARENT: 'siren',
    NAME: 'Radar',
    GUNS: weaponArray([
        {
            POSITION: [4, 3.75, 1, 8, 0, 0, 0]
        },
        {
            POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: "trap",
                STAT_CALCULATOR: "trap",
                AUTOFIRE: true
            }
        }
    ], 3)
}

const altarTripleAura = {
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "fireAura1"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "fireAura2"
        },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "fireAura3"
        }
    ]
}

Class.altar = {
    PARENT: 'genericTank',
    COLOR: 'teal',
    EXTRA_SKILL: 10,
    LABEL: 'Altar',
    ...altarTripleAura,
    UPGRADES_TIER_0: []
}

Class.shieldAura1 = addAura(-1, 1, 0.36)
Class.shieldAura2 = addAura(-1, 1.2, 0.33)
Class.shieldAura3 = addAura(-1, 1.4, 0.3)

Class.shielder = {
    PARENT: ['healer'],
    LABEL: 'Shielder',
    SHAPE: 6,
    SIZE: 14,
    BODY: {
        HEALTH: 20 * base.HEALTH,
        DAMAGE: -1
    },
    GUNS: [
        ...weaponArray([
            {
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard]),
                    TYPE: "healerTrap",
                    STAT_CALCULATOR: "trap"
                }
            }
        ], 3),
        ...weaponArray(
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: "healerSwarm",
                    STAT_CALCULATOR: "swarm",
                },
            }, 3, 1/3),
    ],
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "shieldAura1"
        }, {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "shieldAura2"
        }, {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "shieldAura3"
        }
    ]
}

Class.challenger = {
    PARENT: "siren",
    NAME: "Challenger",
    BODY: {
        HEALTH: 500,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    TURRETS: [
        ...weaponArray({
            POSITION: [12, 10, 0, 0, 190, 0],
            TYPE: ["gunnerCruiserTurret", {GUN_STAT_SCALE: {speed: 0.6, maxSpeed: 0.6, damage: 2, health: 2, pen: 2}, COLOR: "#AA9F9E"}],
        }, 3),
        {
            POSITION: { SIZE: 22 },
            TYPE: "dominationBody",
        }
    ]
}

Class.machineTurret = makeTurret(Class.realtor, {hasAI: true,  INDEPENDENT: true, limitFov: true, fov: 3})
Class.snipeTurret = makeTurret(Class.sniper, {hasAI: true,  INDEPENDENT: true, limitFov: true, fov: 3})

Class.warmachine = {
    PARENT: "siren",
    BODY: {
        HEALTH: 550,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    NAME: "War Machine",
    TURRETS: [
        ...weaponArray({
            POSITION: [10, 10, 0, 0, 120, 0],
            TYPE: ["machineTurret", {GUN_STAT_SCALE: {speed: 0.6, maxSpeed: 0.6, reload: 1.7, damage: 2, health: 2, pen: 2}, COLOR: "#AA9F9E"}],
        }, 3),
        ...weaponArray({
            POSITION: [10, 10, 0, 60, 120, 0],
            TYPE: ["snipeTurret", {GUN_STAT_SCALE: {speed: 0.6, maxSpeed: 0.6, reload: 2.5, damage: 2, health: 2, pen: 2}, COLOR: "#AA9F9E"}],
        }, 3),
        {
            POSITION: { SIZE: 22 },
            TYPE: "dominationBody",
        },
        ...weaponArray({
            POSITION: [3.25, 4.5, 0, 0, 180, 2],
            TYPE: ["autoTurret", {GUN_STAT_SCALE: {reload: 1.1, damage: 2, health: 2, pen: 2}, COLOR: "mirror"}],
        }, 3),
        ...weaponArray({
            POSITION: [3.25, 8, 0, 60, 180, 2],
            TYPE: ["autoTurret", {GUN_STAT_SCALE: {reload: 1.1, damage: 2, health: 2, pen: 2}, COLOR: "mirror"}],
        }, 3)
    ]
}

Class.machine2Turret = makeTurret(Class.arbitrator, {hasAI: true, FOV: 2,  INDEPENDENT: true})
Class.snipe2Turret = makeTurret(Class.assassin, {hasAI: true, FOV: 2,  INDEPENDENT: true})

Class.warlock = {
    PARENT: "siren",
    NAME: "Warlock",
    BODY: {
        HEALTH: 600,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    TURRETS: [
        ...weaponArray({
            POSITION: [10, 10, 0, 0, 135, 0],
            TYPE: ["machine2Turret", {GUN_STAT_SCALE: {speed: 0.6, maxSpeed: 0.6, reload: 2, damage: 2, health: 2, pen: 2}, COLOR: "#AA9F9E"}],
        }, 3),
        ...weaponArray({
            POSITION: [10, 10, 0, 60, 135, 0],
            TYPE: ["snipe2Turret", {GUN_STAT_SCALE: {speed: 0.6, maxSpeed: 0.6, reload: 2.5, damage: 2, health: 2, pen: 2}, COLOR: "#AA9F9E"}],
        }, 3),
        {
            POSITION: { SIZE: 22 },
            TYPE: "dominationBody",
        },
        ...weaponArray({
            POSITION: [3.25, 4.5, 0, 0, 180, 2],
            TYPE: ["autoTurret", {GUN_STAT_SCALE: {reload: 1.1, damage: 2, health: 2, pen: 2}, COLOR: "mirror"}],
        }, 5),
        ...weaponArray({
            POSITION: [3.25, 8, 0, 36, 180, 2],
            TYPE: ["autoTurret", {GUN_STAT_SCALE: {reload: 1.1, damage: 2, health: 2, pen: 2}, COLOR: "mirror"}],
        }, 5)
    ]
}

Class.reactor = {
    PARENT: "siren",
    NAME: "Reactor"
}

Class.silo = {
    PARENT: "siren",
    NAME: "Nuclear Silo",
    BODY: { 
        HEALTH: 500,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    GUNS: [
        {
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher]),
                TYPE: "sirenmissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ]
}

Class.sirenmissile = {
    PARENT: "bullet",
    LABEL: "EMP Missile",
    INDEPENDENT: true,
    BODY: { 
        HEALTH: 500,
        DAMAGE: 7.5,
        SHIELD: base.SHIELD * 1.5,
    },
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, -2, 130, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.lowPower, {speed: 1.3, maxSpeed: 1.3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: "thruster",
                WAIT_TO_CYCLE: true,
            }
        },
        {
            POSITION: [14, 6, 1, 0, 2, 230, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.lowPower, {speed: 1.3, maxSpeed: 1.3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: "thruster",
                WAIT_TO_CYCLE: true,
            }
        }
    ]
}

Class.launchSiren = {
    PARENT: "siren",
    NAME: "Launcher",
    GUNS: [
        {
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher]),
                TYPE: "sirenmissile",
                STAT_CALCULATOR: "sustained",
            },
        },
    ],
}

const altarAura = {
    COLOR: "teal",
    DANGER: 9,
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "fireAura3"
        }
    ],
    UPGRADE_COLOR: "rainbow"
}
Class.vanquishment = {
    PARENT: "vanquisher",
    ...altarAura
}
Class.theArmyOfOne = {
    PARENT: "armyOfOne",
    ...altarAura
};
Class.eyeDeco = makeDeco(0, "white")
Class.stars = {
    PARENT: "planet",
    COLOR: "teal",
    LABEL: "Star",
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        },
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "fireAura1"
        },
    ]
}
Class.pandemonium = {
    PARENT: "tempest",
    LABEL: "Galaxy",
    COLOR: "teal",
    DANGER: 9,
    UPGRADE_COLOR: "rainbow",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 0],
            TYPE: "fireAura3"
        },
        {
            POSITION: [12, 0, 0, 0, 360, 1],
            TYPE: ["megaTornadoDeco", { COLOR: "black"}]
        },
        {
            POSITION: [4, 0, 0, 180, 360, 1],
            TYPE: "eyeDeco",
        },
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ],
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 3; i++) { 
            output.push({ 
                POSITION: {WIDTH: 16, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.destroyer, g.pounder, { size: 1.4, reload: 4, damage: 0.7, health: 0.8 }]), 
                    TYPE: ["stars", {ANGLE: i * 120}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        for (let i = 0; i < 3; i++) { 
            output.push({ 
                POSITION: {WIDTH: 16, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite, g.destroyer, g.pounder, { size: 1.4, reload: 4, damage: 0.7, health: 0.8 }]), 
                    TYPE: ["stars", { ANGLE: i * 120, CONTROLLERS: [['orbit', {invert: true}]] }], 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.undertowing = {
    PARENT: "riptide",
    ...altarAura
}
Class.sporkSplitterBullet = {
    PARENT: "bullet",
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [8, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { damage: 0.7 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { damage: 0.7 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            }
        },
    ]
}
Class.sporkSuperSplitterBullet = {
    PARENT: "bullet",
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [8, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { damage: 0.8, size: 2.4 }]),
                TYPE: ["sporkSplitterBullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { damage: 0.7, size: 2.4 } ]),
                TYPE: ["sporkSplitterBullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            }
        },
        {
            POSITION: [8, 8, 1, 0, 0, -30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { damage: 0.7, size: 2.4 }]),
                TYPE: ["splitterBullet", { PERSISTS_AFTER_DEATH: true }],
                SHOOT_ON_DEATH: true,
            }
        },
    ]
}
Class.spork = {
    PARENT: "fork",
    LABEL: "Spork",
    ...altarAura,
    GUNS: [
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 10,
                ASPECT: 1.3,
                X: 8
            }
        },
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 10,
                ASPECT: 1.3,
                X: 13
            }
        },
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 10,
                ASPECT: 1.3,
                X: 18
            }
        },
        {
            POSITION: {
                LENGTH: 5,
                WIDTH: 10,
                ASPECT: 1.3,
                X: 23
            }
        },
        {
            POSITION: {
                LENGTH: 29,
                WIDTH: 8.5
            },
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, { pen: 2, reload: 3.5 }]),
                TYPE: "sporkSuperSplitterBullet"
            }
        }
    ]
}
Class.altMaster = {
    PARENT: "master",
    ...altarAura
}
Class.momship = {
    PARENT: "mothership",
    ...altarAura,
    TURRETS: []
}
Class.conciliator = {
    PARENT: "arbitrator",
    LABEL: "Conciliator",
    ...altarAura,
    GUNS: [
        {
            POSITION: [10.5, 17, 1.33, 5.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.65,  health: 1.8, range: 0.8, reload: 0.95, recoil: 0.1, damage: 2.5, pen: 1.8}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [10.5, 15.75, 1.33, 5.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.8, range: 0.8, reload: 1, recoil: 0.1, damage: 2.5, pen: 1.8}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [10.5, 14.5, 1.33, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.65, health: 1.8, range: 0.8, reload: 1.05, recoil: 0.1, damage: 2.5, pen: 1.8}]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [10.5, 12.25, 1.25, 9.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.triplet, g.spam, g.spam, {size: 0.7,  health: 1.8, range: 0.8, reload: 1.1, recoil: 0.1, damage: 2.5, pen: 1.8}]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.formulator = {
    PARENT: "engineer",
    LABEL: "Formulator",
    ...altarAura,
    GUNS: weaponArray([
        {
            POSITION: [5, 13, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 16, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 6,
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, {damage: 1.5, health: 1.5, pen: 1.5, reload: 0.9}]),
                TYPE: "pillbox",
                SYNCS_SKILLS: true,
                DESTROY_OLDEST_CHILD: true,
                STAT_CALCULATOR: "block"
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ], 2)
}
Class.ravagerNormal = {
    PARENT: "octoTank",
    LABEL: "Ravager",
    TOOLTIP: "Right click to enrage.",
    ...altarAura,
    ON: [
        {
            event: "altFire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'morphCannon') return
                body.define("ravagerEnraged");
                setTimeout(() => body.define("ravagerStall"), 12000);
                setTimeout(() => body.define("ravagerNormal"), 55000);

            }
        }
    ],
    GUNS: weaponArray([
        // Must be kept like this to preserve visual layering
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.5, health: 1.7, pen: 1.8}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.5, health: 1.7, pen: 1.8}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {range: 10e-8, speed: 10e-8}]),
                TYPE: "bullet",
                IDENTIFIER: 'morphCannon',
                ALT_FIRE: true,
            }
        }
    ], 4)
}
Class.ravagerEnraged = {
    PARENT: "octoTank",
    LABEL: "Enraged Ravager",
    ...altarAura,
    GUNS: [
        {
            POSITION: [18, 2, 1, 0, 8, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.3, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 2, 1, 0, -8, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.3, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 3, 1, 0, 6.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.3, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 3, 1, 0, -6.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.3, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 4, 1, 0, 5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.5, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 4, 1, 0, -5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.5, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 5, 1, 0, 3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 2, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 5, 1, 0, -3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 2, health: 1.3, pen: 1.3, recoil: 0.1}]),
                TYPE: "bullet"
            }
        },
    ],
}
Class.ravagerStall = {
    PARENT: "octoTank",
    LABEL: "Ravager",
    ...altarAura,
    GUNS: weaponArray([
        // Must be kept like this to preserve visual layering
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.5, health: 1.7, pen: 1.8}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam, {damage: 1.5, health: 1.7, pen: 1.8}]),
                TYPE: "bullet"
            }
        }
    ], 4)
}
Class.altar.UPGRADES_TIER_0 = ["ravagerNormal", "formulator", "conciliator", "momship", "altMaster", "spork", "undertowing", "pandemonium", "theArmyOfOne", "vanquishment"]
Class.cP = makeCrasher('pentagon', 'darkGrey')
Class.cH = makeCrasher('hexagon', 'darkGrey')
Class.bP = makeLaby('pentagon', 1, 1)
Class.bH = makeLaby('hexagon', 1, 1)
Class.aP = makeLaby('pentagon', 2, 1)
Class.aH = makeLaby('hexagon', 2, 1)
Class.oP = makeLaby('pentagon', 3, 1)
Class.cBP = makeCrasher('bP', 'darkGrey')
Class.cBH = makeCrasher('bH', 'darkGrey')
Class.cAP = makeCrasher('aP', 'darkGrey')
Class.cAH = makeCrasher('aH', 'darkGrey')
