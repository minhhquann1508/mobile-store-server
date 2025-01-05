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
}

export default brandController;