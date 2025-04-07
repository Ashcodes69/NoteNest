const jwt = require("jsonwebtoken");

const JWT_SECRET = "you are a rockstar"; // i have to remove thsis

const fetchUser = (req, res, next) => {
  // Get the user from the JWT token and add id to req object

  const token = req.header("auth-token");
  
  //sending bad request if token is incurrect
  if (!token) {
    res
      .status(401)
      .send({ error: "please authenticate using a valid password" });
  }
  try {
    //sending data after verifing the token

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "please authenticate using a valid password" });
  }
};

module.exports = fetchUser;
