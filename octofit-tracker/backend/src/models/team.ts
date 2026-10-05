import mongoose, { Schema, type Types } from 'mongoose';

export interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

const teamSchema: Schema<Team> = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const team = mongoose.models.Team ?? mongoose.model('Team', teamSchema);
export default team;
