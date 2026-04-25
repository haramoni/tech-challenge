"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Transaction } from "@/app/_types/transactionTypes";
import {
  DashboardHeader,
  DeleteTransactionModal,
  SummaryCards,
  TransactionModal,
  TransactionsSection,
} from "@/app/dashboard/components";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch("/api/transactions");

        if (!response.ok) {
          throw new Error(t("fetchError"));
        }

        const result = await response.json();
        setTransactions(result.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  function handleCreate() {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  }

  function handleEdit(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  }

  function handleDelete(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  }

  async function confirmDelete() {
    if (!selectedTransaction) return;

    try {
      const response = await fetch(
        `/api/transactions/${selectedTransaction.id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(t("deleteError"));
      }

      setTransactions((prev) =>
        prev.filter((tx) => tx.id !== selectedTransaction.id),
      );
      setSelectedTransaction(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans transition-colors duration-300">
      <main className="flex-1 w-full max-w-350 mx-auto px-5 py-6 md:px-8 md:py-10 xl:px-12 xl:py-12 relative">
        <DashboardHeader onCreate={handleCreate} />

        <SummaryCards isLoading={isLoading} transactions={transactions} />

        <TransactionsSection
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="md:hidden fixed bottom-6 left-6 right-6 z-30">
          <button
            onClick={handleCreate}
            className="w-full bg-brand hover:bg-brand-hover text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(56,162,141,0.3)] transition-colors"
          >
            <Plus className="w-6 h-6" />
            {t("newTransaction")}
          </button>
        </div>

        <div className="h-24 md:hidden" />
      </main>

      {isModalOpen && (
        <TransactionModal
          transaction={selectedTransaction}
          setTransactions={setTransactions}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isDeleteModalOpen && selectedTransaction && (
        <DeleteTransactionModal
          transaction={selectedTransaction}
          onConfirm={confirmDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
}
