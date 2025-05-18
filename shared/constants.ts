import { v4 as uuidv4 } from 'uuid';
import { 
  PlanType, 
  InsertPlan, 
  InsertStaffMember, 
  InsertTestimonial, 
  InsertServerNode,
  IStorage 
} from '@shared/schema';

// Initial plans data
const initialPlans: InsertPlan[] = [
  {
    name: "Standard Minecraft",
    description: "Basic Minecraft server for small communities with essential plugins.",
    price: 799,
    currency: "₹",
    period: "mo",
    type: PlanType.MINECRAFT,
    features: [
      "2GB RAM",
      "10 Player Slots",
      "Basic Plugins",
      "Daily Backups",
      "DDoS Protection"
    ],
    isPopular: false,
    isComingSoon: false
  },
  {
    name: "Pro Minecraft",
    description: "Enhanced Minecraft server with more resources and premium plugins.",
    price: 1599,
    currency: "₹",
    period: "mo",
    type: PlanType.MINECRAFT,
    features: [
      "4GB RAM",
      "50 Player Slots",
      "Premium Plugins",
      "Hourly Backups",
      "DDoS Protection",
      "Custom Domain"
    ],
    isPopular: true,
    isComingSoon: false
  },
  {
    name: "Enterprise Minecraft",
    description: "High-performance Minecraft server for large communities.",
    price: 3199,
    currency: "₹",
    period: "mo",
    type: PlanType.MINECRAFT,
    features: [
      "8GB RAM",
      "Unlimited Player Slots",
      "All Plugins",
      "Real-time Backups",
      "DDoS Protection",
      "Custom Domain",
      "Priority Support"
    ],
    isPopular: false,
    isComingSoon: false
  },
  {
    name: "Basic VPS",
    description: "Entry-level VPS for personal projects and development.",
    price: 499,
    currency: "₹",
    period: "mo",
    type: PlanType.VPS,
    features: [
      "1 vCPU",
      "2GB RAM",
      "20GB SSD",
      "1TB Bandwidth",
      "Full Root Access",
      "Linux OS"
    ],
    isPopular: false,
    isComingSoon: false
  },
  {
    name: "Standard VPS",
    description: "Balanced VPS for websites and small applications.",
    price: 999,
    currency: "₹",
    period: "mo",
    type: PlanType.VPS,
    features: [
      "2 vCPU",
      "4GB RAM",
      "50GB SSD",
      "2TB Bandwidth",
      "Full Root Access",
      "Linux/Windows OS"
    ],
    isPopular: true,
    isComingSoon: false
  },
  {
    name: "Performance VPS",
    description: "High-performance VPS for demanding applications.",
    price: 2499,
    currency: "₹",
    period: "mo",
    type: PlanType.VPS,
    features: [
      "4 vCPU",
      "8GB RAM",
      "100GB SSD",
      "Unlimited Bandwidth",
      "Full Root Access",
      "Linux/Windows OS",
      "DDOS Protection"
    ],
    isPopular: true,
    isComingSoon: false
  },

  {
    name: "Basic Discord Bot",
    description: "Entry-level hosting for simple Discord bots.",
    price: 299,
    currency: "₹",
    period: "mo",
    type: PlanType.DISCORD_BOT,
    features: [
      "512MB RAM",
      "24/7 Uptime",
      "Auto-Restart",
      "Basic Monitoring",
      "Discord.js Support"
    ],
    isPopular: false,
    isComingSoon: false
  },
  {
    name: "Standard Discord Bot",
    description: "Reliable hosting for medium-sized Discord bots.",
    price: 599,
    currency: "₹",
    period: "mo",
    type: PlanType.DISCORD_BOT,
    features: [
      "1GB RAM",
      "24/7 Uptime",
      "Auto-Restart",
      "Advanced Monitoring",
      "Multiple Frameworks Support",
      "Database Integration"
    ],
    isPopular: true,
    isComingSoon: false
  },
  {
    name: "Pro Discord Bot",
    description: "Professional hosting for complex Discord bots.",
    price: 1199,
    currency: "₹",
    period: "mo",
    type: PlanType.DISCORD_BOT,
    features: [
      "2GB RAM",
      "24/7 Uptime",
      "Auto-Restart",
      "Premium Monitoring",
      "All Frameworks Support",
      "Database Integration",
      "Custom Domain",
      "Priority Support"
    ],
    isPopular: true,
    isComingSoon: false
  },

  {
    name: "Basic Web Hosting",
    description: "Simple web hosting for personal websites.",
    price: 399,
    currency: "₹",
    period: "mo",
    type: PlanType.WEB_HOSTING,
    features: [
      "1 Website",
      "10GB SSD Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "1-Click WordPress Install"
    ],
    isPopular: false,
    isComingSoon: true
  },
  {
    name: "Professional Web Hosting",
    description: "Advanced web hosting for business websites.",
    price: 799,
    currency: "₹",
    period: "mo",
    type: PlanType.WEB_HOSTING,
    features: [
      "Unlimited Websites",
      "25GB SSD Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "1-Click WordPress Install",
      "Free Domain for 1 Year"
    ],
    isPopular: true,
    isComingSoon: true
  },
  {
    name: "Enterprise Web Hosting",
    description: "Premium web hosting for high-traffic websites.",
    price: 1599,
    currency: "₹",
    period: "mo",
    type: PlanType.WEB_HOSTING,
    features: [
      "Unlimited Websites",
      "100GB SSD Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "1-Click WordPress Install",
      "Free Domain for 1 Year",
      "Free CDN",
      "Priority Support"
    ],
    isPopular: false,
    isComingSoon: true
  }
];

// Initial staff data
const initialStaff: InsertStaffMember[] = [
  {
    name: "Alex Mitchell",
    position: "Lead System Administrator",
    bio: "Alex has led our infrastructure team for over 5 years, optimizing our server performance and implementing cutting-edge security protocols. Their expertise in cloud architecture has been instrumental in achieving our 99.9% uptime guarantee.",
    skills: ["Cloud Infrastructure", "Security", "Performance Optimization"],
    isStaffOfMonth: true
  },
  {
    name: "Samantha Lee",
    position: "Customer Support Manager",
    bio: "Leading our 24/7 support team to ensure all customer inquiries are handled promptly and professionally.",
    skills: ["Customer Service", "Technical Support", "Team Management"],
    isStaffOfMonth: false
  },
  {
    name: "Marcus Johnson",
    position: "Network Engineer",
    bio: "Specializes in optimizing network performance and implementing advanced security protocols.",
    skills: ["Networking", "Security", "Infrastructure"],
    isStaffOfMonth: false
  },
  {
    name: "Elena Rodriguez",
    position: "Game Server Specialist",
    bio: "Expert in optimizing game servers for maximum performance and minimal latency across all platforms.",
    skills: ["Game Hosting", "Server Optimization", "Minecraft", "Game Mods"],
    isStaffOfMonth: false
  },
  {
    name: "David Chen",
    position: "Lead Developer",
    bio: "Full-stack developer with expertise in creating custom solutions for our hosting platform.",
    skills: ["Node.js", "React", "DevOps", "Database Design"],
    isStaffOfMonth: false
  },
  {
    name: "Priya Patel",
    position: "Chief Technology Officer",
    bio: "Oversees all technical aspects of the company and drives innovation in our hosting solutions.",
    skills: ["Strategic Planning", "Technology Leadership", "Cloud Architecture"],
    isStaffOfMonth: false
  }
];

// Initial testimonials data
const initialTestimonials: InsertTestimonial[] = [
  {
    quote: "Sriyan Nodes has been a game-changer for our business. The performance is outstanding, and the customer support team is always responsive and helpful. We've never experienced any significant downtime.",
    authorName: "Amit Sharma",
    authorPosition: "CTO",
    authorCompany: "TechStart",
    rating: 5
  },
  {
    quote: "We migrated from another provider, and the difference is night and day. The servers are lightning fast, and the control panel is intuitive. Best hosting decision we've made.",
    authorName: "Priya Patel",
    authorPosition: "Developer",
    authorCompany: "DesignCraft",
    rating: 5
  },
  {
    quote: "As a startup, finding reliable and affordable hosting was crucial. Sriyan Nodes exceeded our expectations with their Pro plan. The performance is exceptional, and scaling is a breeze.",
    authorName: "Rahul Gupta",
    authorPosition: "Founder",
    authorCompany: "CloudGear",
    rating: 5
  },
  {
    quote: "The Minecraft server hosting is top-notch. Our gaming community has grown significantly since we switched to Sriyan Nodes due to the server's reliability and performance.",
    authorName: "James Wilson",
    authorPosition: "Community Manager",
    authorCompany: "BlockCraft Gaming",
    rating: 5
  },
  {
    quote: "Our Discord bot has never run so smoothly. The automatic restart feature saved us countless headaches, and the support team is incredibly knowledgeable.",
    authorName: "Sophia Martinez",
    authorPosition: "Bot Developer",
    authorCompany: "BotHouse",
    rating: 4
  }
];

// Initial server nodes data
const initialServerNodes: InsertServerNode[] = [
  {
    name: "Mumbai Node",
    isOperational: true,
    cpuLoad: 28,
    memoryUsage: 45,
    networkUsage: 18
  },
  {
    name: "Delhi Node",
    isOperational: true,
    cpuLoad: 32,
    memoryUsage: 52,
    networkUsage: 24
  },
  {
    name: "Bangalore Node",
    isOperational: true,
    cpuLoad: 41,
    memoryUsage: 38,
    networkUsage: 33
  }
];

// Function to generate initial data
export async function generateInitialData(storage: IStorage): Promise<void> {
  // Check if we already have data
  const existingPlans = await storage.getAllPlans();
  if (existingPlans.length > 0) {
    return; // Data already exists, skip initialization
  }

  // Add plans
  for (const plan of initialPlans) {
    await storage.createPlan(plan);
  }

  // Add staff
  for (const staffMember of initialStaff) {
    await storage.createStaff(staffMember);
  }

  // Add testimonials
  for (const testimonial of initialTestimonials) {
    await storage.createTestimonial(testimonial);
  }

  // Add server nodes
  for (const serverNode of initialServerNodes) {
    await storage.createServerNode(serverNode);
  }

  console.log('Initial data generated successfully');
}
