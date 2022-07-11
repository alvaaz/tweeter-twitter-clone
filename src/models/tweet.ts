import { Schema, model } from 'mongoose';
import path from 'path';

const TweetSchema = new Schema({
  content: { type: String },
  image: { type: String },
  retweets: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  timestamp: { type: Date, default: Date.now }
});

TweetSchema.virtual('uniqueId').get(function (this: { image: string }) {
  return this.image.replace(path.extname(this.image), '');
});

export const Tweet = model('Tweet', TweetSchema);
