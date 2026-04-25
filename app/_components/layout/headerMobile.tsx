"use client";

import { useTheme } from "@/app/theme/themeProvider";
import { Bell, Menu, Moon, Sun, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function HeaderMobile() {
  const { toggleTheme, theme } = useTheme();
  const t = useTranslations("header");
  const tLayout = useTranslations("layout");

  return (
    <header className="md:hidden flex items-center justify-between p-6 bg-background sticky top-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          className="text-foreground hover:text-brand transition-colors"
          aria-label={t("menuAriaLabel")}
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-brand font-semibold text-xl tracking-tight">
          {tLayout("appName")}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcher />
        <button
          onClick={toggleTheme}
          className="text-muted hover:text-foreground transition-colors"
          aria-label={t("toggleThemeAriaLabel")}
        >
          {theme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <Bell className="w-5 h-5 text-muted hover:text-foreground transition-colors cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
