import express from 'express';
import cors from 'cors';
import { env } from './config/env.config';
import logger from './config/logger.config';

const app = express();


app.use(cors());


app.get('/health', (req, res) => {
  logger.info('Server is Up');
  res.status(200).send({ status: 'OK', timestamp: new Date().toISOString() });
});


const server = app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`);
});


const gracefulShutdown = () => {
  logger.info('Shutting down server gracefully...');
  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown', err);
      process.exit(1);
    }
    logger.info('Server shut down successfully');
    process.exit(0);
  });
};


process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export default app;
