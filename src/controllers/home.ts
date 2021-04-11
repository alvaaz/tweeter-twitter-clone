import { Request, Response } from "express";
import { Tweet } from "../models";

export const home = {
  index: async (req: Request, res: Response) => {
    const tweets = await Tweet.find().sort({ timestamp: 1 });
    res.render("index", { tweets });
  },
  explore: async (req: Request, res: Response) => {
    res.render("explore");
  },
  bookmarks: async (req: Request, res: Response) => {
    res.render("bookmarks");
  },
  profile: async (req: Request, res: Response) => {
    res.render("profile");
  },
  edit: async (req: Request, res: Response) => {
    res.render("edit");
  },
};
