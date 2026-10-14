import { model, Schema } from "mongoose";
import { Role, User } from "./user.entity";

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['student', 'teacher'] as Role[]
  },
  picture: String
});

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const transform = (_: any, ret: any) => ({
  id: ret.id,
  firstName: ret.firstName,
  lastName: ret.lastName,
  role: ret.role,
  fullName: ret.fullName,
  picture: ret.picture,
});

userSchema.set('toJSON', { virtuals: true, transform });
userSchema.set('toObject', { virtuals: true, transform });

export const userModel = model<User>('User', userSchema);