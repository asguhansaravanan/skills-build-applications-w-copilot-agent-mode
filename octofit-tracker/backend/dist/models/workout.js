import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    activityType: {
        type: String,
        required: true,
        enum: ['running', 'walking', 'strength training', 'cycling'],
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    instructions: { type: [String], default: [] },
}, { timestamps: true });
export const workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
export default workout;
