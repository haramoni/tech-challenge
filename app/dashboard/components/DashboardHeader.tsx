import { Plus } from "lucide-react";

export function DashboardHeader({ onCreate }: { onCreate: () => void }) {
  return (
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
        onClick={onCreate}
        className="bg-brand hover:bg-brand-hover text-background font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Nova Transação
      </button>
    </div>
  );
}
