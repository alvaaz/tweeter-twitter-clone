import { Request, Response } from 'express';
import { Tweet } from '../models';

export const home = {
  index: async (req: Request, res: Response) => {
    const tweets = await Tweet.find()
      .sort({ timestamp: -1 })
      .populate('author');
    console.log(tweets);
    res.render('index', { tweets, page_name: 'home' });
  },
  explore: async (req: Request, res: Response) => {
    res.render('explore', { page_name: 'explore' });
  },
  bookmarks: async (req: Request, res: Response) => {
    res.render('bookmarks', { page_name: 'bookmarks' });
  },
  profile: async (req: Request, res: Response) => {
    res.render('profile', { page_name: 'profile', user: req.user });
  },
  edit: async (req: Request, res: Response) => {
    res.render('edit');
  },
  notifications: async (req: Request, res: Response) => {
    res.render('notifications', { page_name: 'notifications' });
  },
  404: async (req: Request, res: Response) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
  }
};
