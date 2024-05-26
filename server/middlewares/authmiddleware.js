const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authorization = req.header["authorization"];
  if (!authorization || authorization.trim() === "") {
    return res.status(400).json({
      message: "No authorization",
    });
  }

  const token = authorization.split(" ")[1];
  console.log("token from authmiddleware", token);

  try {
    const jwtdecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = jwtdecode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
