// load environment configuration FIRST
const dotenv = require("dotenv")
const config = dotenv.config() // parse .env file and put variables into process.env
console.log(config); // show loaded env configuration

// setup connection to mongoDB
require("./db-connect") 

// setup express API
const express = require('express');
const animalRouter = require('./routes/animal.router');
const authRouter = require("./routes/auth.router");
const { auth } = require("./middleware/auth.middleware");
const app = express();


// JSON BODY PARSER => parses incoming JSON body into req.body variable!
app.use( express.json() )

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// protected route 
// middleware "auth" is our security guard (=türsteher)
// only if user passes this guard, we will get into the route
app.get("/protected", auth, (req, res, next) => {

  res.send({
    message: "You are in the cinema! Enjoy!",
  });

})


// REGISTER ROUTERS
app.use("/auth", authRouter) // container routes login and signup
app.use("/animals", animalRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
