let fs = require('fs'),
	path = require('path'),
	mimeSet = {
		"js": "application/javascript",
		"json": "application/json",
		"css": "text/css",
		"html": "text/html",
		"md": "text/markdown",
		"png": "image/png",
		"ico": "image/x-icon"
	},
	wsServer;

try {
	wsServer = new(require('../../lib/ws/index.js').WebSocketServer)({
		noServer: true
	});
} catch (err) {
	wsServer = new(require('ws').WebSocketServer)({
		noServer: true
	});
}
global.wsServer = wsServer;

console.log("Web Server initialized.");
if (Config.host === 'localhost') {
	util.warn(`[WEB SERVER] config.host is just "localhost", are you sure you don't mean "localhost:${Config.port}"?`);
}
if (Config.host.match(/localhost:(\d)/) && Config.host !== 'localhost:' + Config.port) {
	util.warn('[WEB SERVER] config.host is a localhost domain but its port is different to config.port!');
}

server = require('http').createServer((req, res) => {
	let resStr = "";
	if (req.url.startsWith('/shared/')) {} else switch (req.url) {
		case "/lib/json/mockups.json":
			resStr = mockupJsonData;
			break;
		case "/lib/json/gamemodeData.json":
			resStr = JSON.stringify({
				gameMode: Config.gameModeName,
				players: views.length
			});
			break;
		case "/serverData.json":
			resStr = JSON.stringify({
				ip: Config.host
			});
			break;
		default:
			res.writeHead(302, {
				Location: "https://" + Config.CLIENT_ADDRESS
			});
			return res.end();
			//return the file
			res.writeHead(200, {
				'Content-Type': mimeSet[fileToGet.split('.').pop()] || 'text/html'
			});
			return fs.createReadStream(fileToGet).pipe(res);
	}
	if (resStr) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		const zlib = require("zlib");
		let acceptEncoding = req.headers['accept-encoding'];
		if (!acceptEncoding) {
			acceptEncoding = '';
		};
		if (acceptEncoding.match(/\bdeflate\b/)) {
			res.writeHead(200, {
				'content-encoding': 'deflate'
			});
			zlib.createDeflate().end(resStr).pipe(res);
		} else if (acceptEncoding.match(/\bgzip\b/)) {
			res.writeHead(200, {
				'content-encoding': 'gzip'
			});
			zlib.createGzip().end(resStr).pipe(res);
		} else {
			res.writeHead(200, {});
			res.end(resStr);
		}
		//res.writeHead(200);
		//return res.end(resStr);
	}
});
server.on('upgrade', (req, socket, head) => wsServer.handleUpgrade(req, socket, head, ws => sockets.connect(ws, req)));
server.listen(Config.port, () => console.log("[WEB SERVER] Server listening on port", Config.port));
module.exports = {
	server
};