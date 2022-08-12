
const express = require('express'); // ES6 module
const animalRouter = require('./routes/animal.router');
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
