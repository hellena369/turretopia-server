let { normal, nestTick } = require("../tiles/misc.js"), room = [],
    structure = new Tile({
        color: "white",
        init: (tile) => {
            let o = new Entity(tile.loc);
            o.define("wall");
            o.team = TEAM_ROOM;
            o.SIZE = Math.floor(Math.random() * 500) + 200;
            o.protect();
            o.life();
            makeHitbox(o);
            walls.push(o);
        },
    }),
    forest = new Tile({
        color: { BASE: "green", BRIGHTNESS_SHIFT: 10, SATURATION_SHIFT: 0.8 },
        data: {
            allowMazeWallSpawn: true,
            foodSpawnCooldown: 0,
            foodCount: 0,
            enemySpawnCooldown: 0,
            enemyCount: 0,
        },
        init: (tile) => {
            if (!room?.spawnable) room.spawnable = {};
            if (!room.spawnable[TEAM_ENEMIES]) room.spawnable[TEAM_ENEMIES] = [];
            room.spawnable[TEAM_ENEMIES].push(tile);
        },
        tick: nestTick,
    });

for (let i = 0; i <= 15; i++) {
    let line = [];
    for (let i = 0; i <= 15; i++) {
        Math.random() < 0.1 ? line.push(structure) : (Math.random() < 0.1 ? line.push(forest) : line.push(normal));
    }
    room.push(line);
}

module.exports = room;