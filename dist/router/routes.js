"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdCounter = exports.tasks = void 0;
const app_1 = __importDefault(require("../app"));
const express_1 = require("express");
const node_cron_1 = __importDefault(require("node-cron"));
const router = (0, express_1.Router)();
exports.default = router;
exports.tasks = [];
exports.taskIdCounter = 1;
app_1.default.get('/tasks', (req, res) => {
    res.json(exports.tasks);
});
app_1.default.post('/tasks', (req, res) => {
    const { description, schedule } = req.body;
    const id = exports.taskIdCounter++;
    exports.tasks.push({ id, description, schedule });
    node_cron_1.default.schedule(schedule, () => {
        console.log(`Task ${id}: ${description} is running at ${new Date()}`);
    });
    res.status(201).json({ id });
});
app_1.default.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
