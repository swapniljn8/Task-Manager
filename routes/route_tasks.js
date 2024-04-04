console.log('routes/tasks');
const express = require('express')
const router = express.Router()
const {getAllTasks,createTasks,updateTasks,deleteTasks,getTasks,putUpdateTask} = require('../controller/ctrl_tasks.js')
router.route('/').get(getAllTasks).post(createTasks)//it will execute depending upon what type of request is received whether it is get or post.
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks).put(putUpdateTask)//it will execute depending upon what type of request is received whether it is get or post or patch or delete.
module.exports = router