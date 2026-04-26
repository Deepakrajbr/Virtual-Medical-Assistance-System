import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();

  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};