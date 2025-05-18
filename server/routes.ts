import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { initializeAdminRoutes } from "./admin";
import { authMiddleware } from "./middleware/auth";
import { PlanType } from "@shared/schema";
import { generateInitialData } from "@shared/constants";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize data if empty
  await generateInitialData(storage);

  // Plans API
  app.get("/api/plans", async (req: Request, res: Response) => {
    try {
      const type = req.query.type as PlanType | undefined;
      const plans = type 
        ? await storage.getPlansByType(type)
        : await storage.getAllPlans();
      
      res.json({ success: true, data: plans });
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ success: false, error: "Failed to fetch plans" });
    }
  });

  app.get("/api/plans/:id", async (req: Request, res: Response) => {
    try {
      const plan = await storage.getPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ success: false, error: "Plan not found" });
      }
      res.json({ success: true, data: plan });
    } catch (error) {
      console.error("Error fetching plan:", error);
      res.status(500).json({ success: false, error: "Failed to fetch plan" });
    }
  });

  app.post("/api/plans", authMiddleware, async (req: Request, res: Response) => {
    try {
      const newPlan = await storage.createPlan(req.body);
      res.status(201).json({ success: true, data: newPlan });
    } catch (error) {
      console.error("Error creating plan:", error);
      res.status(500).json({ success: false, error: "Failed to create plan" });
    }
  });

  app.put("/api/plans/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const updatedPlan = await storage.updatePlan(req.params.id, req.body);
      if (!updatedPlan) {
        return res.status(404).json({ success: false, error: "Plan not found" });
      }
      res.json({ success: true, data: updatedPlan });
    } catch (error) {
      console.error("Error updating plan:", error);
      res.status(500).json({ success: false, error: "Failed to update plan" });
    }
  });

  app.delete("/api/plans/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const success = await storage.deletePlan(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, error: "Plan not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting plan:", error);
      res.status(500).json({ success: false, error: "Failed to delete plan" });
    }
  });

  // Staff API
  app.get("/api/staff", async (req: Request, res: Response) => {
    try {
      const staff = await storage.getAllStaff();
      res.json({ success: true, data: staff });
    } catch (error) {
      console.error("Error fetching staff:", error);
      res.status(500).json({ success: false, error: "Failed to fetch staff" });
    }
  });

  app.get("/api/staff/:id", async (req: Request, res: Response) => {
    try {
      const staffMember = await storage.getStaff(req.params.id);
      if (!staffMember) {
        return res.status(404).json({ success: false, error: "Staff member not found" });
      }
      res.json({ success: true, data: staffMember });
    } catch (error) {
      console.error("Error fetching staff member:", error);
      res.status(500).json({ success: false, error: "Failed to fetch staff member" });
    }
  });

  app.post("/api/staff", authMiddleware, async (req: Request, res: Response) => {
    try {
      // If this staff is the Staff of the Month, update any existing Staff of the Month
      if (req.body.isStaffOfMonth) {
        await storage.updateStaffOfMonth();
      }
      
      const newStaff = await storage.createStaff(req.body);
      res.status(201).json({ success: true, data: newStaff });
    } catch (error) {
      console.error("Error creating staff member:", error);
      res.status(500).json({ success: false, error: "Failed to create staff member" });
    }
  });

  app.put("/api/staff/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      // If this staff is now the Staff of the Month, update any existing Staff of the Month
      if (req.body.isStaffOfMonth) {
        await storage.updateStaffOfMonth(req.params.id);
      }
      
      const updatedStaff = await storage.updateStaff(req.params.id, req.body);
      if (!updatedStaff) {
        return res.status(404).json({ success: false, error: "Staff member not found" });
      }
      res.json({ success: true, data: updatedStaff });
    } catch (error) {
      console.error("Error updating staff member:", error);
      res.status(500).json({ success: false, error: "Failed to update staff member" });
    }
  });

  app.delete("/api/staff/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteStaff(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, error: "Staff member not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting staff member:", error);
      res.status(500).json({ success: false, error: "Failed to delete staff member" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json({ success: true, data: testimonials });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ success: false, error: "Failed to fetch testimonials" });
    }
  });

  // Server Status API
  app.get("/api/server-status", async (req: Request, res: Response) => {
    try {
      const serverStatus = await storage.getAllServerNodes();
      res.json({ success: true, data: serverStatus });
    } catch (error) {
      console.error("Error fetching server status:", error);
      res.status(500).json({ success: false, error: "Failed to fetch server status" });
    }
  });

  // Initialize admin routes
  initializeAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
