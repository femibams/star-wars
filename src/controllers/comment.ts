import { Request, Response } from 'express';
import { ApiResponse } from '../util/responseManager';
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";
import { CommentService } from '../services/comment';
import { hash } from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import config from '../config';

const create = async(req: Request, res: Response) => {
    let { episode_id, comment } = req.body;
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    let user: User;

    if (!(episode_id && comment)) {
        return ApiResponse.failure(res, {
            message: "episode_id and comment are both required",
        }, 400);
    }

    try {
        user = await userRepository.findOneOrFail(id);
    } catch (id) {
        return ApiResponse.failure(res, {
            message: "We could not fetch user",
        }, 500);
    }

    let movieComment = new Comment();
    movieComment.episode_id = episode_id;
    movieComment.text = comment;
    movieComment.user = user;
    const commentRepository = getRepository(Comment);
    try {
        await commentRepository.save(movieComment);
    } catch (error) {
        return ApiResponse.failure(res, {
            message: "Something went wrong",
            error
        }, 500)
    }

    return ApiResponse.success(res, {
        message: "Comment added Successfully"
    }, 201)
}

const find = async(req: Request, res: Response) => {
    const { episode_id } = req.params;
    console.log('episode_id ', episode_id)

    let comment = await CommentService.findComment(episode_id)

    return ApiResponse.success(res, {
        data: comment
    }, 200)
}

export const CommentController = {
    create,
    find
}