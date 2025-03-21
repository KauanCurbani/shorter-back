import express from 'express';
import cors from 'cors';
import { Env } from '@/utils/env';
import { publicController } from './app/controllers/public-controller';
import { authController } from './app/controllers/auth-controller';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', publicController);
app.use('/api/auth', authController);

app.listen(Env.PORT, (err) => {
  if (err) console.error(err);
  console.log(`🔥 Server running on port ${Env.PORT}`);
})