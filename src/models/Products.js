import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    solds: {
        type: Number,
        default: 0
    },
    isHot: {
        type: Boolean,
        default: false
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

ProductSchema.pre('save', async function () {
    this.slug = slugify(this.productName, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
    });
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;