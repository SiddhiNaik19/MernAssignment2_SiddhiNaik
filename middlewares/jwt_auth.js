const jwt = require("jsonwebtoken");
const SECRET_KEY = "NSNMNSM53235NJSBDJ23265";

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: 3600000,
    algorithm: "HS256",
  });
  return token;
}

function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token is missing ! ");
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.decodedToken = verified;
    console.log("Verified Token ", verified);
    next();
  } catch (e) {
    res.status(401).send("Invalid Token !");
  }
}
module.exports = { generateToken, verifyToken };
