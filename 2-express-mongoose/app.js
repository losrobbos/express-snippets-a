const dotenv = require("dotenv")
const config = dotenv.config() // parse .env file and put variables into process.env
console.log(config)

const express = require('express'); // ES6 module
const animalRouter = require('./routes/animal.router');
require("./db-connect")
const app = express();

// BODY PARSER
// => parses incoming JSON body into req.body variable!
app.use( express.json() )

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// REGISTER ROUTERS
app.use("/animals", animalRouter);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
