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

        return res.status(200).json({
            message: 'Lấy thông tin người dùng thành công',
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