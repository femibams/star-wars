import { Request, Response } from 'express';
import { ApiResponse } from '../util/responseManager';
import { elasticLogger } from '../util/elasticLogger';
import { getRepository } from "typeorm";
import { MovieService } from '../services/movie';
import { CommentService } from '../services/comment';
import { Log } from '../types';

const find = async(req: Request, res: Response) => {
    const { title } = req.query;
    let url = '/films/';
    if(title) {
        url =  `/films?search=${title}`
    }
    MovieService.fetchMovies(url)
    .then(async(response) => {
        console.log("got here")
        let log: Log = {
            requestUrl: url,
            response: `${response}`,
            time: new Date().toISOString()
        }
        console.log("got here")
        elasticLogger(log)

        let movies = await attachComments(response.data.results);

        return ApiResponse.success(res, {
            message: "Movies list completed",
            data: {
                movies
            }
        }, 200);
    })
    .catch((error) => {
        return ApiResponse.failure(res, {
            message: "An error occured while fetching movie list",
            error
        }, 500);
    })
    
}

const attachComments = async(movies) => {
    for (let index = 0; index < movies.length; index++) {
        movies[index].comments = []

        let comment = await CommentService.findComment(movies[index].episode_id)
        movies[index].comments = comment.length;
    }
    
    return movies;
}

export const MovieController = {
    find
}