import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { User, Tweet, UserDocument } from '../models';

export const profile = {
  tweets: async (req: Request, res: Response) => {
    if (req.user && req.params.username === req.user.username) {
      res.render('users/profile', {
        user: req.user,
        page_name: '',
        itsMe: true
      });
    } else {
      const user = await User.findOne({ username: req.params.username });
      res.render('users/profile', { user: user, page_name: '', itsMe: false });
    }
  },
  withReplies: (req: Request, res: Response) => {
    res.render('users/profile', { user: req.user, page_name: 'with_replies' });
  },
  media: (req: Request, res: Response) => {
    res.render('users/profile', { user: req.user, page_name: 'media' });
  },
  likes: async (req: Request, res: Response) => {
    const user = await User.findById(req.user).populate('likes');
    if (user) {
      const tweets = user.likes.map(async (id) => {
        return await Tweet.findById(id).populate('author');
      });
      Promise.all(tweets).then((tweets) => {
        res.render('users/profile', {
          user: req.user,
          page_name: 'likes',
          likes: tweets
        });
      });
    }
  },
  edit: (req: Request, res: Response) => {
    const image = req.file;
    if (!image) {
      res.render('users/profile', { user: req.user, page_name: 'edit' });
    }
    const imageUrl = image?.filename;
    const user = req.user;
    if (user) {
      User.findById(user, (err: CallbackError, user: UserDocument) => {
        if (err) {
          res.send(err);
        }
        user.profile.picture = imageUrl;
        user.save((err, user) => {
          if (err) {
            res.send(err);
          }
          res.render('users/profile', { user: user, page_name: 'edit' });
        });
      });
    }
    res.render('users/profile', { user: req.user, page_name: 'edit' });
  }
};
