import { Transaction } from "@/app/_types/transactionTypes";
import { getIcon } from "@/app/utils/utils";
import { Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface TableProps {
  transactions: Transaction[];
  formatCurrency: (value: number) => ReactNode;
  handleEdit: (id: Transaction) => void;
  handleDelete: (e: Transaction) => void;
}

export function Table({
  transactions,
  formatCurrency,
  handleEdit,
  handleDelete,
}: TableProps) {
  return (
    <table className="w-full border-collapse">
      <thead className="hidden md:table-header-group">
        <tr className="text-xs font-semibold text-muted uppercase tracking-wider transition-colors duration-300 border-b border-outline/20">
          <th className="px-8 py-4 text-left">Descrição</th>
          <th className="px-8 py-4 text-right">Valor</th>
          <th className="px-8 py-4 text-right">Data</th>
          <th className="px-8 py-4 text-right">Config</th>
        </tr>
      </thead>

      <tbody>
        {transactions.slice().map((tx) => (
          <tr
            key={tx.id}
            className="block md:table-row mb-3 md:mb-0 rounded-xl md:rounded-none bg-surface md:bg-transparent border border-outline/10 md:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
          >
            <td className="block md:table-cell px-4 py-4 md:px-8 md:py-6 align-middle">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-input flex items-center justify-center shrink-0 transition-colors duration-300">
                  {getIcon(tx.iconName)}
                </div>

                <div>
                  <p className="text-sm md:text-base xl:text-lg font-semibold text-foreground transition-colors duration-300">
                    {tx.title}
                  </p>

                  <p className="text-xs md:text-sm text-muted mt-0.5 transition-colors duration-300">
                    {tx.category}
                    <span className="md:hidden"> • {tx.date}</span>
                  </p>
                </div>
              </div>
            </td>

            <td className="block md:table-cell px-4 pb-2 md:px-8 md:py-6 text-left md:text-right align-middle">
              <span
                className={`text-sm md:text-base xl:text-lg font-bold whitespace-nowrap ${
                  tx.type === "in" ? "text-brand" : "text-alert"
                }`}
              >
                {tx.type === "in" ? "+" : "-"} {formatCurrency(tx.amount)}
              </span>
            </td>

            <td className="hidden md:table-cell px-8 py-6 text-right align-middle">
              <span className="text-sm md:text-base text-muted transition-colors duration-300">
                {tx.date}
              </span>
            </td>

            <td className="block md:table-cell px-4 pt-2 pb-4 md:px-8 md:py-6 text-left md:text-right align-middle">
              <div className="flex md:justify-end items-center gap-2">
                <button
                  type="button"
                  className="p-2.5 rounded-lg hover:bg-input text-muted hover:text-foreground transition-colors duration-300"
                  onClick={() => handleEdit(tx)}
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  className="p-2.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors duration-300"
                  onClick={() => handleDelete(tx)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
