import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import net from 'net';
import readline from 'readline';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';
import notificationRoutes from './routes/notifications.js';
import bookingRoutes from './routes/bookings.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const FALLBACK_PORTS = [4000, 5000, 6000];

const colors = {
  reset: '\u001b[0m',
  bold: '\u001b[1m',
  cyan: '\u001b[36m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  red: '\u001b[31m',
};

const logger = {
  info(message) {
    console.log(`${colors.cyan}[INFO]${colors.reset} ${message}`);
  },
  success(message) {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
  },
  warn(message) {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${message}`);
  },
  error(message) {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`);
  },
};

const app = express();
const server = http.createServer(app);

const rawClientOrigin = process.env.CLIENT_ORIGIN ?? '*';
const clientOrigins = rawClientOrigin.split(',').map((origin) => origin.trim()).filter(Boolean);
const allowAnyOrigin = clientOrigins.includes('*');

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowAnyOrigin || clientOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

const io = new Server(server, {
  cors: {
    origin: allowAnyOrigin ? '*' : clientOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
});

app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/trips', tripRoutes);
app.use('/api/trips', tripRoutes);
app.use('/notifications', notificationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/bookings', bookingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', aiRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ai-trip-planner-backend' });
});

io.on('connection', (socket) => {
  socket.emit('travel:update', {
    type: 'weather',
    message: 'Live weather and route alerts connected.',
    createdAt: new Date().toISOString(),
  });

  socket.on('trip:watch', (tripId) => {
    socket.join(`trip:${tripId}`);
  });
});

const mongoUri = process.env.MONGODB_URI;

if (mongoUri) {
  mongoose.connect(mongoUri).catch((error) => {
    logger.warn(`MongoDB connection failed; API will still run with route-level fallbacks. ${error.message}`);
  });
}

function formatUrl(port) {
  return `http://localhost:${port}`;
}

function askYesNo(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`${question} `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const serverCheck = net.createServer();

    serverCheck.once('error', (error) => {
      serverCheck.close();
      if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
        resolve(false);
        return;
      }
      logger.error(`Unexpected port check failure for ${port}: ${error.message}`);
      resolve(false);
    });

    serverCheck.once('listening', () => {
      serverCheck.close(() => resolve(true));
    });

    serverCheck.listen(port, '127.0.0.1');
  });
}

async function resolvePort() {
  const envPort = Number(process.env.PORT);
  const preferredPort = Number.isInteger(envPort) && envPort > 0 ? envPort : FALLBACK_PORTS[0];
  const candidatePorts = [preferredPort, ...FALLBACK_PORTS.filter((port) => port !== preferredPort)];

  let currentPort = candidatePorts[0];

  if (await isPortAvailable(currentPort)) {
    return currentPort;
  }

  const promptPorts = candidatePorts.slice(1);
  if (promptPorts.length === 0) {
    throw new Error(`Port ${currentPort} is already in use and no fallback ports are configured.`);
  }

  if (!process.stdin.isTTY) {
    throw new Error(`Port ${currentPort} is already in use. Run in an interactive terminal or set PORT in .env to an available value.`);
  }

  for (const nextPort of promptPorts) {
    const answer = await askYesNo(
      `Port ${currentPort} is already in use.${colors.bold}\nDo you want to run on port ${nextPort} instead? (Y/N)${colors.reset}`
    );

    if (!/^y(es)?$/i.test(answer)) {
      throw new Error('Server startup cancelled by user.');
    }

    if (await isPortAvailable(nextPort)) {
      return nextPort;
    }

    logger.warn(`Port ${nextPort} is also in use. Trying next fallback port if available.`);
    currentPort = nextPort;
  }

  throw new Error(`No available ports found. Tried: ${candidatePorts.join(', ')}.`);
}

function setupErrorHandlers() {
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      logger.error(`Port ${server.address()?.port ?? 'unknown'} is already in use.`);
      return;
    }
    logger.error(`Server error: ${err instanceof Error ? err.message : err}`);
  });

  process.on('SIGINT', async () => {
    logger.info('Shutting down server...');
    try {
      await mongoose.disconnect();
    } catch (shutdownError) {
      logger.warn(`MongoDB disconnect during shutdown failed: ${shutdownError.message}`);
    }
    server.close(() => {
      logger.success('Server stopped successfully.');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    logger.info('Received termination signal. Exiting gracefully.');
    process.exit(0);
  });
}

async function startServer() {
  try {
    const selectedPort = await resolvePort();
    setupErrorHandlers();

    server.listen(selectedPort, () => {
      logger.success('Server running successfully at:');
      logger.success(`  ${formatUrl(selectedPort)}`);
      if (process.env.PORT) {
        logger.info(`Configured PORT=${process.env.PORT} from environment.`);
      }
    });
  } catch (error) {
    logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

startServer();
