let bases = {},

spawnPermanentBaseProtector = (loc, team) => {
    let o = new Entity(loc);
    o.define('baseProtector');
    o.team = team;
    o.color.base = getTeamColor(team);
    o.on('dead', () => spawnPermanentBaseProtector(loc, team));
},

makeBase = (team, hasProtection, type = {}) => new Tile({
  color: getTeamColor(team),
  type: type,
  
  init: tile => {
    if (hasProtection) spawnPermanentBaseProtector(tile.loc, team);
    if (!room.spawnable[team]) room.spawnable[team] = [];
    room.spawnable[team].push(tile);
  },
  tick: tile => {
    for (let i = 0; i < tile.entities.length; i++) {
      let entity = tile.entities[i];
      if (entity.team !== team && isPlayerTeam(entity.team) && !entity.immuneToTiles && !entity.master.immuneToTiles) entity.kill();
    }
  }
});

makeDom = (team, type = {}) => new Tile({
  color: getTeamColor(team),
  type: type,
  
  init: tile => {
    if (!room.spawnable[team]) room.spawnable[team] = [];
    room.spawnable[team].push(tile);
  },
  tick: tile => {
    for (let i = 0; i < tile.entities.length; i++) {
      let entity = tile.entities[i];
      if (entity.team !== team && isPlayerTeam(entity.team) && !entity.immuneToTiles && !entity.master.immuneToTiles) entity.kill();
    }
  }
});

for (let i = 1; i < 9; i++) {
	bases['base' + i] = makeBase(-i, false);
	bases['base' + i + 'protected'] = makeBase(-i, true);
}
bases['sanc'] = makeBase(-1, false, "sanc");
bases['tower'] = makeBase(-1, false, "tower");

module.exports = bases;