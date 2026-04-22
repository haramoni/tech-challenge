"use client";
import { useAuth } from "@/app/auth/authProvider";
import { useTheme } from "@/app/theme/themeProvider";
import { Home, LogOut, Moon, Sun, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { toggleTheme, theme } = useTheme();
  console.log(theme);
  const { handleLogout } = useAuth();
  const pathname = usePathname();

  // Se estiver na página de login (raiz), não renderiza a sidebar
  if (pathname === "/") return null;

  return (
    <aside className="hidden md:flex flex-col w-70 bg-surface border-r border-outline/30 sticky top-0 h-screen p-6 z-20 transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-brand font-bold text-2xl uppercase tracking-wider leading-tight">
          The Digital
          <br />
          Vault
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 bg-brand/10 text-brand px-4 py-3 rounded-lg font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Início
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </nav>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-input border border-outline flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-muted" />
          </div>
          <span className="text-sm font-medium text-foreground">
            Minha Conta
          </span>
        </div>

        {/* Botão de Tema Desktop */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-colors"
          aria-label="Alternar Tema"
        >
          {theme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
