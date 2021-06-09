import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";

const findComment = async(episode_id) => {
    const commentRepository = getRepository(Comment);

    let comment = await commentRepository.find({ 
        where: { episode_id }, 
        order: { createdAt: "DESC" },
        relations: [ "user" ]
    });
    
    return comment;
}

export const CommentService = {
    findComment
}