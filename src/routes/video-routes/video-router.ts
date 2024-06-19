import { FastifyInstance } from "fastify";
import {fastifyMultipart} from '@fastify/multipart'
import { uploadVideo } from "./upload-video";
import { createTranscription } from "./create-transcription";

export async function videoRouter(app: FastifyInstance) {
  const OneMegabyte = 1_848_576;
  app.register(fastifyMultipart,{limits:{
    fileSize:OneMegabyte * 25
  }})
  
  app.post("/video",  uploadVideo)
  app.post("/video/:videoId/transcription", createTranscription)
}