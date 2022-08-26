const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.auth = (req, res, next) => {
  const token = req.headers.authorization;

  // ticket (token) exists? no? kick user out!
  if (!token) {
    return res.status(401).send({
      error: "Kein Token! Kein KINO! Ganz klar! Ticket kaufen, du S***",
    });
  }

  // ticket (token) not valid? kick user out!
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({
      error: err.message,
    });
  }

  next();
};
