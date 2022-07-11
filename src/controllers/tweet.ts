import { Request, Response } from 'express';
import { Tweet, User } from '../models';

export const tweet = {
  index: (req: Request, res: Response) => {
    res.send('Index image');
  },
  create: async (req: Request, res: Response) => {
    const saveTweet = async () => {
      const newTweet = new Tweet({
        content: req.body.content,
        author: req.user
      });
      return await newTweet.save();
    };

    await saveTweet().then(async (tweet) => {
      if (req.user) {
        await User.findByIdAndUpdate(req.user, {
          $push: {
            tweets: tweet._id
          }
        });
      }
    });

    res.redirect('/');
  },
  like: async (req: Request, res: Response) => {
    if (req.user) {
      const tweetId = req.params.tweet_id;
      const userId = req.user._id;
      await Tweet.findOneAndUpdate({ _id: tweetId }, [
        {
          $set: {
            likes: {
              $cond: [
                { $in: [userId, '$likes'] },
                {
                  $filter: {
                    input: '$likes',
                    cond: { $ne: ['$$this', userId] }
                  }
                },
                { $concatArrays: ['$likes', [userId]] }
              ]
            }
          }
        }
      ]);
      await User.findOneAndUpdate({ _id: userId }, [
        {
          $set: {
            likes: {
              $cond: [
                { $in: [tweetId, '$likes'] },
                {
                  $filter: {
                    input: '$likes',
                    cond: { $ne: ['$$this', tweetId] }
                  }
                },
                { $concatArrays: ['$likes', [tweetId]] }
              ]
            }
          }
        }
      ]);
    }
    res.redirect(req.headers.referer ? req.headers.referer : '/');
  },
  comment: (req: Request, res: Response) => {
    res.send('Index image');
  },
  remove: (req: Request, res: Response) => {
    res.send('Index image');
  },
  retweet: async (req: Request, res: Response) => {
    if (req.user) {
      const tweetId = req.params.tweet_id;
      const userId = req.user._id;
      await Tweet.findOneAndUpdate({ _id: tweetId }, [
        {
          $set: {
            retweets: {
              $cond: [
                { $in: [userId, '$retweets'] },
                {
                  $filter: {
                    input: '$retweets',
                    cond: { $ne: ['$$this', userId] }
                  }
                },
                { $concatArrays: ['$retweets', [userId]] }
              ]
            }
          }
        }
      ]);
      await User.findOneAndUpdate({ _id: userId }, [
        {
          $set: {
            retweets: {
              $cond: [
                { $in: [tweetId, '$retweets'] },
                {
                  $filter: {
                    input: '$retweets',
                    cond: { $ne: ['$$this', tweetId] }
                  }
                },
                { $concatArrays: ['$retweets', [tweetId]] }
              ]
            }
          }
        }
      ]);
    }
    res.redirect(req.headers.referer ? req.headers.referer : '/');
  }
};
