import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { projects } from '../data/projects';
import { projectsSchema } from '../schemas/projects';

export async function projectsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: projectsSchema,
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
		res.status(200).send(projects);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch projects from backend' });
      }
    },
  );
}
