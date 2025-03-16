"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }

    // Success message
    toast({
      title: "Subscribed!",
      description: "You've been successfully subscribed to our newsletter.",
    });

    // Reset form
    setEmail("");
  };

  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="max-w-4xl mx-auto mb-16 bg-zinc-800/50 rounded-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-zinc-400">
              Stay updated with our latest properties and real estate news
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 flex-1"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 sm:w-auto w-full">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Harmony Estates</h4>
            <p className="text-zinc-400 mb-6">
              We specialize in helping you find your dream home with advanced search tools and expert guidance for a seamless real estate experience.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/properties", label: "Properties" },
                { href: "/neighborhoods", label: "Neighborhoods" },
                { href: "/comparison", label: "Compare Properties" },
                { href: "/wishlist", label: "Your Wishlist" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white hover:underline transition-colors inline-flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Property Types</h4>
            <ul className="space-y-3">
              {[
                { href: "/properties?type=houses", label: "Houses" },
                { href: "/properties?type=condos", label: "Condos" },
                { href: "/properties?type=apartments", label: "Apartments" },
                { href: "/properties?type=townhomes", label: "Townhomes" },
                { href: "/properties?type=luxury", label: "Luxury Homes" },
                { href: "/properties?type=vacation", label: "Vacation Homes" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white hover:underline transition-colors inline-flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-accent" />
                <span className="text-zinc-400">
                  123 Real Estate Blvd<br />
                  Denver, CO 80000
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent" />
                <a
                  href="tel:+1234567890"
                  className="text-zinc-400 hover:text-white hover:underline transition-colors"
                >
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <a
                  href="mailto:info@harmonyrealestate.com"
                  className="text-zinc-400 hover:text-white hover:underline transition-colors"
                >
                  info@harmonyrealestate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-zinc-800 pt-8 mt-8 text-center text-zinc-500 text-sm">
          <p className="mb-4">
            © {new Date().getFullYear()} Harmony Estates. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white hover:underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white hover:underline transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white hover:underline transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
