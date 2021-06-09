import { Express } from 'express';
import { AuthRoutes } from './auth';
import { CommentRoutes } from './comment';
import { MovieRoutes } from './movie';

function setup(app: Express) {
    app.get('/', (req, res) => {
      res.send('Welcome!!!')
    });
}

const BaseRoutes = {
  setup
}

export {
  AuthRoutes,
  BaseRoutes,
  CommentRoutes,
  MovieRoutes
}
