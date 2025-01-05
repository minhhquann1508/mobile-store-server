import BrandModel from "../models/Brands.js";

const brandController = {};

brandController.createNewBrand = async (req, res) => {
    try {
        const { brandName } = req.body;
        if (!brandName) return res.status(400).json({
            message: 'Vui lòng điền tên thương hiệu',
            data: null
        });

        const brand = await BrandModel.create({ ...req.body });
        res.status(201).json({
            message: 'Thêm thương hiệu thành công',
            data: brand
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

brandController.getAllBrands = async (req, res) => {
    try {
        const brands = await BrandModel.find();
        res.status(200).json({
            message: 'Lấy thương hiệu thành công',
            data: brands
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

brandController.getBrandBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) return res.status(400).json({
            message: 'Không tìm thấy slug',
            data: null
        })
        const brand = await BrandModel.findOne({ slug });
        if (!brand) return res.status(404).json({
            message: 'Không tìm thấy thương hiệu',
            data: null
        })

        res.status(200).json({
            message: 'Lấy thương hiệu thành công',
            data: brand
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

brandController.updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: 'Không tìm thấy id',
            data: null
        });
        const brand = await BrandModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!brand) return res.status(404).json({
            message: 'Cập nhật thương hiệu không thành công',
            data: null
        });

        res.status(200).json({
            message: 'Cập nhật thương hiệu thành công',
            data: brand
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

brandController.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: 'Không tìm thấy id',
            data: null
        });
        await BrandModel.findByIdAndDelete(id);
        res.status(204).json({
            message: 'Xóa thương hiệu thành công',
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

export default brandController;