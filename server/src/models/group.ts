import { Document, model, Schema } from "mongoose";
import { StreamingService } from "../constants";

export interface GroupDoc extends Document {
  count: number;
  code: string;
  movies: Map<string, number>;
  genre: number[];
  providers: StreamingService[];
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
  genre: {
    type: Array,
    of: Number,
  },
  providers: [
    {
      type: Number,
      enum: Object.values(StreamingService),
    },
  ],
});

export const Group = model<GroupDoc>("Group", GroupSchema);
