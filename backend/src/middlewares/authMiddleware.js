const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // const token = req.cookies.token;
  const authHeader = req.headers.authorization; // "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { authMiddleware };
