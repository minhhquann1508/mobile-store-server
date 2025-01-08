import mongoose from "mongoose";

const SubProductSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
    },
    storage: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true });

const SubProductModel = mongoose.model('SubProduct', SubProductSchema);

export default SubProductModel;