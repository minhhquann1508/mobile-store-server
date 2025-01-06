import CommentModel from "../models/Comments.js";

const commentController = {};

commentController.createComment = async (req, res) => {
    try {
        const { content, user, product } = req.body;
        if (!content || !user || !product) return res.status(400).json({
            message: 'Vui lòng điền đầy đủ thông tin',
            data: null
        })
        const comment = await CommentModel.create({ ...req.body });
        return res.status(201).json({
            message: 'Đăng bình luận thành công',
            data: comment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

commentController.getCommentsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) return res.status(404).json({
            message: 'Không tìm thấy id sản phẩm',
            data: null
        });
        const comments = await CommentModel.find({ product: productId });
        return res.status(200).json({
            message: 'Lấy dữ liệu thành công',
            data: comments
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
};

commentController.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id bình luận',
            data: null
        });
        const comment = await CommentModel.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });
        if (!comment) return res.status(404).json({
            message: 'Cập nhật bình luận không thành công',
            data: null
        });
        return res.status(200).json({
            message: 'Cập nhật bình luận thành công',
            data: comment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

commentController.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({
            message: 'Không tìm thấy id bình luận',
            data: null
        });
        const comment = await CommentModel.findByIdAndDelete(id);
        return res.status(204).json({
            message: 'Xoá bình luận thành công',
            data: comment
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

export default commentController;