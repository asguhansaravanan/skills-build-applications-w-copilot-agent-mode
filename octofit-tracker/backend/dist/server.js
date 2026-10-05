import app from './app.js';
import { connectDatabase } from './config/database.js';
const port = Number(process.env.PORT || 8000);
const baseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
await connectDatabase();
app.listen(port, () => {
    console.log(`OctoFit API listening on ${baseUrl}`);
});
