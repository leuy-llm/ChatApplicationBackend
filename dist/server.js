"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const websocket_1 = __importDefault(require("@fastify/websocket")); // ✅ Required for WebSocket support
const dotenv_1 = __importDefault(require("dotenv"));
const chat_1 = __importDefault(require("./routes/chat"));
const socket_1 = require("./ws/socket");
dotenv_1.default.config();
const app = (0, fastify_1.default)({
    logger: true, // optional: logs requests/errors
});
// ✅ Register plugins
app.register(cors_1.default, {
    origin: '*', // Or specify allowed origin: 'http://localhost:5173'
});
app.register(websocket_1.default); // ✅ This enables Fastify WebSocket support
// ✅ Register routes
app.register(chat_1.default, { prefix: '/v1/api' });
// ✅ Start the server
app.listen({ port: Number(process.env.PORT) || 4000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Server running at ${address}`);
});
// ✅ Initialize WebSocket server
(0, socket_1.initWebSocketServer)(app.server);
