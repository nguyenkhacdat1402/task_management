const User = require("../../models/user.model")
const Task = require("../../models/task.model")

const jwt = require("jsonwebtoken")

//[GET] /task
module.exports.home = async (req,res) => {
    try {
        const status = req.query.status
        const keyword = req.query.keyword
        const fullName = req.user.fullName


        let find = {
            deleted: false
        }

        //status
        if (status) {
            find.status = status
        }

        //search
        let objectSearch = {
            keyword: ""
        }
        if (keyword) {
            objectSearch.keyword = keyword
            const regex = new RegExp(objectSearch.keyword, "i")
            objectSearch.regex = regex
            find.title = objectSearch.regex
        }

        const pendingCount = await Task.countDocuments({status: "pending", deleted: false})
        const finishCount = await Task.countDocuments({status: "finish", deleted: false})

        const countTask = await Task.countDocuments(find)
        const objectpagination = {
            curentPages: 1,
            limitTask: 4,
        }

        if (req.query.page) {
            objectpagination.curentPages = parseInt(req.query.page)
        }


        objectpagination.skip = (objectpagination.curentPages - 1) * objectpagination.limitTask
        const totalPages = Math.ceil(countTask/objectpagination.limitTask)
        objectpagination.totalPages = totalPages


        const tasks = await Task.find(find).skip(objectpagination.skip).limit(objectpagination.limitTask).sort({createdAt: "desc"})
        res.render("client/pages/tasks/task",{
            user: req.user,
            tasks: tasks,
            keyword: objectSearch.keyword,
            pendingCount: pendingCount,
            finishCount: finishCount,
            objectpagination: objectpagination
        })
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /task/create
module.exports.create = (req,res) => {
    try {
        res.render("client/pages/tasks/create")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[POST] /task/create
module.exports.postCreate = async (req,res) => {
    try {
        const title = req.body.title
        const content = req.body.content

        const task = new Task({
            title : title,
            content: content,
            createBy: req.user.fullName
        })
        await task.save()
        
        req.flash("success", "Thêm thành công task mới")
        res.redirect("/task/create")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /task/detail
module.exports.detail = async (req,res) => {
    try {
        const id = req.params.id

        const task = await Task.findOne({_id: id})

        res.render("client/pages/tasks/detail",{
            task: task
        })
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /task/edit
module.exports.edit = async (req,res) => {
    try {
        const id = req.params.id

        const task = await Task.findOne({_id: id})
        res.render("client/pages/tasks/edit",{
            task: task
        })
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[PATCH] /task/edit
module.exports.patchEdit = async (req,res) => {
    try {
        const id = req.params.id
        const title = req.body.title
        const content = req.body.content
        
         await Task.updateOne({
            _id: id
        },{
            title: title,
            content: content,
        })

        req.flash("success", "Cập nhật task thành công")
        res.redirect(`/task/edit/${id}`)
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[PATCH] /task/delete
module.exports.delete = async (req,res) => {
    try {
        const id = req.params.id

        await Task.updateOne({
            _id: id
        },{
            deleted: true
        })

        req.flash("success", "Xóa task thành công")
        res.redirect("/task")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}

//[GET] /task/change-status
module.exports.changeStatus = async (req,res) => {
    try {
        const id = req.params.idStatus
        const status = req.params.taskStatus

        const task = await Task.updateOne({
            _id: id
        },{
            status: status
        })
        req.flash("success", "Cập nhật trạng thái thành công")
        res.redirect("/task")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}
