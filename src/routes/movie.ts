import { Express } from 'express';
import { MovieController } from '../controllers/movie';
import { checkJwt } from "../middlewares/checkJwt";

export const MOVIE_ENDPOINT = '/movie'

function setup (app: Express) {

  app.get(`${MOVIE_ENDPOINT}/list`, checkJwt, (req, res) =>
    MovieController.find(req, res)
  );

}

export const MovieRoutes = {
  setup
}
