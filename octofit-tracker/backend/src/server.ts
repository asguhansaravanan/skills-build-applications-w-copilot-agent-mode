import express, { type Request, type Response } from 'express';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const handler = (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'OctoFit API is running' });
};

app.get('/api/users/', handler);
app.get('/api/teams/', handler);
app.get('/api/activities/', handler);
app.get('/api/leaderboard/', handler);
app.get('/api/workouts/', handler);

await connectDatabase();

app.listen(port, () => {
  console.log(`OctoFit API listening on ${baseUrl}`);
});
