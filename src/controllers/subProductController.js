import SubProductModel from "../models/SubProducts.js";

const subProductController = {};

subProductController.createNewSubProduct = async (req, res) => {
    try {
        const { color, price, product } = req.body;
        if (!color || !price || !product) return res.status(400).json({
            message: "Vui lòng điền đủ thông tin",
            data: null
        });

        const subProduct = await SubProductModel.create({ ...req.body });

        res.status(201).json({
            message: "Tạo mới thành công",
            data: subProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

subProductController.getSubProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) return res.status(400).json({
            message: "Không tìm thấy id sản phẩm",
            data: null
        });

        const subProduct = await SubProductModel.find({ product: productId });

        res.status(200).json({
            message: "Lấy dữ liệu thành công",
            data: subProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

subProductController.updateSubProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: "Không tìm thấy id sản phẩm",
            data: null
        });

        const subProduct = await SubProductModel
            .findByIdAndUpdate(
                id,
                { ...req.body },
                { runValidators: true, new: true }
            );

        res.status(200).json({
            message: "Cập nhật thành công",
            data: subProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

subProductController.deleteSubProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            message: "Không tìm thấy id sản phẩm",
            data: null
        });
        await SubProductModel.findByIdAndDelete(id);
        res.status(204).json({
            message: "Xóa thành công",
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

export default subProductController;