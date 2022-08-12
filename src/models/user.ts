import { Error, Document, Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  username: string;

  likes: string[];

  resetToken: string | undefined;
  resetTokenExpiration: Date | undefined;

  google: string;
  tokens: AuthToken[];

  profile: {
    name: string;
    picture?: string;
  };

  matchPassword: matchPassword;
  encryptPassword: encryptPassword;
};

type matchPassword = (
  password: string,
  cb: (err: Error, isMatch: boolean) => void
) => void;

type encryptPassword = (password: string) => Promise<string>;

export interface AuthToken {
  accessToken: string;
  kind: string;
}

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    name: String,
    username: { type: String, unique: true },
    password: String,

    resetToken: String,
    resetTokenExpiration: Date,

    likes: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
    tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
    retweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],

    google: String,
    tokens: Array,

    profile: {
      name: String,
      picture: String
    }
  },
  { timestamps: true }
);

const encryptPassword: encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const comparePassword: matchPassword = function (this: UserDocument, password, cb) {
  return bcryptjs.compare(
    password,
    this.password,
    (err: Error, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

UserSchema.methods.encryptPassword = encryptPassword;
UserSchema.methods.matchPassword = comparePassword;

export const User = model<UserDocument>('User', UserSchema);
