"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, TrendingUp, ArrowDown, ArrowUp } from "lucide-react";
import { Transaction } from "../_types/transactionTypes";
import { TransactionModal } from "./components/TransactionModal";
import { Table } from "./components/Table";
import { DeleteTransactionModal } from "./components/DeleteTransactionModal";

export default function DashboardPage() {
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
          throw new Error("Erro ao buscar transações");
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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

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
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir transação");
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
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-5 py-6 md:px-8 md:py-10 xl:px-12 xl:py-12 relative">
        <div className="hidden md:flex justify-between items-end mb-12 xl:mb-14">
          <div>
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-2 transition-colors duration-300">
              Visão Geral
            </h2>
            <p className="text-muted text-sm md:text-base transition-colors duration-300">
              Bem-vindo de volta à sua curadoria de capital.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="bg-brand hover:bg-brand-hover text-background font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nova Transação
          </button>
        </div>

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
                formatCurrency={formatCurrency}
                handleDelete={(tx: Transaction) => handleDelete(tx)}
                handleEdit={(tx: Transaction) => handleEdit(tx)}
              />
            </div>
          </div>
        </section>

        <div className="md:hidden fixed bottom-6 left-6 right-6 z-30">
          <button
            onClick={handleCreate}
            className="w-full bg-brand hover:bg-brand-hover text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(56,162,141,0.3)] transition-colors"
          >
            <Plus className="w-6 h-6" />
            Nova Transação
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
