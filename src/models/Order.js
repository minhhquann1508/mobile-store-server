import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubProduct",
                required: true
            }
        }],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "Phải có tối thiểu 1 sản phẩm trong đơn hàng"
        }
    },
    total: {
        type: Number,
    },
    paymentMethods: {
        type: String,
        enum: ['cod', 'credit'],
        default: 'cod'
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending"
    },
    deliveryStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "danceled"],
        default: "pending"
    }
}, { timestamps: true });

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;