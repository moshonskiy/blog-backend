import mongoose, { Schema } from 'mongoose';

const Commentschema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        fullName:  {
            type: String,
            required: true,
        },
        avatarUrl: String,
        postId: {
            required: true,
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model('Comment', Commentschema);

export default Comment;
