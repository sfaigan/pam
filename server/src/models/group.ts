import { Document, model, Schema } from "mongoose";
import { CountryCode, StreamingService } from "../constants";

export interface MovieDecision {
  userId: string;
  movieId: string;
  like: boolean;
}

export interface GroupDoc extends Document {
  code: string;
  genres: number[];
  providers: StreamingService[];
  region: CountryCode;
  users?: string[];
  movies?: MovieDecision[];
}

const GroupSchema = new Schema({
  code: String,
  genres: [Number],
  providers: [
    {
      type: Number,
      enum: Object.values(StreamingService),
    },
  ],
  region: {
    type: String,
    enum: Object.values(CountryCode),
  },
  movies: [
    {
      userId: String,
      movieId: String,
      like: Boolean,
    },
  ],
  users: [String],
});

export const Group = model<GroupDoc>("Group", GroupSchema);
