"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useComparison } from "@/contexts/comparison-context";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, BarChart2, User } from "lucide-react";

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { comparisonList } = useComparison();

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileMenuButton = document.getElementById("mobile-menu-button");

      if (
        mobileMenu &&
        !mobileMenu.contains(target) &&
        mobileMenuButton &&
        !mobileMenuButton.contains(target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Apply body overflow hidden when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/neighborhoods", label: "Neighborhoods" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Harmony<span className="text-accent">Estates</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    } transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User actions */}
            <div className="flex items-center space-x-4 pl-6 border-l border-border">
              {user ? (
                <>
                  <Link
                    href="/wishlist"
                    className="relative text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                    <span className="sr-only">Wishlist</span>
                  </Link>

                  <Link
                    href="/comparison"
                    className="relative text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BarChart2 className="h-5 w-5" />
                    {comparisonList.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {comparisonList.length}
                      </span>
                    )}
                    <span className="sr-only">Compare</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </>
              ) : (
                <Button asChild variant="default" size="sm">
                  <Link href="/profile">Sign In</Link>
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-button"
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-16 bg-background z-40 transition-all duration-200 ease-in-out"
        >
          <div className="container px-4 py-8">
            <nav className="flex flex-col space-y-6">
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-lg font-medium ${
                        pathname === link.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      } transition-colors`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-border">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/profile"
                      className="flex items-center text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      <User className="h-5 w-5 mr-2" />
                      My Profile
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist
                      {wishlist.length > 0 && (
                        <span className="ml-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlist.length}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/comparison"
                      className="flex items-center text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      <BarChart2 className="h-5 w-5 mr-2" />
                      Comparison
                      {comparisonList.length > 0 && (
                        <span className="ml-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {comparisonList.length}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={logout}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/profile">Sign In</Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
