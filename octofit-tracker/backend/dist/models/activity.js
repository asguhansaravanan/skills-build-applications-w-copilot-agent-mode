import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
        type: String,
        required: true,
        enum: ['running', 'walking', 'strength training', 'cycling'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true },
}, { timestamps: true });
export const activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
export default activity;
