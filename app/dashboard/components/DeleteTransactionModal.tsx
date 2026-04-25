"use client";

import { X, TriangleAlert } from "lucide-react";
import { Transaction } from "../../_types/transactionTypes";
import { useTranslations } from "next-intl";

interface DeleteTransactionModalProps {
  transaction: Transaction;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteTransactionModal({
  transaction,
  onConfirm,
  onClose,
}: DeleteTransactionModalProps) {
  const t = useTranslations("deleteModal");

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-surface w-full max-w-md rounded-2xl border border-outline/50 shadow-2xl p-6 relative transition-colors duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <TriangleAlert className="w-6 h-6 text-red-500" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground transition-colors duration-300">
              {t("title")}
            </h2>
            <p className="text-sm text-muted mt-1 transition-colors duration-300">
              {t("irreversible")}
            </p>
          </div>
        </div>

        <div className="bg-input/60 rounded-xl p-4 mb-6 transition-colors duration-300">
          <p className="text-sm text-muted transition-colors duration-300">
            {t("aboutToDelete")}
          </p>
          <p className="text-base font-semibold text-foreground mt-1 transition-colors duration-300">
            {transaction.title}
          </p>
          <p className="text-sm text-muted mt-1 transition-colors duration-300">
            {transaction.category} • {transaction.date}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-outline rounded-xl py-3 font-semibold text-foreground hover:bg-input transition-colors duration-300"
          >
            {t("cancel")}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition-colors duration-300"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
