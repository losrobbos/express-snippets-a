const dotenv = require("dotenv")
const config = dotenv.config() // parse .env file and put variables into process.env
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
console.log(config)

const express = require('express'); // ES6 module
const animalRouter = require('./routes/animal.router');
const User = require("./models/User.model");
require("./db-connect")
const app = express();

const JWT_SECRET = process.env.JWT_SECRET

// BODY PARSER
// => parses incoming JSON body into req.body variable!
app.use( express.json() )

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post("/signup", async (req, res) => {

  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user = await User.create(req.body)
    res.json(user)
  }
  catch(err) {
    return res.status(400).json({
      error: err.message
    })
  }

})

app.post("/login", async (req, res) => {

  const { email, password } = req.body

  // GET user from "database" (fake) 
  // const user = { _id: "r123", name: "Rob" }
  const user = await User.findOne({ email })

  if(!user) {
    return res.status(400).json({
      error: "Wrong login data"
    })
  }

  if(!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      error: "Wrong login data"
    });
  }

  // Create token from user data
  const tokenData = { _id: user._id, email: user.email }
  const token = jwt.sign(tokenData, JWT_SECRET)
  
  res.send({
    token
  })
})


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


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
