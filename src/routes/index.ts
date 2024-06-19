import { FastifyInstance } from "fastify"
import { artificialIntelligenceRouter } from "./ai-routes/ai-router"
import { promptRouter } from "./prompt-routes/prompt-router"
import { videoRouter } from "./video-routes/video-router"

export async function registerRoutes(app:FastifyInstance) {
  app.register(promptRouter)
  app.register(videoRouter)
  app.register(artificialIntelligenceRouter)
}