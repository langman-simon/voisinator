import jwt from "jsonwebtoken";

export const checkJWT = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Missing authorization header",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = authorization.split(" ")[1]; // split because the format is "Bearer 54644654466"

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // the format look like this: { id: 'userId', pseudo: 'mypseudo', email: 'user@example.com' }

    req.user = decoded;

    console.log("Decoded JWT:", decoded); // Log the decoded token for debugging
    console.log("Request User:", req.user); // Log the user object attached to the request for debugging

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
