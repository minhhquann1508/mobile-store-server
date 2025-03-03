import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    cart: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                subProduct: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'SubProduct',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;