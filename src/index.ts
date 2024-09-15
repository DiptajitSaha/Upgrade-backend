import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from "express";
import { app_config } from './config';
import { course } from './routes/course.routes';
import { users } from './routes/user.routes';
import cors from 'cors';

const app = express();
const port = app_config.port;
app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/courses', course);
app.use('/user', users);

app.use('*', (req: Request, res: Response) => {
  res.send('not found').status(404);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});