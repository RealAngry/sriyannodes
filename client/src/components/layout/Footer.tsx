import { Link } from "wouter";
import { ServerIcon } from "lucide-react";
import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaGithub, 
  FaDiscord 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-muted mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <ServerIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 font-heading font-bold text-xl">
                SriyanNodes
              </span>
            </div>
            <p className="text-muted-foreground mb-6 pr-12">
              Premium hosting solutions designed for performance, reliability, and scalability. 
              We provide the infrastructure you need to succeed online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaDiscord size={18} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-medium mb-4">Services</h5>
            <ul className="space-y-2">
              <li><Link href="/minecraft-plans" className="text-muted-foreground hover:text-primary transition-colors">Minecraft Hosting</Link></li>
              <li><Link href="/vps-plans" className="text-muted-foreground hover:text-primary transition-colors">VPS Hosting</Link></li>
              <li><Link href="/discord-bot-plans" className="text-muted-foreground hover:text-primary transition-colors">Discord Bot Hosting</Link></li>
              <li><Link href="/web-hosting-plans" className="text-muted-foreground hover:text-primary transition-colors">Web Hosting</Link></li>
              <li><Link href="/custom-solutions" className="text-muted-foreground hover:text-primary transition-colors">Custom Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium mb-4">Company</h5>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/staff" className="text-muted-foreground hover:text-primary transition-colors">Meet the Team</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/knowledge-base" className="text-muted-foreground hover:text-primary transition-colors">Knowledge Base</Link></li>
              <li><Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">System Status</Link></li>
              <li><Link href="/uptime" className="text-muted-foreground hover:text-primary transition-colors">Server Uptime</Link></li>
              <li><Link href="/tickets" className="text-muted-foreground hover:text-primary transition-colors">Submit a Ticket</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SriyanNodes</span>. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</Link>
            <Link href="/acceptable-use" className="text-muted-foreground hover:text-primary text-sm transition-colors">Acceptable Use Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;