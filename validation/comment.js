import { body } from 'express-validator';

export const commentCreateValidation = [
    body('text', 'Enter comment text').isString(),
];
