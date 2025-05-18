import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Menu, X, ChevronDown, ServerIcon } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Minecraft Plans", path: "/minecraft-plans" },
    { name: "VPS Plans", path: "/vps-plans" },
    { name: "Discord Bot Plans", path: "/discord-bot-plans" },
    { name: "Web Hosting", path: "/web-hosting-plans" },
    { name: "Our Team", path: "/staff" },
  ];

  return (
    <header className="bg-background border-b border-muted">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading font-bold text-xl">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SriyanNodes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-zinc-300 hover:text-white font-medium ${location === "/" ? "text-white" : ""}`}>
              Home
            </Link>
            <Link href="/minecraft-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/minecraft-plans" ? "text-white" : ""}`}>
              Minecraft Hosting
            </Link>
            <Link href="/vps-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/vps-plans" ? "text-white" : ""}`}>
              VPS Hosting
            </Link>
            <Link href="/discord-bot-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/discord-bot-plans" ? "text-white" : ""}`}>
              Discord Bot Hosting
            </Link>
            <Link href="/web-hosting-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/web-hosting-plans" ? "text-white" : ""}`}>
              Web Hosting
            </Link>
            <Link href="/staff" className={`text-zinc-300 hover:text-white font-medium ${location === "/staff" ? "text-white" : ""}`}>
              Our Team
            </Link>
          </nav>

          {/* Discord Button */}
          <div className="flex items-center space-x-4">
            <Button className="bg-[#5865F2] hover:bg-[#4752c4] text-white">
              <a href="https://discord.gg/sriyannodes" target="_blank" rel="noopener noreferrer">
                Join our Discord
              </a>
            </Button>

            {/* Admin Link (hidden for most users) */}
            {user && (
              <Link href="/admin" className="text-gray-300 hover:text-white font-medium">
                Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-muted">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={`text-zinc-300 hover:text-white font-medium ${location === "/" ? "text-white" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/minecraft-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/minecraft-plans" ? "text-white" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Minecraft Hosting
              </Link>
              <Link href="/vps-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/vps-plans" ? "text-white" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                VPS Hosting
              </Link>
              <Link href="/discord-bot-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/discord-bot-plans" ? "text-white" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Discord Bot Hosting
              </Link>
              <Link href="/web-hosting-plans" className={`text-zinc-300 hover:text-white font-medium ${location === "/web-hosting-plans" ? "text-white" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Web Hosting
              </Link>
              <Link href="/staff" className={`text-zinc-300 hover:text-white font-medium ${location === "/staff" ? "text-white" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                Staff
              </Link>
              <a href="https://discord.gg/sriyannodes" 
                 className="text-zinc-300 hover:text-white font-medium flex items-center space-x-2" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 onClick={() => setMobileMenuOpen(false)}>
                <span>Discord</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;