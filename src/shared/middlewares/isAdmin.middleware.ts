import { Response, NextFunction, Request } from "express";
import { DecodedToken } from "../../types/auth";

export function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authReq = req as Request & { user?: DecodedToken };

  if (!authReq.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  if (authReq.user.role !== "admin") {
    res.status(403).json({ message: "Forbidden, admin only" });
    return;
  }

  next();
}
