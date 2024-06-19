import { FastifyRequestType } from "fastify/types/type-provider";
import { prisma } from "../../lib/prisma";
import { FastifyReply } from "fastify";

export async function listPrompts(request: FastifyRequestType, reply: FastifyReply) {
    const prompts = await prisma.prompt.findMany();
    return reply.status(200).send(prompts)
}