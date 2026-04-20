"use client";
import { Transaction } from "@/app/_types/transactionTypes";
import { formatCurrency } from "@/app/utils/utils";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { useMemo } from "react";

interface SummaryCardsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function SummaryCards({ transactions, isLoading }: SummaryCardsProps) {
  const { totalIn, totalOut, currentBalance } = useMemo(() => {
    const entries = transactions
      .filter((t) => t.type === "in")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const exits = transactions
      .filter((t) => t.type === "out")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return {
      totalIn: entries,
      totalOut: exits,
      currentBalance: entries - exits,
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 xl:gap-8 mb-10 xl:mb-12">
      <div className="md:bg-surface md:border md:border-outline/30 rounded-2xl xl:rounded-3xl md:p-8 mb-6 md:mb-0 transition-colors duration-300">
        <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
          <span className="md:hidden">Saldo Disponível</span>
          <span className="hidden md:inline">Saldo Total</span>
        </h3>

        <p className="text-xl md:text-3xl xl:text-4xl font-bold">
          {isLoading ? "Carregando..." : formatCurrency(currentBalance)}
        </p>

        <div className="md:hidden flex items-center gap-1 text-brand text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>+ 2,4% este mês</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 col-span-1 md:col-span-2 gap-4 md:gap-6 xl:gap-8">
        <div className="bg-surface border border-outline/30 rounded-2xl xl:rounded-3xl p-5 md:p-7 xl:p-8 flex flex-col justify-between transition-colors duration-300 min-h-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <ArrowDown className="w-4 h-4 md:hidden text-brand" />
            <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase">
              Entradas (Mês)
            </h3>
          </div>

          <p className="text-xl md:text-3xl xl:text-4xl font-bold text-brand">
            {isLoading ? "Carregando..." : formatCurrency(totalIn)}
          </p>
        </div>

        <div className="bg-surface border border-outline/30 rounded-2xl xl:rounded-3xl p-5 md:p-7 xl:p-8 flex flex-col justify-between transition-colors duration-300 min-h-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <ArrowUp className="w-4 h-4 md:hidden text-alert" />
            <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase">
              Saídas (Mês)
            </h3>
          </div>

          <p className="text-xl md:text-3xl xl:text-4xl font-bold text-alert">
            {isLoading ? "Carregando..." : formatCurrency(totalOut)}
          </p>
        </div>
      </div>
    </div>
  );
}
