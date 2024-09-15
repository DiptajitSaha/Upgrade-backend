import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { app_config } from './config';

const app = express();
const port = app_config.port;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});