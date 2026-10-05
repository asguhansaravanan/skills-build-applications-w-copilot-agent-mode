import { Router } from 'express';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';
const router = Router();
const getUsers = async (_req, res) => {
    res.json(await user.find().sort({ username: 1 }).lean());
};
const getTeams = async (_req, res) => {
    res.json(await team.find().sort({ name: 1 }).lean());
};
const getActivities = async (_req, res) => {
    res.json(await activity.find().sort({ date: -1 }).lean());
};
const getLeaderboard = async (_req, res) => {
    res.json(await leaderboard.find().sort({ points: -1, rank: 1 }).lean());
};
const getWorkouts = async (_req, res) => {
    res.json(await workout.find().sort({ name: 1 }).lean());
};
router.get('/api/users/', getUsers);
router.get('/api/teams/', getTeams);
router.get('/api/activities/', getActivities);
router.get('/api/leaderboard/', getLeaderboard);
router.get('/api/workouts/', getWorkouts);
export default router;
