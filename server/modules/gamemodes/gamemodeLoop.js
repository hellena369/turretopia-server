/*jslint node: true */
/*jshint -W061 */
/*global goog, Map, let */
//"use strict";
// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');
global.bossRush;
if (Config.GAME_MODES.includes('siege')) bossRush = new BossRush();
global.warFront;
if (Config.GAME_MODES.includes('armageddon')) warFront = new WarFront();
let train;
if (Config.TRAIN) train = new Train();
let moon;
if (Config.SPACE_MODE) moon = new Moon();
let hunt;
if (Config.HUNT) hunt = new ManHunt();

if (Config.MOTHERSHIP_LOOP) mothershipLoop.spawn();
if (Config.GAME_MODES.includes('siege')) bossRush.init();
if (Config.GAME_MODES.includes('armageddon')) warFront.init();
if (Config.MAZE > 0) generateMaze(Config.MAZE);

// Below maze generation because it relies on the maze data
let portalLoop;
if (Config.PORTAL_SPAWNS) {
    portalLoop = new PortalLoop();
    portalLoop.init();
};

let logHistory = [];
const gamemodeLoop = function() {
    logs.gamemodeLoop.startTracking();
    if (Config.HUNT) hunt.loop();
    if (Config.TRAIN) train.loop();
    if (Config.SPACE_MODE) moon.loop();
    if (Config.MOTHERSHIP_LOOP) mothershipLoop.loop();
    if (Config.GAME_MODES.includes('siege')) bossRush.loop();
    if (Config.GAME_MODES.includes('armageddon')) warFront.loop();
    logs.gamemodeLoop.endTracking();

    let logTime = logs.gamemodeLoop.sumLogTimes();
    if (logTime > 100) {
        console.log("Gamemode loop is taking a long time!");
        console.log(`Gamemode loop took ${logTime}ms to complete!`);
        console.log(`Gamemode loop log history: (Last ${logHistory.length} entries)`);

        logHistory.push({at: performance.now(), time: logTime});
        if (logHistory.length > 10) {
            logHistory.shift();
        }

        console.log(logHistory.map(entry => `Run at: ${entry.at}. Time: ${entry.time}.`).join("\n"));
    }
};

module.exports = { gamemodeLoop };