import { v4 as uuidv4 } from 'uuid';
import {
  Plan,
  PlanType,
  InsertPlan,
  StaffMember,
  InsertStaffMember,
  Testimonial,
  InsertTestimonial,
  ServerNode,
  InsertServerNode,
  User,
  UserRole,
} from "@shared/schema";

export interface IStorage {
  // Plans
  createPlan(data: InsertPlan): Promise<Plan>;
  getAllPlans(): Promise<Plan[]>;
  getPlansByType(type: PlanType): Promise<Plan[]>;
  getPlan(id: string): Promise<Plan | undefined>;
  updatePlan(id: string, data: Partial<InsertPlan>): Promise<Plan | undefined>;
  deletePlan(id: string): Promise<boolean>;

  // Staff
  createStaff(data: InsertStaffMember): Promise<StaffMember>;
  getAllStaff(): Promise<StaffMember[]>;
  getStaff(id: string): Promise<StaffMember | undefined>;
  updateStaff(id: string, data: Partial<InsertStaffMember>): Promise<StaffMember | undefined>;
  deleteStaff(id: string): Promise<boolean>;
  updateStaffOfMonth(newStaffOfMonthId?: string): Promise<void>;

  // Testimonials
  createTestimonial(data: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;

  // Server Nodes
  createServerNode(data: InsertServerNode): Promise<ServerNode>;
  getAllServerNodes(): Promise<ServerNode[]>;
  getServerNode(id: string): Promise<ServerNode | undefined>;

  // Users
  createUser(data: Partial<User>): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  validateCredentials(username: string, password: string): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private plans: Map<string, Plan>;
  private staff: Map<string, StaffMember>;
  private testimonials: Map<string, Testimonial>;
  private serverNodes: Map<string, ServerNode>;
  private users: Map<string, User>;

  constructor() {
    this.plans = new Map();
    this.staff = new Map();
    this.testimonials = new Map();
    this.serverNodes = new Map();
    this.users = new Map();

    // Add default admin user
    this.users.set("admin", {
      id: "admin",
      username: "admin",
      password: "password", // Note: In a real application, this would be hashed
      role: UserRole.ADMIN,
    });
  }

  // Plans
  async createPlan(data: InsertPlan): Promise<Plan> {
    const id = uuidv4();

    const plan: Plan = {
      id,
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      period: data.period,
      type: data.type as PlanType,
      features: data.features,
      isPopular: data.isPopular ?? false,
      isComingSoon: data.isComingSoon ?? null,
      createdAt: new Date(),
    };

    this.plans.set(id, plan);
    return plan;
  }

  async getAllPlans(): Promise<Plan[]> {
    return Array.from(this.plans.values());
  }

  async getPlansByType(type: PlanType): Promise<Plan[]> {
    return Array.from(this.plans.values()).filter(plan => plan.type === type);
  }

  async getPlan(id: string): Promise<Plan | undefined> {
    return this.plans.get(id);
  }

  async updatePlan(id: string, data: Partial<InsertPlan>): Promise<Plan | undefined> {
    const plan = this.plans.get(id);
    if (!plan) return undefined;

    const updatedPlan: Plan = {
      ...plan,
      ...data,
      type: (data.type as PlanType) || plan.type,
    };

    this.plans.set(id, updatedPlan);
    return updatedPlan;
  }

  async deletePlan(id: string): Promise<boolean> {
    return this.plans.delete(id);
  }

  // Staff
  async createStaff(data: InsertStaffMember): Promise<StaffMember> {
    const id = uuidv4();

    const staffMember: StaffMember = {
      id,
      name: data.name,
      position: data.position,
      bio: data.bio,
      avatar: data.avatar || null,
      skills: data.skills,
      isStaffOfMonth: data.isStaffOfMonth || false,
      createdAt: new Date(),
    };

    this.staff.set(id, staffMember);
    return staffMember;
  }

  async getAllStaff(): Promise<StaffMember[]> {
    return Array.from(this.staff.values());
  }

  async getStaff(id: string): Promise<StaffMember | undefined> {
    return this.staff.get(id);
  }

  async updateStaff(id: string, data: Partial<InsertStaffMember>): Promise<StaffMember | undefined> {
    const staffMember = this.staff.get(id);
    if (!staffMember) return undefined;

    const updatedStaffMember: StaffMember = {
      ...staffMember,
      ...data,
    };

    this.staff.set(id, updatedStaffMember);
    return updatedStaffMember;
  }

  async deleteStaff(id: string): Promise<boolean> {
    return this.staff.delete(id);
  }

  async updateStaffOfMonth(newStaffOfMonthId?: string): Promise<void> {
    // First, set all staff isStaffOfMonth to false
    for (const [id, staff] of this.staff.entries()) {
      if (staff.isStaffOfMonth && id !== newStaffOfMonthId) {
        await this.updateStaff(id, { isStaffOfMonth: false });
      }
    }
  }

  // Testimonials
  async createTestimonial(data: InsertTestimonial): Promise<Testimonial> {
    const id = uuidv4();

    const testimonial: Testimonial = {
      id,
      quote: data.quote,
      authorName: data.authorName,
      authorPosition: data.authorPosition,
      authorCompany: data.authorCompany,
      authorImage: data.authorImage || null,
      rating: data.rating,
      createdAt: new Date(),
    };

    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  // Server Nodes
  async createServerNode(data: InsertServerNode): Promise<ServerNode> {
    const id = uuidv4();

    const serverNode: ServerNode = {
      id,
      name: data.name,
      isOperational: data.isOperational !== undefined ? data.isOperational : true,
      cpuLoad: data.cpuLoad,
      memoryUsage: data.memoryUsage,
      networkUsage: data.networkUsage,
      lastUpdated: new Date(),
    };

    this.serverNodes.set(id, serverNode);
    return serverNode;
  }

  async getAllServerNodes(): Promise<ServerNode[]> {
    // Simulate some randomness in server metrics for demo purposes
    return Array.from(this.serverNodes.values()).map(node => ({
      ...node,
      cpuLoad: Math.floor(Math.random() * 60) + 10, // 10-70%
      memoryUsage: Math.floor(Math.random() * 50) + 25, // 25-75%
      networkUsage: Math.floor(Math.random() * 40) + 5, // 5-45%
      lastUpdated: new Date(),
    }));
  }

  async getServerNode(id: string): Promise<ServerNode | undefined> {
    return this.serverNodes.get(id);
  }

  // Users
  async createUser(data: Partial<User>): Promise<User> {
    const id = uuidv4();

    const user: User = {
      id,
      username: data.username || `user_${id.substring(0, 6)}`,
      password: data.password || "password", // Note: In a real application, this would be hashed
      role: data.role || UserRole.USER,
    };

    this.users.set(user.username, user);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.get(username);
  }

  async validateCredentials(username: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password) {
      // Note: In a real application, we would use a proper password hashing and verification
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
// Adding the following code to initialize the staff data in the constructor. Since the `initializeData` method doesn't exist, this will populate the staff upon MemStorage initialization.
(storage as any).staff.set(uuidv4(),{id: uuidv4(),name: "Sayan",position: "Founder",bio: "Leading the vision and direction of SriyanNodes.",skills: ["Leadership", "Business Strategy", "Technology"],isStaffOfMonth: false,avatar: null,createdAt: new Date()});
(storage as any).staff.set(uuidv4(),{id: uuidv4(),name: "Ace",position: "Co Founder",bio: "Co-leading SriyanNodes with expertise in operations.",skills: ["Operations", "Management", "Strategy"],isStaffOfMonth: false,avatar: null,createdAt: new Date()});
(storage as any).staff.set(uuidv4(),{id: uuidv4(),name: "M1nx",position: "Co Founder",bio: "Co-leading SriyanNodes with focus on technical innovation.",skills: ["Technical Leadership", "Innovation", "Development"],isStaffOfMonth: false,avatar: null,createdAt: new Date()});
(storage as any).staff.set(uuidv4(),{id: uuidv4(),name: "Aura",position: "Chief Of Staff",bio: "Managing staff operations and coordination.",skills: ["Team Management", "Operations", "Leadership"],isStaffOfMonth: false,avatar: null,createdAt: new Date()});
(storage as any).staff.set(uuidv4(),{id: uuidv4(),name: "Div",position: "System Administrator",bio: "Managing and maintaining system infrastructure.",skills: ["System Administration", "Infrastructure", "DevOps"],isStaffOfMonth: true,avatar: null,createdAt: new Date()});