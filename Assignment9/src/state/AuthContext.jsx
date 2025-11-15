import React, {
  createContext, useContext, useMemo, useState, useEffect, useRef
} from "react";
import { createAPI } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const isAuthed = Boolean(token);
  const api = useMemo(() => createAPI(token), [token]);

  // Keep a single channel instance (if supported)
  const chanRef = useRef(null);
  useEffect(() => {
    if ("BroadcastChannel" in window) {
      chanRef.current = new BroadcastChannel("auth");
      chanRef.current.onmessage = (event) => {
        if (event.data?.type === "logout") setToken("");
        if (event.data?.type === "login" && event.data?.token) setToken(event.data.token);
      };
      return () => chanRef.current?.close();
    }
  }, []);

  function login(nextToken) {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
    chanRef.current?.postMessage({ type: "login", token: nextToken });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    chanRef.current?.postMessage({ type: "logout" });
  }

  // Cross-tab sync via localStorage (works everywhere)
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === "token") {
        // token removed or changed
        setToken(e.newValue || "");
      }
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = { token, isAuthed, api, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
