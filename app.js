const express = require("express");
const tasks = require("./routes/tasks");
const app = express();
const connectDB = require('./db/connect') 
const notFound = require('./middleware/not-found')
require('dotenv').config()

//middleware 
app.use(express.static('./public'))
app.use(express.json());

//routes


app.use("/api/v1/tasks", tasks);
app.use(notFound)

//app.get('/api/v1/tasks')  - get all tasks
//app.post('/api/v1/tasks') - add a task
//app.get('/api/v1/tasks/:id') - get a particular task
//app.patch('/api/v1/tasks/:id') - update a particular task
//app.delete('/api/v1/tasks/:id') - delete a particular task

const port = 3000;

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start()

