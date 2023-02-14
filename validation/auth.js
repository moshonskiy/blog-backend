import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password should be 5 characters min').isLength({ min: 5 }),
    body('fullName', 'Enter fullname, 3 characters min').isLength({ min: 3 }),
    body('avatarUrl', 'Incorrect url').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password should be 5 characters min').isLength({ min: 5 }),
];
