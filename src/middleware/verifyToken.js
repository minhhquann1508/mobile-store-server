import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded || null;
            next();
        } else {
            return res.status(401).json({
                message: 'Không tìm thấy token',
                data: null
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Token không hợp lệ',
            data: null
        });
    }
};

export default verifyToken;