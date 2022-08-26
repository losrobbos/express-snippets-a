const mongoose = require('mongoose')
const Todo = require('./Todo.model')
const User = require('./User.model')

const strConn = "mongodb://localhost/d04-a-db"
mongoose.connect(strConn)
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))

// insert some related data
const seed = async () => {
  
  // create user
  const user = await User.create({
    email: "los@los.com",
    password: "los123",
    username: "losrobbos"
  })

  // create todo that belongs to the user above
  const todo1 = await Todo.create({
    title: "Wake the dog",
    text: "egal egal egal",
    user: user._id
  })
  const todo2 = await Todo.create({
    title: "Do one to many relation",
    text: "egal egal egal",
    user: user._id,
  });


  // add todo to list of todos of the user
  user.todos.push(todo1._id)
  user.todos.push(todo2._id) // just adds item to todos array, but does not save it to DB yet!

  // user.todos.pull(todo._id) // removes an element from the relations array
  const userUpdated = await user.save() // store the change in the database
  console.log(userUpdated)
}

// seed()

const getUserTodos = async (userId) => {
  const user = await User.findById(userId).populate("todos")
  console.log(user)
}
// getUserTodos("63087be5f62a1973cc5d79fe");


const getTodoUser = async (todoId) => {
  const todo = await Todo.findById(todoId).populate("user")
  console.log(todo)
}
getTodoUser("63087be5f62a1973cc5d7a03");