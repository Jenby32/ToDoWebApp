import express from "express";
import bodyParser from "body-parser";

//app
const app = express();
const port = 3000;

//global variables
let tasks = [];
let taskId = 0;
const pathToIndexEJS = "C:\\Users\\u29c04\\Downloads\\4.4+Band+Generator+Project\\4.4 Band Generator Project\\views\\index.ejs";

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

//start page
app.get("/", (req, res) => {
    res.render(pathToIndexEJS)
})

//submit post request - Adding Tasks
app.post("/submit", (req, res) => {
    //get the input value of the label
    const value = req.body["taskI"];

    //create a taskObj where every task gets a unique id and its corresponding value - id is important for deletion after
    const taskObj = {
        id: taskId,
        val: value
    }

    taskId++;

    //push our taskObj into tasks array
    tasks.push(taskObj)

    //render page in combination with passing the tasks array to the "frontend"
    res.render(pathToIndexEJS, {data: tasks})
})


//delete post request - Removing tasks
app.post("/delete", (req, res) => {
    // get user passed id which the user wants to delete
    const value = req.body["taskId"];
    
    //new temp array
    let newTasks = [];

    //loop through "tasks" array with "task" as the element being processed currently
    tasks.forEach(task => {
        // every array that hasn't the input id gets added to the temporary array
        if(task.id != value) {
            newTasks.push(task)
        }
    })
    //assign the new array to the global "tasks" array
    tasks = newTasks;

    //render page in combination with passing the tasks array to the "frontend"
    res.render(pathToIndexEJS, {data: tasks})
})

//port listener
app.listen(port, (req, res) => {
    //server running on port xxx
    console.log(`Server is Running. Port: ${port}`);
})