"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  refreshAuth: () => {},
});

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  const refreshAuth = useCallback(() => {
    if (typeof window === "undefined") return;
    setLoggedIn(Boolean(localStorage.getItem("token")));
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [pathname, refreshAuth]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
