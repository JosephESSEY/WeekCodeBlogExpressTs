import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import env from "../../environment/env.config";
import { DecodedToken } from "../../types/auth";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) : void{
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;

    // ici on « injecte » à la volée
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
