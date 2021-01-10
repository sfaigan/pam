import { Document, model, Schema } from "mongoose";

export interface GroupDoc extends Document {
  code: string;
  movies: Map<string, number>;
}

const GroupSchema = new Schema({
  code: String,
  movies: {
    type: Map,
    of: Number,
  },
});

export const Group = model<GroupDoc>("Group", GroupSchema);
