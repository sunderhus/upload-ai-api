import { FastifyInstance } from "fastify";
import { listPrompts } from "./list-prompts";
import { createPrompt } from "./create-prompt";

export async function promptRouter(app: FastifyInstance) {
  app.get("/prompts", listPrompts)
  app.post("/prompts", createPrompt)
}