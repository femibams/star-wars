import { Express } from 'express';
import { AuthController } from '../controllers/auth';
import { checkJwt } from "../middlewares/checkJwt";

export const AUTH_ENDPOINT = '/auth'

function setup (app: Express) {
  app.post(`${AUTH_ENDPOINT}/login`, (req, res) =>
    AuthController.login(req, res)
  );

  app.post(`${AUTH_ENDPOINT}/create`, (req, res) =>
    AuthController.create(req, res)
  );

  app.post(`${AUTH_ENDPOINT}/reset-password`, checkJwt, (req, res) =>
    AuthController.resetPassword(req, res)
  );
}

export const AuthRoutes = {
  setup
}
