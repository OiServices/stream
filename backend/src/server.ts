import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './config/logger.config';
import { env } from './config/env.config';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import organizationRoutes from './routes/organization.routes';
import startupRoutes from './routes/startup.routes';
import projectRoutes from './routes/project.routes';
import transactionRoutes from './routes/transaction.routes';
import investorRoutes from './routes/investor.routes';
import { Server } from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(helmet());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// const corsOptions = {
//   origin: ['https://trusted-domain.com', 'https://another-domain.com'],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };


app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/organizations', organizationRoutes);
app.use('/startups', startupRoutes);
app.use('/projects', projectRoutes);
app.use('/transactions', transactionRoutes);
app.use('/investors', investorRoutes);
app.use('/admin', adminRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Server is up and running' });
});

// 404 Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});


// Start Server
const server: Server = app.listen(env.port, () => {
  logger.info(`Server started on port ${env.port}`);
});

// Graceful Shutdown
const gracefulShutdown = () => {
  logger.info('Received shutdown signal. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed. Exiting process...');
    process.exit(0);
  });

  
  setTimeout(() => {
    logger.error('Forcefully shutting down...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
