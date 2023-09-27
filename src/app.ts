import express from 'express';
import routes from './router/routes';
import { realizarIntegracao } from './job/integration';
import cron from 'node-cron';

const app = express();

app.use(express.json());
app.use('/tasks', routes);

app.listen(3000, () => {
  console.log('🚀 listening at http://localhost:3000');
});

cron.schedule('59 23 * * *', () => {
  realizarIntegracao();
  console.log('Tarefa agendada executada.');
});

export default app;
