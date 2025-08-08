"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocketServer = initWebSocketServer;
const ws_1 = require("ws");
function initWebSocketServer(server) {
    const wss = new ws_1.WebSocketServer({ server, path: '/ws' });
    wss.on('connection', (ws) => {
        console.log('🔌 WebSocket client connected');
        ws.on('message', (msg) => {
            console.log('📨 Received:', msg.toString());
            ws.send('👋 Echo: ' + msg.toString());
        });
        ws.on('close', () => {
            console.log('❌ WebSocket client disconnected');
        });
    });
    console.log('✅ WebSocket server initialized on /ws');
}
