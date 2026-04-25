"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Transaction } from "../../_types/transactionTypes";
import { useTranslations } from "next-intl";

interface TransactionModalProps {
  transaction: Transaction | null;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setIsModalOpen: (value: boolean) => void;
}

const categoryOptions = [
  { value: "Alimentação", iconName: "utensils", labelKey: "categoryFood" },
  { value: "Compras", iconName: "shopping", labelKey: "categoryShopping" },
  { value: "Trabalho", iconName: "briefcase", labelKey: "categoryWork" },
  { value: "Moradia", iconName: "building", labelKey: "categoryHousing" },
  { value: "Investimentos", iconName: "trending", labelKey: "categoryInvestments" },
  { value: "Contas", iconName: "zap", labelKey: "categoryBills" },
] as const;

function createEmptyTransaction(): Transaction {
  return {
    id: crypto.randomUUID(),
    title: "",
    category: "",
    amount: 0,
    type: "in",
    date: new Date().toLocaleDateString("pt-BR"),
    iconName: "",
  };
}

export function TransactionModal({
  transaction,
  setTransactions,
  setIsModalOpen,
}: TransactionModalProps) {
  const t = useTranslations("transactionModal");
  const [transactionData, setTransactionData] = useState<Transaction>(
    createEmptyTransaction(),
  );

  const isEditing = Boolean(transaction);

  useEffect(() => {
    if (transaction) {
      setTransactionData(transaction);
      return;
    }
    setTransactionData(createEmptyTransaction());
  }, [transaction]);

  async function handleSubmit() {
    try {
      const url = isEditing
        ? `/api/transactions/${transactionData.id}`
        : "/api/transactions";

      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error(isEditing ? t("editError") : t("saveError"));
      }

      const result = await response.json();
      const savedTransaction = result.data ?? transactionData;

      setTransactions((prev) =>
        isEditing
          ? prev.map((tx) =>
              tx.id === savedTransaction.id ? savedTransaction : tx,
            )
          : [savedTransaction, ...prev],
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-surface w-full max-w-md rounded-2xl border border-outline/50 shadow-2xl p-6 relative transition-colors duration-300">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-foreground transition-colors duration-300">
          {isEditing ? t("editTitle") : t("addTitle")}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              {t("titleLabel")}
            </label>
            <input
              required
              value={transactionData.title}
              onChange={(e) =>
                setTransactionData((prev) => ({ ...prev, title: e.target.value }))
              }
              type="text"
              className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground outline-none"
              placeholder={t("titlePlaceholder")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                {t("amountLabel")}
              </label>
              <input
                required
                value={transactionData.amount}
                onChange={(e) =>
                  setTransactionData((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                }
                type="number"
                step="0.01"
                className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                {t("typeLabel")}
              </label>
              <select
                value={transactionData.type}
                onChange={(e) =>
                  setTransactionData((prev) => ({
                    ...prev,
                    type: e.target.value as Transaction["type"],
                  }))
                }
                className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground outline-none"
              >
                <option value="out">{t("typeOut")}</option>
                <option value="in">{t("typeIn")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              {t("categoryLabel")}
            </label>
            <select
              required
              value={transactionData.category}
              onChange={(e) => {
                const selected = categoryOptions.find(
                  (item) => item.value === e.target.value,
                );
                setTransactionData((prev) => ({
                  ...prev,
                  category: e.target.value,
                  iconName: selected?.iconName ?? "",
                }));
              }}
              className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground outline-none"
            >
              <option value="">{t("categoryPlaceholder")}</option>
              {categoryOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {t(item.labelKey)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-brand hover:bg-brand-hover text-background font-bold py-3 rounded-xl transition-colors"
          >
            {isEditing ? t("saveEdit") : t("saveNew")}
          </button>
        </form>
      </div>
    </div>
  );
}
