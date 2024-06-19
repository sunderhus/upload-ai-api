import {  FastifyRequestType } from "fastify/types/type-provider";
import {z} from 'zod'
import { FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
import { openai } from "../../lib/openai";

export async function generateCompletion(request: FastifyRequestType, reply: FastifyReply){
  const bodySchema = z.object({
    videoId:z.string().uuid(),
    template:z.string(),
    temperature:z.number().min(0).max(1).default(0.5),
  })

  const {videoId,template,temperature} = bodySchema.parse(request.body)

  const video = await prisma.video.findUniqueOrThrow({
    where:{
      id:videoId
    }
  })

  if(!video.transcription){
    return reply.status(400).send({
      error:'Transcription not found. You need to generate a transcription first.'
    })
  }

  const aiPromptMessage = template.replace('{transcription}',video.transcription)


  const response = await openai.chat.completions.create({
    model:'gpt-4',
    temperature,
    messages:[{
      content:aiPromptMessage,
      role:'user'
    }]
  })

  return reply.status(200).send({
    response 
  })
}