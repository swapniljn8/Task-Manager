const Tasks = require('../models/model_Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
//console.log('controller/tasks');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Tasks.find({})//returns all the task
    res.status(200).json({ tasks })
    //res.status(200).json({success:true,data:{task,amount:task.length}}) //we can also pass like this 
})

const createTasks = asyncWrapper(async (req, res) => {
    const tasks = await Tasks.create(req.body)
    res.status(201).json({ tasks })
})
//patch /:id
const updateTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const tasks = await Tasks.findOneAndUpdate(
        { _id: taskId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!tasks) {
        //id provided is not available.
        return next(createCustomError(`No task with id:${taskId}`,404))
        //return res.status(404).json({ msg: `No task with id:${taskId}` }) //always return the statement
    }
    return res.status(200).json(tasks)
})
//:id delete
const deleteTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const tasks = await Tasks.findOneAndDelete({ _id: taskId })
    if (!tasks) {
        //id provided is not available.
        return next(createCustomError(`No task with id:${taskId}`,404))
        //return res.status(404).json({ msg: `No task with id:${taskId}` }) //always return the statement
    }
    return res.status(200).json(tasks)
})
// /:id get
const getTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const tasks = await Tasks.findOne({ _id: taskId });
    if (!tasks) {
        //id provided is not available.
        return next(createCustomError('Not found',404))//This line returns the error object to the next function
        //return res.status(404).json({ msg: `No task with id:${taskId}` }) //always return the statement
    }
    return res.status(200).json(tasks)

})
const putUpdateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const tasks = await Tasks.findOneAndUpdate(
        { _id: taskId },
        req.body,
        { new: true, runValidators: true, overwrite: true }
    )
    if (!tasks) {
        return next(createCustomError(`No task with id:${taskId}`,404))
        //return res.status(404).json({ msg: `No task with id:${taskId}` })
    }
    return res.status(200).json(tasks)

})
module.exports = { getAllTasks, createTasks, updateTasks, deleteTasks, getTasks, putUpdateTask }