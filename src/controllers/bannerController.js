import BannerModel from "../models/Banner.js";

const bannerController = {};

bannerController.createBanner = async (req, res) => {
    try {
        const banner = await BannerModel.create({ ...req.body });
        return res.status(200).json({
            message: 'Tạo banner thành công',
            data: banner
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

bannerController.getAllBanner = async (req, res) => {
    try {
        const banners = await BannerModel.find();
        return res.status(200).json({
            message: 'Lấy tất cả banner thành công',
            data: banners
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

bannerController.getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: 'Không tìm thấy id banner',
            data: null
        })
        const banner = await BannerModel.findById(id);
        if (!banner) return res.status(404).json({
            message: 'Không tìm thấy banner',
            data: null
        });
        return res.status(200).json({
            message: 'Lấy banner thành công',
            data: banner
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

bannerController.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: 'Không tìm thấy id banner',
            data: null
        })
        const banner = await BannerModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!banner) return res.status(404).json({
            message: 'Cập nhật banner không thành công',
            data: null
        });
        return res.status(200).json({
            message: 'Cập nhật banner thành công',
            data: banner
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

bannerController.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: 'Không tìm thấy id banner',
            data: null
        })
        await BannerModel.findByIdAndDelete(id);
        return res.status(204).json({
            message: 'Xóa banner thành công',
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

export default bannerController;