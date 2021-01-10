import { Document, model, Schema, Types } from "mongoose";

export interface GroupDoc extends Document {
  name: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
}

const GroupSchema = new Schema({
  name: String,
  owner: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

export const Group = model<GroupDoc>("Group", GroupSchema);
