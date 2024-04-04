const Task = require('../models/model_Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
console.log('controller/tasks');

const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await Task.find({})
    res.status(200).json({ task })
    //res.status(200).json({success:true,data:{task,amount:task.length}}) //we can also pass like this 
})

const createTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})
//patch /:id
const updateTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate(
        { _id: taskId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!task) {
        //id provided is not available.
        return next(createCustomError(`No task with id:${taskId}`,404))
        //return res.status(404).json({ msg: `No task with id:${taskId}` }) //always return the statement
    }
    return res.status(200).json(task)
})
//:id delete
const deleteTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
        //id provided is not available.
        return next(createCustomError(`No task with id:${taskId}`,404))
        //return res.status(404).json({ msg: `No task with id:${taskId}` }) //always return the statement
    }
    return res.status(200).json(task)
})
// /:id get
const getTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
        //id provided is not available.
        return next(createCustomError('Not found',404))//This line returns the error object to the next function
        //return res.status(404).json({ msg: `No task with id:${taskId}` }) //always return the statement
    }
    return res.status(200).json(task)

})
const putUpdateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate(
        { _id: taskId },
        req.body,
        { new: true, runValidators: true, overwrite: true }
    )
    if (!task) {
        return next(createCustomError(`No task with id:${taskId}`,404))
        //return res.status(404).json({ msg: `No task with id:${taskId}` })
    }
    return res.status(200).json(task)

})
module.exports = { getAllTasks, createTasks, updateTasks, deleteTasks, getTasks, putUpdateTask }