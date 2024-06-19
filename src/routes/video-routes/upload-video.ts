import { randomUUID } from "node:crypto";
import fs  from "node:fs";
import path from "node:path";
import { prisma } from "../../lib/prisma";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify";
const pump  = promisify(pipeline)

export async function uploadVideo(request: FastifyRequest,reply:FastifyReply){
  const data = await request.file();

  if(!data){
    return reply.status(400).send({error:'Missing file input.'})
  }

  const extension = path.extname(data.filename)

  if(extension!=='.mp3'){
    return reply.status(400).send({error:'Only .mp3 files are allowed.'})
  }

  const fileBaseName = path.basename(data.filename,extension)
  const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
  const uploadDestination = path.resolve(
    __dirname,
    '../../../temp',
    fileUploadName
  )

  await pump(data.file,fs.createWriteStream(uploadDestination))

  const video = await prisma.video.create({
    data:{
      name:data.filename,
      path:uploadDestination,
    }
  })
  return reply.status(201).send({
    video
  })
}