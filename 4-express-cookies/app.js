const express = require('express'); // ES6 module
const dotenv = require("dotenv")
const config = dotenv.config() // parse .env file and put variables into process.env
const animalRouter = require('./routes/animal.router');
const userRouter = require("./routes/user.router");
require("./db-connect")
console.log(config)

const app = express();

// BODY PARSER
// => parses incoming JSON body into req.body variable!
app.use( express.json() )

app.get('/', (req, res) => {
  res.send('Hello World!');
});



// protected route
app.get("/protected", (req, res, next) => {

  const token = req.headers.authorization;

  // ticket (token) exists? no? kick user out!
  if(!token) {
    return res.status(401).send({
      error: "Kein Token! Kein KINO! Ganz klar! Ticket kaufen, du S***"
    })
  }

  // ticket (token) not valid? kick user out! 
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET)
    res.send({
      message: "You are in the cinema! Enjoy!"
    })
  }
  catch(err) {
    res.status(401).send({
      error: err.message
    });
  }
  

})


// REGISTER ROUTERS
app.use("/animals", animalRouter);
app.use("/users", userRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
