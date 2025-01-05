import UserModel from '../models/User.js';

const userController = {};

userController.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({
            message: 'Lấy danh sách người dùng thành công',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

userController.getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({
        message: 'Không tìm thấy id người dùng',
        data: null
    });
    try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).json({
            message: 'Không tìm thấy người dùng',
            data: null
        });
        const { password, ...userData } = user.toObject();
        return res.status(200).json({
            message: 'Lấy thông tin người dùng thành công',
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

userController.getCurrentUser = async (req, res) => {
    try {
        const { user } = req;
        if (!user) return res.status(404).json({
            message: 'Không tìm thấy người dùng',
            data: null
        });
        const findingUser = await UserModel.findById(user.userId);
        if (!findingUser) return res.status(404).json({
            message: 'Không tìm thấy người dùng',
            data: null
        });
        const { password, ...userData } = findingUser.toObject();

        return res.status(200).json({
            message: 'Lấy thông tin người dùng thành công',
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const { user } = req;
        if (!user) return res.status(404).json({
            message: 'Không tìm thấy người dùng',
            data: null
        });
        const updatedUser = await UserModel
            .findByIdAndUpdate(
                user.userId,
                { ...req.body },
                { runValidators: true, new: true });
        if (!updatedUser) return res.status(404).json({
            message: 'Cập nhật người dùng không thành công',
            data: null
        });
        const { password, ...userData } = updatedUser.toObject();
        return res.status(200).json({
            message: 'Cập nhật người dùng thành công',
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

userController.changeUserStatus = async (req, res) => {
    try {
        const { id } = req.query;
        const { status } = req.query || 'active';
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id người dùng',
            data: null
        });
        const updatedUser = await UserModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedUser) return res.status(404).json({
            message: 'Cập nhật trạng thái người dùng không thành công',
            data: null
        });

        const { password, ...user } = updatedUser.toObject();
        return res.status(200).json({
            message: 'Cập nhật trạng thái người dùng thành công',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

export default userController;