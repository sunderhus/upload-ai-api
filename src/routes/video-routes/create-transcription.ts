import {  FastifyRequestType } from "fastify/types/type-provider";
import {z} from 'zod'
import fs from 'node:fs'
import { prisma } from "../../lib/prisma";
import { openai } from "../../lib/openai";
import { FastifyReply } from "fastify";

export async function createTranscription(request: FastifyRequestType, reply: FastifyReply){
  const paramsSchema = z.object({
    videoId:z.string().uuid(),
  }) 

  const {videoId} = paramsSchema.parse(request.params)

  const bodySchema = z.object({
    prompt:z.string()
  })

  const {prompt} = bodySchema.parse(request.body)


  const video = await prisma.video.findUniqueOrThrow({
    where:{
      id:videoId
    }
  })

  const audioReadStream = fs.createReadStream(video.path)
  const response = await openai.audio.transcriptions.create({
    file:audioReadStream,
    model:'whisper-1',
    response_format: "verbose_json",
    temperature:0.5,
    language:'pt',
    prompt
  })
  
  const transcription = response.text

  await prisma.video.update({
    where:{
      id:videoId
    },
    data:{
      transcription:transcription
    }
  })

  return {
    transcription
  }
}