import { Comment } from "../models/comment.model.js"

export const createComment = async (req, res) => {
    const {text, author , lead} = req.body;

    try {
        const comment = new Comment({text, author, lead});
        await comment.save();
        res.status(200).json(comment)
    } catch (error) {
        console.error('failed to create new comment', error);
        res.status(500).json({error:'server error'})
    }
}



export const getComments = async (req, res) => {
     const { lead} = req.query;
    try {
        const comments = await Comment.find({lead}).populate('author').exec();
        res.status(200).json(comments)
    } catch (error) {
        console.error('failed to get all comments', error)
        res.status(500).json({error:'server error'})
    }
}