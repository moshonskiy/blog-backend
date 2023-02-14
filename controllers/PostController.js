import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').sort({ createdAt: 'descending' }).exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to get posts',
        })
    }
}

export const getAllByPopularity = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').sort({ viewsCount: 'descending' }).exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to get posts',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {
                    viewsCount: 1
                }
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Did not manage to get post',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Post not found',
                    });
                }

                res.json(doc);
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to get posts',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Did not manage to delete post',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Post not found',
                    });
                }

                res.json({
                    success: true,
                })
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to get posts',
        })
    }
}

export const create = async (req, res) => {
    try {
        const document = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(' '),
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const post = await document.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to create post',
        })
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.body.user,
                tags: req.body.tags.split(' '),
            }
        );

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to update post',
        })
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((post) => post.tags).flat().slice(0, 5);
        const uniqueTags = [...new Set(tags)]

        res.json(uniqueTags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to get tags',
        })
    }
};

export const getPostsByTag = async (req, res) => {
    try {
        const id = req.params.id;

        const posts = await PostModel.find({ tags: { "$in": [id] } }).exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Did not manage to get tags',
        })
    }
};
