import { Document, model, Schema } from "mongoose";

export interface GroupDoc extends Document {
  count: number;
  code: string;
  movies: Map<string, number>;
  genre: number[];
  providers: string[];
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
  providers: {
    type: Array,
    of: String,
  },
});

export const Group = model<GroupDoc>("Group", GroupSchema);
