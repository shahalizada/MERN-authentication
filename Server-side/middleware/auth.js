const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
  try {
    const token = req.header("user-token");
    if(!token){
        return res.status(401).json({msg : "No token is given, access denied!"});
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET3);
    if(!verified){
        return res.status(401).json("Invalid token verification, access denied!");
    }
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;

