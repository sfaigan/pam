import { Document, model, Schema } from "mongoose";
import { CountryCode, StreamingService } from "../constants";

export interface GroupDoc extends Document {
  count?: number;
  code: string;
  movies?: Map<string, number>;
  genres: number[];
  providers: StreamingService[];
  region: CountryCode;
}

const GroupSchema = new Schema({
  count: {
    type: Number,
    default: 1,
  },
  code: String,
  movies: {
    type: Map,
    of: Number,
  },
  genres: {
    type: Array,
    of: Number,
  },
  providers: [
    {
      type: Number,
      enum: Object.values(StreamingService),
    },
  ],
  region: CountryCode,
});

export const Group = model<GroupDoc>("Group", GroupSchema);
