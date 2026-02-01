import { Link, useLocation as useWouterLocation } from "wouter";
import { ShoppingBag, Menu, X, MapPin, ChevronDown, User, LogOut } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLocation } from "@/hooks/use-location";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationModal } from "./LocationModal";

export function Navbar() {
  const [routerLocation] = useWouterLocation();
  const { itemCount } = useCart();
  const { location, setLocation } = useLocation();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/subscriptions", label: "Plans" },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Location Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-left hover:bg-slate-50 p-2 rounded-xl transition-colors"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-slate-500">Deliver to</div>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                  {location ? (
                    <span className="max-w-[150px] truncate">{location}</span>
                  ) : (
                    "Getting location..."
                  )}
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <img src="/logo.png" alt="AuraBite" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold font-display tracking-tight text-slate-900">
                Aura<span className="text-primary">Bite</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-bold transition-colors hover:text-primary ${
                    routerLocation === link.href ? "text-primary" : "text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative p-2 rounded-full hover:bg-slate-100 transition-colors group">
                <ShoppingBag className="w-6 h-6 text-slate-900 group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </Link>

              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <div className="hidden md:flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-full">
                        {user?.profileImageUrl ? (
                          <img src={user.profileImageUrl} alt="" className="w-6 h-6 rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-slate-600" />
                        )}
                        <span className="text-sm font-medium text-slate-900 max-w-[100px] truncate">
                          {user?.firstName || "User"}
                        </span>
                      </div>
                      <button
                        onClick={() => logout()}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                  ) : (
                    <a href="/api/login">
                      <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all active:scale-95">
                        Sign In
                      </button>
                    </a>
                  )}
                </>
              )}

              <Link href="/menu">
                <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95">
                  Order Now
                </button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-2 rounded-full hover:bg-slate-100"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Mobile Location */}
                <button
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-left"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-slate-500">Deliver to</div>
                    <div className="text-sm font-bold text-slate-900">
                      {location || "Select location"}
                    </div>
                  </div>
                </button>

                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      routerLocation === link.href 
                        ? "bg-primary/10 text-primary" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {!isLoading && (
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    {isAuthenticated ? (
                      <a href="/api/logout" className="block px-4 py-3 rounded-xl text-red-600 font-medium">
                        Sign Out
                      </a>
                    ) : (
                      <a href="/api/login" className="block px-4 py-3 rounded-xl bg-slate-900 text-white text-center font-bold">
                        Sign In
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={setLocation}
      />
    </>
  );
}
