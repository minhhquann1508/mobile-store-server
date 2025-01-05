import CategoryModel from "../models/Categories.js";

const categoryController = {};

categoryController.createNewCategory = async (req, res) => {
    try {
        const { categoryName, subDesc } = req.body;
        if (!categoryName || !subDesc) return res.status(400).json({
            message: 'Vui lòng điền tên danh mục và mô tả',
            data: null
        });

        const category = await CategoryModel.create({ ...req.body });
        return res.status(201).json({
            message: 'Tạo danh mục thành công',
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

categoryController.getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        return res.status(200).json({
            message: 'Lấy danh sách danh mục thành công',
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

categoryController.getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) return res.status(404).json({
            message: 'Không tìm thấy slug',
            data: null
        });
        const category = await CategoryModel.findOne({ slug });
        return res.status(200).json({
            message: 'Lấy danh mục thành công',
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

categoryController.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id',
            data: null
        });
        const category = await CategoryModel
            .findByIdAndUpdate(
                id,
                { ...req.body },
                { runValidators: true, new: true }
            );
        if (!category) return res.status(400).json({
            message: 'Cập nhật danh mục không thành công',
            data: null
        });
        return res.status(200).json({
            message: 'Cập nhật danh mục thành công',
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

categoryController.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id',
            data: null
        });
        await CategoryModel.findByIdAndDelete(id);
        return res.status(204).json({
            message: 'Xóa danh mục thành công',
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

export default categoryController;