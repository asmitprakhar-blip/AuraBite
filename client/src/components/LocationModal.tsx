import { useState, useEffect } from "react";
import { X, MapPin, Navigation, Home, Briefcase, ChevronRight, Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavedAddress {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  address: string;
  isDefault?: boolean;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

export function LocationModal({ isOpen, onClose, onSelectLocation }: LocationModalProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    { id: "1", type: "home", label: "Home", address: "Add your home address", isDefault: true },
    { id: "2", type: "work", label: "Work", address: "Add your work address" },
  ]);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            onSelectLocation(address);
            setIsLocating(false);
            onClose();
          } catch (error) {
            onSelectLocation(`Location detected`);
            setIsLocating(false);
            onClose();
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLocating(false);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "work":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full md:w-[400px] md:rounded-2xl rounded-t-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Select Delivery Location</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <div className="p-4">
            <div className="relative mb-4">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search area, street, landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>

            <button
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="w-full flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors border border-primary/20 mb-6"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {isLocating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Navigation className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-primary text-sm">Use Current Location</div>
                <div className="text-xs text-slate-500">Using GPS</div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Saved Addresses
              </h3>
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => {
                    if (addr.address && !addr.address.includes("Add your")) {
                      onSelectLocation(addr.address);
                      onClose();
                    }
                  }}
                  className="w-full flex items-center gap-3 p-4 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-100"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                    {getIcon(addr.type)}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">{addr.address}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 p-4 mt-4 border-2 border-dashed border-primary/30 rounded-xl text-primary font-semibold hover:bg-primary/5 transition-colors">
              <Plus className="w-5 h-5" />
              Add New Address
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
