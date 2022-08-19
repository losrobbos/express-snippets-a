// JWT secret => used to CREATE and CHECK tokens
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// check incoming cookies for a valid token
const auth = (req, res, next) => {
  // read token from incoming cookie
  const token = req.cookies.token;
  console.log(token);

  // ticket (token) exists? no? kick user out!
  if (!token) {
    return res.status(401).send({
      error: "Kein Token! Kein KINO! Ganz klar! Ticket kaufen, du S***",
    });
  }

  // ticket (token) not valid? kick user out!
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    next(); // forward user to "next gate"
  } catch (err) {
    res.status(401).send({
      error: err.message,
    });
  }
};

module.exports = auth;
