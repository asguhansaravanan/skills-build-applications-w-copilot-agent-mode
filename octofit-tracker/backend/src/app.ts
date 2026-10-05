import express, { type NextFunction, type Request, type Response } from 'express';
import apiRouter from './routes/api.js';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use((req, res, next) => {
  const origin = req.get('origin');

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());
app.use(apiRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode =
    error instanceof Error && 'status' in error && typeof error.status === 'number'
      ? error.status
      : 500;
  const message =
    statusCode < 500 && error instanceof Error ? error.message : 'Internal server error';

  res.status(statusCode).json({ error: message });
});

export default app;
