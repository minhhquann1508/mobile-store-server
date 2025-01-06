const checkPermission = (...roles) => {
    return async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(401).json({
                message: 'Bạn không có quyền truy cập',
                data: null,
            });
        }
    }
}

export default checkPermission;