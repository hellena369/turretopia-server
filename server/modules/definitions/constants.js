module.exports = {
	basePolygonDamage: 1.6,
	basePolygonHealth: 3,

	basePlayerHealth: 26,

	// SKILL DEFINITIONS
	dfltskl: 9,
	smshskl: 12,
	ethskl: 15,

	// NAMES
	statnames: {
		generic: {
			BODY_DAMAGE: 'Body Damage',
			MAX_HEALTH: 'Max Health',
			BULLET_SPEED: 'Bullet Speed',
			BULLET_HEALTH: 'Bullet Health',
			BULLET_PEN: 'Bullet Penetration',
			BULLET_DAMAGE: 'Bullet Damage',
			RELOAD: 'Reload',
			MOVE_SPEED: 'Movement Speed',
			SHIELD_REGEN: 'Shield Regeneration',
			SHIELD_CAP: 'Shield Capacity',
			MAXCHILDREN: 'Max Drone Count'
		},
		mixed: {
			BULLET_SPEED: 'Weapon Speed',
			BULLET_HEALTH: 'Weapon Health',
			BULLET_PEN: 'Weapon Penetration',
			BULLET_DAMAGE: 'Weapon Damage',
		},
		drone: {
			BULLET_SPEED: 'Drone Speed',
			BULLET_HEALTH: 'Drone Health',
			BULLET_PEN: 'Drone Penetration',
			BULLET_DAMAGE: 'Drone Damage',
			RELOAD: 'Respawn Rate',
		},
		swarm: {
			BULLET_SPEED: 'Swarm Speed',
			BULLET_HEALTH: 'Swarm Health',
			BULLET_PEN: 'Swarm Penetration',
			BULLET_DAMAGE: 'Swarm Damage',
		},
		necro: {
			BULLET_SPEED: 'Drone Speed',
			BULLET_HEALTH: 'Drone Health',
			BULLET_PEN: 'Drone Penetration',
			BULLET_DAMAGE: 'Drone Damage',
			RELOAD: 'Respawn Rate',
		},
		trap: {
			BULLET_SPEED: 'Placement Speed',
			BULLET_HEALTH: 'Trap Health',
			BULLET_PEN: 'Trap Penetration',
			BULLET_DAMAGE: 'Trap Damage',
		},
		desmos: {
			BULLET_SPEED: 'Wave Frequency',
		},
		whirlwind: {
			BULLET_SPEED: 'Orbit Speed',
			BULLET_HEALTH: 'Satellite Health',
			BULLET_PEN: 'Satellite Penetration',
			BULLET_DAMAGE: 'Satellite Damage',
			RELOAD: 'Respawn Rate',
		},
		starSystem: {
			BULLET_SPEED: 'Orbit Speed',
			BULLET_HEALTH: 'Planet Health',
			BULLET_PEN: 'Planet Penetration',
			BULLET_DAMAGE: 'Planet Damage',
			RELOAD: 'Engine Acceleration',
		},
		heal: {
			BULLET_PEN: 'Heal Rate',
			BULLET_DAMAGE: 'Heal Amount',
		},
		smasher: {
			RELOAD: 'Engine Acceleration',	
		},
		flail: {
			BULLET_HEALTH: 'Ball Longevity',
			BULLET_PEN: 'Ball Sharpness',
			BULLET_DAMAGE: 'Ball Damage',
			RELOAD: 'Ball Density',
		},
	},
	base: {
	    ACCEL: 1.6,
	    SPEED: 5.25,
	    HEALTH: 40,
	    DAMAGE: 3,
	    RESIST: 1,
	    PENETRATION: 1.05,
	    SHIELD: 8,
	    REGEN: 0.025,
	    FOV: 1.02,
	    DENSITY: 0.5,
	}
};
