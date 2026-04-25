"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Wallet,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import { useAuth } from "@/app/auth/authProvider";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const t = useTranslations("login");
  const tLayout = useTranslations("layout");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ok = email === "admin@vault.com" && password === "admin123";
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    handleLogin(email, password);
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background font-sans">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 py-12 z-10">
        <header className="w-full flex flex-col items-center justify-center text-center mb-8">
          <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-xl mb-4 border border-outline shadow-sm md:hidden">
            <Wallet className="text-brand w-6 h-6" />
          </div>
          <h1 className="text-brand font-semibold text-2xl md:text-3xl tracking-tight">
            <span className="md:hidden">{tLayout("appNameMobile")}</span>
            <span className="hidden md:inline">{tLayout("appName")}</span>
          </h1>
          <p className="text-muted text-xs md:text-sm tracking-widest uppercase mt-2 font-medium">
            {t("financialManagement")}
          </p>
        </header>

        <section className="bg-surface w-full max-w-[420px] mx-auto rounded-2xl p-6 md:p-8 shadow-2xl border border-outline/30">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-1 text-foreground">
              {t("welcomeBack")}
            </h2>
            <p className="text-muted text-sm">{t("accessYourAccount")}</p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t("emailLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  value={email}
                  type="email"
                  required
                  className="w-full bg-input border border-outline rounded-lg py-3 pl-11 pr-4 text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder={t("emailPlaceholder")}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  {t("passwordLabel")}
                </label>
                <a
                  href="#"
                  className="text-brand hover:text-brand-hover text-xs font-medium transition-colors focus:outline-none focus:underline rounded-sm focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
                >
                  {t("forgotPassword")}
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  required
                  className="w-full bg-input border border-outline rounded-lg py-3 pl-11 pr-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all tracking-widest"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-alert text-sm font-medium" role="alert">
                {t("invalidCredentials")}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-brand hover:bg-brand-hover text-[#121413] font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
            >
              <span className="md:hidden">{t("submitMobile")}</span>
              <span className="hidden md:inline">{t("submitDesktop")}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline/50 text-center md:hidden">
            <p className="text-sm text-muted">
              {t("noAccount")}{" "}
              <a
                href="#"
                className="text-brand hover:text-brand-hover font-medium focus:outline-none focus:underline"
              >
                {t("createNow")}
              </a>
            </p>
          </div>
        </section>
      </div>

      <footer className="w-full p-6 text-xs text-muted font-medium uppercase tracking-wider z-10 bg-background/50 backdrop-blur-sm">
        <div className="flex justify-between w-full max-w-[420px] mx-auto md:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span className="text-left leading-tight">{t("securityBadge")}</span>
          </div>
          <div className="flex items-center gap-2">
            <LockKeyhole className="w-4 h-4" aria-hidden="true" />
            <span className="text-left leading-tight">{t("encryptionBadge")}</span>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center">
          {t("footer", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </main>
  );
}
