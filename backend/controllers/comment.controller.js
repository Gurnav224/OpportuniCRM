import { Comment } from "../models/comment.model.js"

export const createComment = async (req, res) => {
    const {text, author } = req.body;
    try {
        const comment = new Comment({text, author});
        await comment.save();
        res.status(200).json(comment)
    } catch (error) {
        console.error('failed to create new comment', error);
        res.status(500).json({error:'server error'})
    }
}



export const getComments = async (req, res) => {
     const {author} = req.query;
     console.log(author)
    try {
        const comments = await Comment.find({author:author}).populate('author').exec();
        res.status(200).json(comments)
    } catch (error) {
        console.error('failed to get all comments', error)
        res.status(500).json({error:'server error'})
    }
}