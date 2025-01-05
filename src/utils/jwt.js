import jwt from 'jsonwebtoken';

const createAccessToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET);
};

export default createAccessToken;