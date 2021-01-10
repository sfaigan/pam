import { Document, model, Schema, Types } from "mongoose";
import { StreamingService } from "../constants";

// emailregex.com
// eslint-disable-next-line no-control-regex
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  age: number;
  subscribedTo?: StreamingService[];
  friends?: Types.ObjectId[];
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    match: EMAIL_REGEX,
    lowercase: true,
  },
  password: String,
  name: String,
  age: Number,
  subscribedTo: [
    {
      type: Number,
      enum: Object.values(StreamingService),
    },
  ],
  friends: [Schema.Types.ObjectId],
});

export const User = model<IUser>("User", UserSchema);
