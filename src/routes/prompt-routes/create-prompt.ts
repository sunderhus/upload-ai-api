import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyRequestType } from "fastify/types/type-provider"
import { FastifyReply } from "fastify"

export async function createPrompt(request: FastifyRequestType,reply: FastifyReply)  {
  const bodySchema = z.object({
    template: z.string(),
    title: z.string(),
  })

  const { template,title } = bodySchema.parse(request.body)

  const result = await prisma.prompt.create({
    data:{
      template:template,
      title:title,
    }
  })

  return reply.status(201).send(result)
}