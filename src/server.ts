import { fastify} from "fastify";
import { registerRoutes } from "./routes";
import {fastifyCors} from '@fastify/cors'
const app = fastify();

app.register(fastifyCors,{
  origin:'*'
})

registerRoutes(app);

app.listen({port: 3333}).then(()=>{
  console.log('🚀 Server running on: http://localhost:3333' )
})