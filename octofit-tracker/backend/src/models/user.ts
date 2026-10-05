import mongoose, { Schema, type Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  team?: Types.ObjectId;
  points: number;
}

const userSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const user = mongoose.models.User ?? mongoose.model('User', userSchema);
export default user;
