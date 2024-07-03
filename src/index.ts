import HyperExpress, { Request, Response } from 'hyper-express';
import { authenticate } from './middlewares/auth.middleware';
import { validate } from './config/validate';
import 'dotenv/config';
import logger from './config/logger';
import { reqLogger } from './middlewares/logging.middleware';
import { createClient } from '@redis/client';

export const config = validate({
  ...process.env,
});

export const redis = createClient({
  url: config.redis.url,
});

async function bootstrap() {
  const app = new HyperExpress.Server();

  await redis.connect();

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.use(reqLogger);
  app.use(authenticate);

  await app
    .listen(config.port)
    .then(() => {
      logger.info(`Server is running on port ${config.port}`);
    })
    .catch((err) => {
      logger.error(err);
    });

  process.on('SIGINT', async () => {
    await redis.disconnect();
    process.exit();
  });
}

bootstrap();
