"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";

type AuthContextData = {
  handleLogin: (email: string, password: string) => boolean;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  const handleLogin = (email: string, password: string) => {
    if (email === "admin@vault.com" && password === "admin123") {
      document.cookie = `auth_token=true; path=/; max-age=${60 * 60 * 24}`;
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  const value = useMemo(
    () => ({
      handleLogin,
      handleLogout,
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
