"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function DashboardHeader({ onCreate }: { onCreate: () => void }) {
  const t = useTranslations("dashboard");

  return (
    <div className="hidden md:flex justify-between items-end mb-12 xl:mb-14">
      <div>
        <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-2 transition-colors duration-300">
          {t("overview")}
        </h2>
        <p className="text-muted text-sm md:text-base transition-colors duration-300">
          {t("welcomeSubtitle")}
        </p>
      </div>

      <button
        onClick={onCreate}
        className="bg-brand hover:bg-brand-hover text-background font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
      >
        <Plus className="w-5 h-5" />
        {t("newTransaction")}
      </button>
    </div>
  );
}
