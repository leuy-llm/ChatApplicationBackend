"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("../services/openai");
async function chatRoutes(fastify, _options) {
    fastify.post('/chat', async (request, reply) => {
        const { message } = request.body;
        if (!message) {
            return reply.status(400).send({ error: 'Message is required' });
        }
        const aiReply = await (0, openai_1.getAIResponse)(message);
        return reply.status(200).send({
            reply: {
                role: 'assistant',
                content: aiReply ?? 'No response from AI',
            },
        });
    });
}
exports.default = chatRoutes;
