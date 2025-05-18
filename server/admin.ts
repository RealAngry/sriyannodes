import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { authMiddleware } from "./middleware/auth";

export function initializeAdminRoutes(app: Express): void {
  // Authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ 
          success: false, 
          error: "Username and password are required" 
        });
      }

      const user = await storage.validateCredentials(username, password);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: "Invalid credentials" 
        });
      }

      // Set user in session
      if (req.session) {
        req.session.user = user;
      }

      res.json({ success: true, data: user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        success: false, 
        error: "An error occurred during login" 
      });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            error: "Failed to logout" 
          });
        }
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (req.session && req.session.user) {
      res.json({ success: true, data: req.session.user });
    } else {
      res.status(401).json({ 
        success: false, 
        error: "Not authenticated" 
      });
    }
  });

  // Admin only routes
  app.get("/api/admin/dashboard", authMiddleware, (req: Request, res: Response) => {
    // Return some dashboard statistics
    res.json({ 
      success: true, 
      data: {
        totalPlans: 0, // These would be calculated from actual data
        totalStaff: 0,
        totalServers: 0,
        uptime: "99.9%"
      } 
    });
  });
}
