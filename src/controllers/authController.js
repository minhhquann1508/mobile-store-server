import bcrypt from 'bcryptjs';

import UserModel from '../models/User.js';
import createAccessToken from '../utils/jwt.js';

const authController = {};

authController.register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone)
        return res.status(400).json({
            message: 'Cần điền đủ thông tin',
            data: null
        });
    try {
        const isEmailAvailable = await UserModel.findOne({ email });

        if (isEmailAvailable)
            return res.status(400).json({
                message: 'Email này đã được đăng ký',
                data: null
            });
        const user = await UserModel.create({ name, email, password, phone });
        return res.status(201).json({
            message: 'Đăng ký tài khoản thành công',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};


authController.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({
        message: 'Không tìm thấy email hoặc mật khẩu',
        data: null
    });
    try {
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(400).json({
            message: 'Tài khoản không tồn tại',
            data: null
        });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).json({
            message: 'Email hoặc mật khẩu không hợp lệ',
            data: null
        });

        const { password: userPassword, ...rest } = user.toObject();
        const accessToken = createAccessToken(user._id, user.role);

        return res.status(200).json({
            message: 'Đăng nhập thành công',
            data: { ...rest, token: accessToken }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

export default authController;


