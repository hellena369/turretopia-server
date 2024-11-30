let output = require("../../config.js");

for (let gamemode of output.GAME_MODES) {
    let mode = require(`./gamemodeconfigs/${gamemode}.js`);
    for (let key in mode) {
        if (key === "ROOM_SETUP") {
            output[key].push(...mode[key]);
        } else {
            output[key] = mode[key];
        }
    }
}

module.exports = output;

//everything past this handles the display name in the main menu
const nameMap = {
    tdm: `${output.TEAMS} Teams`,
    ffa: "FFA",
    tag: "TAG",
    opentdm: `Open ${output.TEAMS} Teams`,
    //clanwars: "Clan Wars",
    trainwars: "Train Wars",
    old_dreadnoughts: `Old Dreadnoughts ${output.TEAMS} Teams`,
    growth: " ",
};

module.exports.gameModeName = output.GAMEMODE_NAME_PREFIXES.join('') + '' + output.GAME_MODES.map(x => nameMap[x] || (x[0].toUpperCase() + x.slice(1))).join(' ');