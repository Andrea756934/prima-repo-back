import { model, Schema } from "mongoose";
import { userIdentity } from "./user-identity.entity";

export const userIdentitySchema = new Schema<userIdentity>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  provider: { type: String, default: 'local' },
  credentials: {
    type: {
      username: String,
      hashedPassword: String
    },
    _id: false,
  }
});

userIdentitySchema.pre('findOne', function() {
  this.populate('user');
});

export const userIdentityModel =
  model<userIdentity>('UserIdentity', userIdentitySchema);