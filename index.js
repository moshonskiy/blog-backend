import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import fs, { mkdirSync } from 'fs';
import * as dotenv from 'dotenv';

import { registerValidation, loginValidation } from './validation/auth.js';
import { postCreateValidation } from './validation/post.js';
import { commentCreateValidation } from './validation/comment.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

import { PostController, UserController, CommentController } from './controllers/index.js'

const app = express();
dotenv.config();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB is up and running')
    })
    .catch((error) => console.log('db error', error));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {

    if (fs)

    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

app.get('/auth/me', checkAuth, UserController.getUser);

app.get('/posts', PostController.getAll);
app.get('/posts/popular', PostController.getAllByPopularity);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.get('/tags', PostController.getLastTags);
app.get('/tags/:id', PostController.getPostsByTag);
app.post('/comments', checkAuth, commentCreateValidation, CommentController.create)
app.get('/comments', CommentController.getAllComments);
app.get('/comments/:id', CommentController.getPostComments);

app.listen(PORT, (error) => {
    if (error) {
        return console.log(error);
    }

    console.log(`Server started on port: ${PORT}`);
})
