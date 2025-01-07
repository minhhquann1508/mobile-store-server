import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    backupUrl: {
        type: String,
    }
}, { timestamps: true });

const BannerModel = mongoose.model('Banner', BannerSchema);

export default BannerModel;