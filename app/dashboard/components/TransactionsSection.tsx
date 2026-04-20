"use client";

import { Transaction } from "../../_types/transactionTypes";
import { Table } from "./Table";

interface TransactionsSectionProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionsSection({
  transactions,
  onEdit,
  onDelete,
}: TransactionsSectionProps) {
  return (
    <section className="bg-transparent md:bg-surface md:border md:border-outline/30 rounded-2xl xl:rounded-3xl md:overflow-hidden transition-colors duration-300">
      <div className="flex justify-between items-center mb-4 md:mb-0 md:px-8 md:py-7 md:border-b md:border-outline/30">
        <h3 className="text-lg md:text-2xl font-semibold text-foreground transition-colors duration-300">
          <span className="md:hidden">Transações Recentes</span>
          <span className="hidden md:inline">Últimas Transações</span>
        </h3>
      </div>

      <div className="overflow-hidden bg-surface transition-colors duration-300 rounded-2xl md:rounded-none">
        <div className="overflow-x-auto">
          <Table
            transactions={transactions}
            handleEdit={onEdit}
            handleDelete={onDelete}
          />
        </div>
      </div>
    </section>
  );
}
