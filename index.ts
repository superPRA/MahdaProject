import express, { Express, Request, Response , Application, request } from 'express';
import dotenv from 'dotenv';
import apiCore from './core/apiCore';
import cors from "cors"
import apisCore from './core/apisCore';

dotenv.config();

const app: Application = express();

app.use(express.json())
app.listen(3000);
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/api/v0', apiCore);
app.post('/api/v1', apisCore)
