import mongoose, { type Types } from 'mongoose';
import { activity, type Activity } from '../models/activity.js';
import { leaderboard, type Leaderboard } from '../models/leaderboard.js';
import { team, type Team } from '../models/team.js';
import { user, type User } from '../models/user.js';
import { workout, type Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const id = (value: string) => new mongoose.Types.ObjectId(value);

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userIds = {
      alex: id('650000000000000000000001'),
      blair: id('650000000000000000000002'),
      casey: id('650000000000000000000003'),
    };
    const teamIds = {
      trailblazers: id('650000000000000000000011'),
      fitCrew: id('650000000000000000000012'),
    };
    const period = '2026-10';

    const users: Array<User & { _id: Types.ObjectId }> = [
      {
        _id: userIds.alex,
        username: 'alex.chen',
        email: 'alex.chen@example.com',
        displayName: 'Alex Chen',
        team: teamIds.trailblazers,
        points: 165,
      },
      {
        _id: userIds.blair,
        username: 'blair.jones',
        email: 'blair.jones@example.com',
        displayName: 'Blair Jones',
        team: teamIds.fitCrew,
        points: 130,
      },
      {
        _id: userIds.casey,
        username: 'casey.rivera',
        email: 'casey.rivera@example.com',
        displayName: 'Casey Rivera',
        team: teamIds.trailblazers,
        points: 95,
      },
    ];
    const teams: Array<Team & { _id: Types.ObjectId }> = [
      {
        _id: teamIds.trailblazers,
        name: 'Trailblazers',
        description: 'Outdoor miles and steady progress.',
        members: [userIds.alex, userIds.casey],
      },
      {
        _id: teamIds.fitCrew,
        name: 'Fit Crew',
        description: 'Building strength together.',
        members: [userIds.blair],
      },
    ];
    const activities: Array<Activity & { _id: Types.ObjectId }> = [
      {
        _id: id('650000000000000000000021'),
        user: userIds.alex,
        type: 'running',
        durationMinutes: 32,
        distanceKm: 5,
        caloriesBurned: 310,
        points: 50,
        date: new Date('2026-10-03T08:00:00.000Z'),
      },
      {
        _id: id('650000000000000000000022'),
        user: userIds.alex,
        type: 'strength training',
        durationMinutes: 40,
        caloriesBurned: 220,
        points: 45,
        date: new Date('2026-10-04T16:30:00.000Z'),
      },
      {
        _id: id('650000000000000000000023'),
        user: userIds.blair,
        type: 'cycling',
        durationMinutes: 45,
        distanceKm: 12,
        caloriesBurned: 360,
        points: 55,
        date: new Date('2026-10-04T07:15:00.000Z'),
      },
      {
        _id: id('650000000000000000000024'),
        user: userIds.blair,
        type: 'walking',
        durationMinutes: 30,
        distanceKm: 2.5,
        caloriesBurned: 120,
        points: 25,
        date: new Date('2026-10-05T06:30:00.000Z'),
      },
      {
        _id: id('650000000000000000000025'),
        user: userIds.casey,
        type: 'running',
        durationMinutes: 25,
        distanceKm: 3.5,
        caloriesBurned: 240,
        points: 40,
        date: new Date('2026-10-02T15:00:00.000Z'),
      },
    ];
    const leaderboardEntries: Array<Leaderboard & { _id: Types.ObjectId }> = [
      {
        _id: id('650000000000000000000031'),
        user: userIds.alex,
        points: 165,
        rank: 1,
        period,
      },
      {
        _id: id('650000000000000000000032'),
        user: userIds.blair,
        points: 130,
        rank: 2,
        period,
      },
      {
        _id: id('650000000000000000000033'),
        user: userIds.casey,
        points: 95,
        rank: 3,
        period,
      },
    ];
    const workouts: Array<Workout & { _id: Types.ObjectId }> = [
      {
        _id: id('650000000000000000000041'),
        name: 'Easy Starter Walk',
        description: 'A relaxed walk to build a consistent movement habit.',
        activityType: 'walking',
        difficulty: 'beginner',
        durationMinutes: 20,
        instructions: ['Walk at a comfortable pace.', 'Finish with a gentle stretch.'],
      },
      {
        _id: id('650000000000000000000042'),
        name: 'Steady 5K',
        description: 'A steady run focused on maintaining an even pace.',
        activityType: 'running',
        difficulty: 'intermediate',
        durationMinutes: 35,
        instructions: ['Warm up for five minutes.', 'Run at a pace you can sustain.', 'Cool down with a walk.'],
      },
      {
        _id: id('650000000000000000000043'),
        name: 'Bodyweight Basics',
        description: 'A simple strength session using bodyweight movements.',
        activityType: 'strength training',
        difficulty: 'beginner',
        durationMinutes: 25,
        instructions: ['Complete three rounds of squats, lunges, and wall push-ups.', 'Rest as needed.'],
      },
      {
        _id: id('650000000000000000000044'),
        name: 'Weekend Ride',
        description: 'A moderate cycling workout to build endurance.',
        activityType: 'cycling',
        difficulty: 'intermediate',
        durationMinutes: 40,
        instructions: ['Start with an easy five-minute ride.', 'Cycle at a steady conversational pace.'],
      },
    ];

    const existingUserIds = new Set(
      (await user.distinct('_id', { _id: { $in: users.map(({ _id }) => _id) } })).map(String),
    );
    const newUsers = users.filter(({ _id }) => !existingUserIds.has(_id.toString()));
    if (newUsers.length) await user.insertMany(newUsers);

    const existingTeamIds = new Set(
      (await team.distinct('_id', { _id: { $in: teams.map(({ _id }) => _id) } })).map(String),
    );
    const newTeams = teams.filter(({ _id }) => !existingTeamIds.has(_id.toString()));
    if (newTeams.length) await team.insertMany(newTeams);

    const existingActivityIds = new Set(
      (
        await activity.distinct('_id', {
          _id: { $in: activities.map(({ _id }) => _id) },
        })
      ).map(String),
    );
    const newActivities = activities.filter(({ _id }) => !existingActivityIds.has(_id.toString()));
    if (newActivities.length) await activity.insertMany(newActivities);

    const existingLeaderboardIds = new Set(
      (
        await leaderboard.distinct('_id', {
          _id: { $in: leaderboardEntries.map(({ _id }) => _id) },
        })
      ).map(String),
    );
    const newLeaderboardEntries = leaderboardEntries.filter(
      ({ _id }) => !existingLeaderboardIds.has(_id.toString()),
    );
    if (newLeaderboardEntries.length) await leaderboard.insertMany(newLeaderboardEntries);

    const existingWorkoutIds = new Set(
      (await workout.distinct('_id', { _id: { $in: workouts.map(({ _id }) => _id) } })).map(String),
    );
    const newWorkouts = workouts.filter(({ _id }) => !existingWorkoutIds.has(_id.toString()));
    if (newWorkouts.length) await workout.insertMany(newWorkouts);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
