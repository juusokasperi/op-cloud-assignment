import fastify from 'fastify';
import cors from '@fastify/cors';
import {
  HOST,
  PORT,
  FRONTEND_URL,
} from './utils/config';
import { projectsRoutes } from './routes/projects';

const app = fastify({
  logger: true,
  // trustProxy: true,
  ajv: {
    customOptions: { allErrors: true, removeAdditional: true },
  },
});

console.log(JSON.stringify(process.env, null, 2));
app.log.info(`Front URL: ${FRONTEND_URL}`);
await app.register(cors, {
  origin: (origin, cb) => {
    const allowed = [FRONTEND_URL];
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true,
  methods: ['GET'],
});

app.get('/health', async () => ({ status: 'ok' }));

app.register(projectsRoutes, { prefix: '/api/projects' });

app.listen({ host: HOST, port: PORT }, function (err, address) {
  app.log.info(`[BACKEND] Server listening at ${HOST}:${PORT}`);
  app.log.info(`[BACKEND] Allowing CORS from ${FRONTEND_URL}`);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
