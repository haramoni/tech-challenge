"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

interface Props {
  locales: readonly string[];
  labels: Record<string, string>;
}

export function LocaleSwitcherSelect({ locales, labels }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <select
      value={locale}
      disabled={isPending}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-xs text-muted hover:text-foreground border border-outline/50 rounded-lg px-2 py-1 cursor-pointer transition-colors"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {labels[locale]}
        </option>
      ))}
    </select>
  );
}
