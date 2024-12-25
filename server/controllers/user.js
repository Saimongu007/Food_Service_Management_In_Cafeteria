import { User } from "../models/User.js";


export const getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ status: "pending" }).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            users: users
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

export const approveUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is not for defined"
            })
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found!"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { status: "approved" }, { new: true })

        if (updatedUser) {
            return res.status(200).json({
                success: true,
                user: updatedUser
            })
        }
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

export const rejectUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is not for defined"
            })
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found!"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { status: "rejected" }, { new: true })

        if (updatedUser) {
            return res.status(200).json({
                success: true,
                user: updatedUser
            })
        }
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}