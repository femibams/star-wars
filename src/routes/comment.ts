import { Express } from 'express';
import { CommentController } from '../controllers/comment';
import { checkJwt } from "../middlewares/checkJwt";

export const COMMENT_ENDPOINT = '/comment'

function setup (app: Express) {

  app.post(`${COMMENT_ENDPOINT}/create`, checkJwt, (req, res) =>
    CommentController.create(req, res)
  );

  app.get(`${COMMENT_ENDPOINT}/list/:episode_id`, checkJwt, (req, res) =>
  CommentController.find(req, res)
  );

}

export const CommentRoutes = {
  setup
}
