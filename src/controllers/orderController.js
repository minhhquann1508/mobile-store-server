import OrderModel from "../models/Order.js";

const orderController = {};

orderController.createNewOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const order = await OrderModel.create({ user: userId, ...req.body });
        const newOrder = await OrderModel
            .findById(order._id)
            .populate('products.product', 'productName')
            .populate('products.subProduct', 'color price');
        return res.status(201).json({
            message: 'Tạo đơn hàng thành công',
            data: newOrder
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

orderController.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.user;
        const orders = await OrderModel
            .find({ user: userId })
            .populate('products.product', 'productName')
            .populate('products.subProduct', 'color price');
        return res.status(200).json({
            message: 'Lấy danh sách đơn hàng thành công',
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

orderController.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id);
        if (!order) return res.status(404).json({
            message: 'Không tìm thấy đơn hàng',
            data: null
        });
        return res.status(200).json({
            message: 'Lấy đơn hàng thành công',
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

orderController.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus, deliveryStatus } = req.body;
        const order = await OrderModel.findByIdAndUpdate(id, { orderStatus, deliveryStatus }, { new: true });
        if (!order) return res.status(404).json({
            message: 'Không tìm thấy đơn hàng',
            data: null
        });
        return res.status(200).json({
            message: 'Cập nhật trạng thái đơn hàng thành công',
            data: order
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

export default orderController;