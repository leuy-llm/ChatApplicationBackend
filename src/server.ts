// src/index.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket'; // ✅ Required for WebSocket support
import dotenv from 'dotenv';
import chatRoutes from './routes/chat';
import { initWebSocketServer } from './ws/socket';

dotenv.config();

const app = Fastify({
  logger: true, // optional: logs requests/errors
});

// ✅ Register plugins
app.register(cors, {
  origin: '*', // Or specify allowed origin: 'http://localhost:5173'
});
 app.register(websocket); // ✅ This enables Fastify WebSocket support

// ✅ Register routes
app.register(chatRoutes, { prefix: '/v1/api' });

// ✅ Start the server
app.listen({ port: Number(process.env.PORT) || 4000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});

// ✅ Initialize WebSocket server
initWebSocketServer(app.server);
