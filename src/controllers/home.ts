import { Request, Response } from 'express';
import { Tweet } from '../models';

export const home = {
  index: async (req: Request, res: Response) => {
    const tweets = await Tweet.find()
      .sort({ timestamp: -1 })
      .populate('author');
    console.log(tweets);
    res.render('index', { tweets, page_title: 'home', user: req.user });
  },
  explore: async (req: Request, res: Response) => {
    res.render('explore', { page_title: 'explore', user: req.user });
  },
  bookmarks: async (req: Request, res: Response) => {
    res.render('bookmarks', { page_title: 'bookmarks', user: req.user });
  },
  profile: async (req: Request, res: Response) => {
    res.render('profile', { page_title: 'profile', user: req.user });
  },
  edit: async (req: Request, res: Response) => {
    res.render('edit');
  },
  notifications: async (req: Request, res: Response) => {
    res.render('notifications', {
      page_title: 'notifications',
      user: req.user
    });
  },
  404: async (req: Request, res: Response) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
  }
};
