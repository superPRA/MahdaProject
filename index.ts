import express, { Express, Request, Response , Application, request } from 'express';
import dotenv from 'dotenv';
import core from './core/main';

dotenv.config();

const app: Application = express();

app.use(express.json())
app.listen(3000);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/api/v0', core);
