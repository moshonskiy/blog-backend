import CommentModel from '../models/Comment.js';

export const create = async (req, res) => {
    try {
        const document = new CommentModel({
            text: req.body.text,
            userId: req.body.userId,
            postId: req.body.postId,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl || '',
        });

        const comment = await document.save();

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Did not manage to create comment',
        })
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();

        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}

export const getPostComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await CommentModel.find();
        const filteredComments = comments.filter((comment) => comment.postId === postId);

        res.json(filteredComments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
}
