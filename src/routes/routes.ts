import { Router } from 'express';
import { home, tweet, users, profile } from '../controllers';
import passport from 'passport';
import isAuth from '../middleware/is-auth';

export const router = Router();

//Views
router.get('/', isAuth, home.index);
router.get('/auth/failed', (req, res) => res.send('You failed to log in'));
router.get("/auth/good", (req, res) => res.send(`Welcome mr `));

router.get('/explore', isAuth, home.explore);
router.get('/bookmarks', isAuth, home.bookmarks);
router.get('/notifications', home.notifications);
router.get('/profile', isAuth, home.profile);
router.get('/profile/edit', isAuth, home.edit);

router.delete('/tweet/:tweet_id', tweet.remove);

router.post('/signup', users.signUp);

router.post('/login', users.signIn);
router.get('/login', users.login);

router.post('/auth/reset', users.renderReset);
router.get('/reset/:token', users.reset);
router.post('/new-password', users.newPassword);

router.get('/logout', users.logout);

router.get('/:username', profile.tweets);
router.get('/:username/with_replies', profile.withReplies);
router.get('/:username/media', profile.media);
router.get('/:username/likes', profile.likes);
router.post('/profile/edit', profile.edit);

router.get('favicon.ico', (req, res) => res.sendStatus(204));

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login',
    successRedirect: '/auth/good' }),
  function (req, res) {
    res.send(req.user);
    res.send('you reached the redirect URI');
  }
);

router.post('/tweet/add', tweet.create);
router.post('/tweet/:tweet_id/like', tweet.like);
router.post('/tweet/:tweet_id/retweet', tweet.retweet);
router.post('/tweet/:tweet_id/comment', tweet.comment);
