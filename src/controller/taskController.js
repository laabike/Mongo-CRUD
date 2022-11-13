const Task = require('../model/Task');

//create tasks
exports.createTask = async (req, res) => {
    try {
        let task = await req.body;
        let created = await Task.create(task);
        if (!created) 
            return res.status(400).json({
                success: false,
                message: "Task creation failed."
            })
        return res.status(201).json({
            success: true,
            message: "Task successfully created.",
            task: created
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        });  
    }
    };
    
//get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        let tasks = await Task.find();
        if(tasks.length === 0)
            return res.status(404).json({
                success: false,
                message:"No Task found.",
            })
        res.status(200).json({
            success: true,
            message: "All Tasks Found!",
            tasks,
            count: tasks.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

//get a single task
exports.getTask = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let task = await Task.findOne(id);
        if (!task) 
            return res.status(404).json({
                success: false,
                message: "Task not found."
            })
        res.status(200).json({
            success: true,
            message: "Task found.", 
            task,
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

//update tasks
exports.updateTask = async (req, res) => {
   try {
    let id = { _id: req.params.id}
    let task = await req.body;
    let update = await Task.findOneAndUpdate(id, task, {new: true});

    if (!update)
        return res.status(400).json ({
            success: false,
            message: "Task not updated.",
        });
    return res.status(200).json({
        success: true,
        message: "Task has been successfully updated.", 
        task: update,
    })
   } 
   catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal Server Error.",
        error: error.message
    })
   }
}

//delete tasks
exports.deleteTask = async (req, res) => {
    try {
        let id = {_id: req.params.id}
        let deleted = await Task.findOneAndRemove(id);
        if (!deleted)
            return res.status(400).json ({
                success: false,
                message: "Failed to delete task.",
            });
        return res.status(400).json ({
            success: true,
            message: "Task has been successfully deleted."
        })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}