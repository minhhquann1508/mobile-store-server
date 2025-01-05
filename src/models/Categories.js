import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    subDesc: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true });

CategorySchema.pre('save', async function () {
    this.slug = slugify(this.categoryName, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
    });
});

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;