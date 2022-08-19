const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

// connect to Database
mongoose.connect(DB_URL)
// then handler fires if it worked
.then(() => console.log("Connection to database established!"))
// catch handler fires if it failed and gives us the reason
.catch((err) => console.log("[ERROR] Connection failed!", err.message))

