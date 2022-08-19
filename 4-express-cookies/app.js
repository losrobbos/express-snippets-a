const express = require('express'); // ES6 module
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const config = dotenv.config() // parse .env file and put variables into process.env
const animalRouter = require('./routes/animal.router');
const userRouter = require("./routes/user.router");
const auth = require('./middleware/auth');
require("./db-connect")
console.log(config)

const app = express();

// allow different domains (origins) to send us data

// origin => which frontend is allowed to talk to me (send me data)
// credentials => allow frontend to store & send cookies to me
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));

// BODY PARSER
// => parses incoming JSON body into req.body variable!
app.use( express.json() ) 
app.use( cookieParser()) // parses incoming cookies into req.cookies

app.get('/', (req, res) => {
  res.send('Hello World!');
});



// protected route
app.get("/protected", auth, (req, res, next) => {
  res.json({
    message: "You are in! Enjoy the party"
  })
})


// REGISTER ROUTERS
app.use("/animals", animalRouter);
app.use("/users", userRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
