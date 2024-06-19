import { FastifyInstance } from "fastify";
import { generateCompletion } from "./generate-completion";

export async function artificialIntelligenceRouter(app:FastifyInstance) {
  app.post('/ai/completion',generateCompletion)
}