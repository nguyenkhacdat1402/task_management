const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expiresAt: {
            type: Date,
            expires: 180
        }
    },
    {
        timestamps: true
    }
)

const Otp = mongoose.model("Otp", otpSchema, "otps")

module.exports = Otp