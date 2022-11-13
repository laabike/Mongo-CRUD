const router = require('express').Router();
const controller = require('../controller/taskController')


router
.get('/', controller.getAllTasks)
.get("/:id", controller.getTask)
.post("/", controller.createTask)
.put("/:id", controller.updateTask)
.delete("/:id", controller.deleteTask)

module.exports = router;