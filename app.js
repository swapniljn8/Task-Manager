const express = require('express')
const app = express()
const tasks = require('./routes/route_tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
// const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//middleware
app.use(express.static('./public'))

app.use(express.json())
app.get('/hello', (req,res) => {
    res.send('Task manager app')
})
app.use('/api/v1/tasks',tasks)
//app.use(notFound) //order of statement is important, it should be at bottom. it will handle all the 404 request of which there is no route present
app.use(errorHandlerMiddleware)//apart from un-identified URL if there comes any error it will be handled by this file.

const port = process.env.PORT || 3000 //in general we should use the port that is available in environment so rather then hardcoding the PORT we will fetch the port from env then assign it to that port

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('CONNECTED TO DB....');
        app.listen(port, console.log(`Server is listening port ${port}...`))
    }
    catch(error) {
        console.log(error);
    }
}
start()

  
