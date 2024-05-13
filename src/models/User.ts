import { model, models, Schema } from 'mongoose';

export interface User {
  _id: string;

  name: string;
  email: string;
  password: string;
  image: string;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Email is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export default models.User || model('User', UserSchema);
