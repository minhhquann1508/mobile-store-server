import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    wishlist: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;