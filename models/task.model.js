const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: {
            type: String,
            default: "pending"
        },
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createBy: String,
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model("Task", taskSchema, "tasks")

module.exports = Task