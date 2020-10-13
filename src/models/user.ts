import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password: string) {
  await bcryptjs.compare(password, this.password);
};

export const User = model("User", UserSchema);
