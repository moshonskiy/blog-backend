import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Enter post title').isLength({ min: 3 }).isString(),
    body('text', 'Enter post text').isLength({ min: 3 }).isString(),
    body('tags', 'Incorrect format (array needed)').optional().isString(),
    body('imageUrl', 'Incorrect url').optional().isString(),
];
