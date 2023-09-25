import { Router } from 'express';
import cron from 'node-cron';
import { Task } from '../job/service';

const router = Router();

const tasks: Task[] = [];
let taskIdCounter = 1;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { description, schedule } = req.body;
  const id = taskIdCounter++;

  tasks.push({ id, description, schedule });

  cron.schedule(schedule, () => {
    console.log(`Task ${id}: ${description} is running at ${new Date()}`);
  });

  res.status(201).json({ id });
});

export default router;
