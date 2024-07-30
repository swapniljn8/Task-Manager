const mongoose = require('mongoose')

//providing the schema of the DB, it will determine that DB record have two attribute 'name' and 'completed' and also value should be of provided types.
const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'must provide name'],
        trim : true,
        maxlength : [20, 'Name cannot be more than 20 characters']
    }, 
    completed:{
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Tasks',TaskSchema)
//When you call mongoose.model() on a schema, Mongoose compiles a model for you.