import mongoose from "mongoose";
import slugify from "slugify";

const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

BrandSchema.pre('save', async function () {
    this.slug = slugify(this.brandName, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
    });
});

const BrandModel = mongoose.model('Brand', BrandSchema);

export default BrandModel;