import ProductModel from "../models/Products.js";

const productController = {};

productController.createProduct = async (req, res) => {
    try {
        const { productName, description, brand, category } = req.body;
        if (!productName || !description || !brand || !category) return res.status(400).json({
            message: 'Vui lòng thông tin sản phẩm',
            data: null
        });

        const newProduct = await ProductModel.create({ ...req.body });

        const product = await ProductModel
            .findById(newProduct._id)
            .populate('brand', 'brandName')
            .populate('category', 'categoryName');
        if (!product) return res.status(400).json({
            message: 'Tạo sản phẩm không thành công',
            data: null
        });

        res.status(201).json({
            message: 'Tạo sản phẩm thành công',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

productController.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel
            .find()
            .populate('brand', 'brandName')
            .populate('category', 'categoryName');
        res.status(200).json({
            message: 'Lấy danh sách sản phẩm thành công',
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

productController.getProductsPagination = async (req, res) => {
    try {
        const queries = { ...req.query };
        let excludeFields = ['sort', 'limit', 'page', 'fields'];
        excludeFields.forEach(field => delete queries[field]);

        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, matchedEl => `$${matchedEl}`);
        let formatQueries = JSON.parse(queryString);

        if (queries?.productName) formatQueries.productName = { $regex: queries.productName, $options: 'i' };
        let queryCommand = ProductModel.find(formatQueries);

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ') || 'createdAt';
            queryCommand = queryCommand.sort(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }

        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;

        const products = await queryCommand
            .skip(skip)
            .limit(limit)
            .populate('category', 'categoryName')
            .populate('brand', 'brandName')
            .select('-__v');

        const total = await ProductModel.countDocuments(formatQueries);

        res.status(200).json({
            message: 'Lấy danh sách sản phẩm thành công',
            data: {
                products,
                total,
                page,
                limit
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

productController.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id sản phẩm',
            data: null
        });
        const product = await ProductModel
            .findById(id)
            .populate('category', 'categoryName')
            .populate('brand', 'brandName');
        if (!product) return res.status(404).json({
            message: 'Không tìm thấy sản phẩm',
            data: null
        });
        res.status(200).json({
            message: 'Lấy sản phẩm thành công',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

productController.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id sản phẩm',
            data: null
        });
        const updatedProduct = await ProductModel
            .findByIdAndUpdate(id, { ...req.body }, { new: true })
            .populate('category', 'categoryName')
            .populate('brand', 'brandName');
        if (!updatedProduct) return res.status(400).json({
            message: 'Cập nhật sản phẩm không thành công',
            data: null
        });
        res.status(200).json({
            message: 'Cập nhật sản phẩm thành công',
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

productController.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id sản phẩm',
            data: null
        });
        const updatedProduct = await ProductModel
            .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            .populate('category', 'categoryName')
            .populate('brand', 'brandName');
        res.status(200).json({
            message: 'Xóa sản phẩm thành công',
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
}

export default productController;