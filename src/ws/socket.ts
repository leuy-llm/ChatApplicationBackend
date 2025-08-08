// src/ws/socket.ts
import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

export function initWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

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
