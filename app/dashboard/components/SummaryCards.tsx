"use client";
import { Transaction } from "@/app/_types/transactionTypes";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { useTranslations, useFormatter } from "next-intl";

interface SummaryCardsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function SummaryCards({ transactions, isLoading }: SummaryCardsProps) {
  const t = useTranslations("summaryCards");
  const format = useFormatter();

  const { totalIn, totalOut, currentBalance } = useMemo(() => {
    const entries = transactions
      .filter((tx) => tx.type === "in")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const exits = transactions
      .filter((tx) => tx.type === "out")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return {
      totalIn: entries,
      totalOut: exits,
      currentBalance: entries - exits,
    };
  }, [transactions]);

  function formatCurrency(value: number) {
    return format.number(value, { style: "currency", currency: "BRL" });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 xl:gap-8 mb-10 xl:mb-12">
      <div className="md:bg-surface md:border md:border-outline/30 rounded-2xl xl:rounded-3xl md:p-8 mb-6 md:mb-0 transition-colors duration-300">
        <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
          <span className="md:hidden">{t("availableBalanceMobile")}</span>
          <span className="hidden md:inline">{t("totalBalanceDesktop")}</span>
        </h3>

        <p className="text-xl md:text-3xl xl:text-4xl font-bold">
          {isLoading ? t("loading") : formatCurrency(currentBalance)}
        </p>

        <div className="md:hidden flex items-center gap-1 text-brand text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>{t("monthlyGrowth")}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 col-span-1 md:col-span-2 gap-4 md:gap-6 xl:gap-8">
        <div className="bg-surface border border-outline/30 rounded-2xl xl:rounded-3xl p-5 md:p-7 xl:p-8 flex flex-col justify-between transition-colors duration-300 min-h-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <ArrowDown className="w-4 h-4 md:hidden text-brand" />
            <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase">
              {t("incomesThisMonth")}
            </h3>
          </div>

          <p className="text-xl md:text-3xl xl:text-4xl font-bold text-brand">
            {isLoading ? t("loading") : formatCurrency(totalIn)}
          </p>
        </div>

        <div className="bg-surface border border-outline/30 rounded-2xl xl:rounded-3xl p-5 md:p-7 xl:p-8 flex flex-col justify-between transition-colors duration-300 min-h-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <ArrowUp className="w-4 h-4 md:hidden text-alert" />
            <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase">
              {t("expensesThisMonth")}
            </h3>
          </div>

          <p className="text-xl md:text-3xl xl:text-4xl font-bold text-alert">
            {isLoading ? t("loading") : formatCurrency(totalOut)}
          </p>
        </div>
      </div>
    </div>
  );
}
