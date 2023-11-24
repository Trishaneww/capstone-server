const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log(decodedPayload)
    req.token = decodedPayload;
    next();
  } catch(err) {
    return res.status(401).send("Invalid auth token");
  }
}

module.exports = authorize;