import { Request, Response } from 'express';
import { ApiResponse } from '../util/responseManager';
import { getManager, getRepository } from "typeorm";
import { User } from "../entity/User";
import { hash } from 'bcrypt';
import { IUser } from '../types';
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import config from '../config';

// import { AuthService } from '../services/authservice';
// import { HTTPStatus } from '../constants/httpStatus';
// import { TokenUtils } from '../core/jwt/tokenutils';
// import { UserService } from '../services/userService';

const create = async(req: Request, res: Response) => {
    //Get parameters from the body
    let { firstName, lastName, userName, password } = req.body;
    let user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = userName;
    user.password = password;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    const userRepository = getRepository(User);
    try {
        await userRepository.save(user);
    } catch (e) {
        return ApiResponse.failure(res, {
            message: "Something went wrong",
            error: e
        }, 500)
    }

    //If all ok, send 201 response
    let response = {
        message: "User Created",
        data: user
    }

    return ApiResponse.success(res, response, 201)
}

const login = async(req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
        return ApiResponse.failure(res, {
            message: "Username and Password are both required",
        }, 400);
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
        return ApiResponse.failure(res, {
            message: "User with this username does not exist",
        }, 401);
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return ApiResponse.failure(res, {
            message: "Password is incorrect",
        }, 401);
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    return ApiResponse.success(res, {
        message: "Login successful",
        data: {
            token
        }
    }, 200);
}

const resetPassword = async(req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        return ApiResponse.failure(res, {
            message: "oldPassword and newPassword are both required",
        }, 400);
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
        return ApiResponse.failure(res, {
            message: "You cannot perform this action",
        }, 401);
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        return ApiResponse.failure(res, {
            message: "Incorrect old password",
        }, 401);
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
        return ApiResponse.failure(res, {
            message: "Something went wrong",
            data: errors
        }, 400);
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    return ApiResponse.failure(res, {
        message: "Password reset successful",
    }, 205);
}

export const AuthController = {
    create,
    login,
    resetPassword
}