import { Request, Response } from "express";
import { Tweet } from "../models";
import path from "path";
import { helpers } from "../helpers/libs";
import fs from "fs-extra";

export const tweet = {
  index: (req: Request, res: Response) => {
    res.send("Index image");
  },
  create: (req: Request, res: Response) => {
    console.log(req.body);
    const saveTweet = async () => {
      const imgUrl = helpers.randomNumber();
      const images = await Tweet.find({ image: imgUrl });
      if (images.length > 0) {
        saveTweet();
      } else {
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

        if (
          ext === ".png" ||
          ext === ".jpg" ||
          ext === ".jpeg" ||
          ext === ".gif"
        ) {
          await fs.rename(imageTempPath, targetPath);

          const newTweet = new Tweet({
            content: req.body.content,
            image: imgUrl + ext,
          });
          const imageSaved = await newTweet.save();
          res.send("works");
        } else {
          await fs.unlink(imageTempPath);
          res.status(500).json({ error: "Only images are allowed" });
        }
      }
    };

    saveTweet();
  },
  like: (req: Request, res: Response) => {
    res.send("Index image");
  },
  comment: (req: Request, res: Response) => {
    res.send("Index image");
  },
  remove: (req: Request, res: Response) => {
    res.send("Index image");
  },
};
