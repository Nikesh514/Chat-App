import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface DecodedToken {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
      // Extract the token from the Authorization header
      const token = authHeader.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;

      // Attach the user ID from the token to the request object
      req.user = { id: decoded.id };

      return next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};