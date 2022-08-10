import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import multer, { FileFilterCallback } from 'multer';
import session from 'express-session';
import express, { Application } from 'express';
import errorHandler from 'errorhandler';
import flash from 'connect-flash';
import passport from 'passport';
import { router } from './routes';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import './config/passport';
dotenv.config();

const port = process.env.SERVER_PORT;

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: 'mongodb://mongo/mydb',
  collection: 'sessions'
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './public/upload/temp'));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const config = (app: Application) => {
  // Settings
  app.set('port', process.env.PORT || port);
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'pug');

  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      store: store
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // Global variables
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

  app.locals.basedir = path.join(__dirname, './');

  // Middlewares
  app.use(morgan('dev'));
  app.use(
    multer({
      storage: fileStorage,
      fileFilter: fileFilter as () => void
    }).single('profile-upload')
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Routes

  app.use(router);
  // app.use(home[404]);

  app.use(
    '/micromodal',
    express.static(path.join(__dirname, '../node_modules/micromodal/dist/'))
  );

  app.use('/public', express.static(path.join(__dirname, './public')));

  // errorhandlers

  if ('development' === app.get('env')) {
    app.use(errorHandler);
  }

  return app;
};
