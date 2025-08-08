import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getAIResponse } from "../services/openai";

async function chatRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.post('/chat', async (request, reply) => {
    const { message } = request.body as { message: string };

    if (!message) {
      return reply.status(400).send({ error: 'Message is required' });
    }

    const aiReply = await getAIResponse(message);

    return reply.status(200).send({
      reply: {
        role: 'assistant',
        content: aiReply ?? 'No response from AI',
      },
    });
  });
}

export default chatRoutes;
