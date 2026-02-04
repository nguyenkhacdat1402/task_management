const  User = require("../../models/user.model")
const Task = require("../../models/task.model")
module.exports.index = async (req,res) => {
    try {
        const statistic = {
            user:{
                total: 0,
                active: 0,
                inactive: 0
            },
            task:{
                total: 0,
                pending: 0,
                finish: 0
            },
            admin:{

            }
        }

        statistic.user.total = await User.countDocuments({
            deleted: false
        })
        statistic.user.active = await User.countDocuments({
            deleted: false,
            status: "active"
        })
        statistic.user.inactive = await User.countDocuments({
            deleted: false,
            status: "inactive"
        })

        statistic.task.total = await Task.countDocuments({
            deleted: false
        })
        statistic.task.pending = await Task.countDocuments({
            deleted: false,
            status: "pending"
        })
        statistic.task.finish = await Task.countDocuments({
            deleted: false,
            status: "finish"
        })
        res.render("admin/pages/dashboard",{
            statistic: statistic
        })
    } catch (error) {
        res.send("Lỗi hệ thống")
    }
}