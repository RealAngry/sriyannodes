import { Request, Response, NextFunction } from "express";
import { UserRole } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      username: string;
      role: UserRole;
    };
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ 
      success: false, 
      error: "Authentication required" 
    });
  }

  // Check if user has admin role for admin-only routes
  if (req.path.startsWith("/api/admin") && req.session.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ 
      success: false, 
      error: "Admin privileges required" 
    });
  }

  next();
}
