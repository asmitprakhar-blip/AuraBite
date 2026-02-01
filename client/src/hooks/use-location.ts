import { useState, useEffect } from "react";

const LOCATION_KEY = "aurabite_delivery_location";

export function useLocation() {
  const [location, setLocationState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LOCATION_KEY) || "";
    }
    return "";
  });

  const setLocation = (newLocation: string) => {
    setLocationState(newLocation);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCATION_KEY, newLocation);
    }
  };

  const clearLocation = () => {
    setLocationState("");
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCATION_KEY);
    }
  };

  return { location, setLocation, clearLocation };
}
