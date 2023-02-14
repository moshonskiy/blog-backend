import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded._id;

            next();
        } catch (error) {
            res.status(403).json({
                message: 'Access denied',
            })
        }
    } else {
        return res.status(403).json({
            message: 'Access denied',
        })
    }
}

export default checkAuth;
