'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, LogOut, Plus, Menu, Bell, User, 
  ShoppingCart, Briefcase, Utensils, Building, 
  TrendingUp, ArrowDown, ArrowUp, Zap, X,
  Sun, Moon // Ícones de Tema adicionados
} from 'lucide-react';

// --- TIPAGENS ---
type TransactionType = 'in' | 'out';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
  iconName: string;
}

// --- DADOS MOCKADOS INICIAIS ---
const initialTransactions: Transaction[] = [
  { id: '1', title: 'Assinatura de Design Premium', category: 'Serviços Digitais', amount: 249.90, type: 'out', date: '14 Mai 2024', iconName: 'shopping' },
  { id: '2', title: 'Projeto Freelance UI/UX', category: 'Renda Extra', amount: 4500.00, type: 'in', date: '12 Mai 2024', iconName: 'briefcase' },
  { id: '3', title: 'Restaurante Gourmet Curadoria', category: 'Alimentação', amount: 380.00, type: 'out', date: '10 Mai 2024', iconName: 'utensils' },
  { id: '4', title: 'Aluguel Loft Central', category: 'Moradia', amount: 3200.00, type: 'out', date: '05 Mai 2024', iconName: 'building' },
  { id: '5', title: 'Dividendos Carteira Global', category: 'Investimentos', amount: 850.20, type: 'in', date: '02 Mai 2024', iconName: 'trending' },
];

const BASE_BALANCE = 35000;

export default function DashboardPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LÓGICA DE TEMA (UI/UX) ---
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Recupera a preferência salva ou a do sistema operacional
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // --- LÓGICA DE NEGÓCIO ---
  const { totalIn, totalOut, currentBalance } = useMemo(() => {
    const entries = transactions.filter(t => t.type === 'in').reduce((acc, curr) => acc + curr.amount, 0);
    const exits = transactions.filter(t => t.type === 'out').reduce((acc, curr) => acc + curr.amount, 0);
    return {
      totalIn: entries,
      totalOut: exits,
      currentBalance: BASE_BALANCE + entries - exits
    };
  }, [transactions]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const getIcon = (name: string) => {
    const props = { className: "w-5 h-5 text-muted" };
    switch (name) {
      case 'shopping': return <ShoppingCart {...props} />;
      case 'briefcase': return <Briefcase {...props} className="w-5 h-5 text-brand" />;
      case 'utensils': return <Utensils {...props} />;
      case 'building': return <Building {...props} />;
      case 'trending': return <TrendingUp {...props} className="w-5 h-5 text-brand" />;
      default: return <Zap {...props} />;
    }
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/');
  };

  // Previne Hydration Mismatch do Next.js enquanto decide qual ícone (sol/lua) renderizar
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* ================= HEADER MOBILE ================= */}
      <header className="md:hidden flex items-center justify-between p-6 bg-background sticky top-0 z-20 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-brand transition-colors" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-brand font-semibold text-xl tracking-tight">The Digital Vault</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Botão de Tema Mobile */}
          <button onClick={toggleTheme} className="text-muted hover:text-foreground transition-colors" aria-label="Alternar Tema">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <Bell className="w-5 h-5 text-muted hover:text-foreground transition-colors cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex flex-col w-[280px] bg-surface border-r border-outline/30 sticky top-0 h-screen p-6 z-20 transition-colors duration-300">
        <div className="mb-12">
          <h1 className="text-brand font-bold text-2xl uppercase tracking-wider leading-tight">
            The Digital<br/>Vault
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 bg-brand/10 text-brand px-4 py-3 rounded-lg font-medium transition-colors">
            <Home className="w-5 h-5" />
            Início
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </nav>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-input border border-outline flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-muted" />
            </div>
            <span className="text-sm font-medium text-foreground">Minha Conta</span>
          </div>
          
          {/* Botão de Tema Desktop */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-lg text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-colors"
            aria-label="Alternar Tema"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full relative">
        
        <div className="hidden md:flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1 transition-colors duration-300">Visão Geral</h2>
            <p className="text-muted text-sm transition-colors duration-300">Bem-vindo de volta à sua curadoria de capital.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand hover:bg-brand-hover text-[#121413] font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nova Transação
          </button>
        </div>

        {/* ================= CARDS DE RESUMO ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:bg-surface md:border md:border-outline/30 rounded-2xl md:p-6 mb-6 md:mb-0 transition-colors duration-300">
            <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
              <span className="md:hidden">Saldo Disponível</span>
              <span className="hidden md:inline">Saldo Total</span>
            </h3>
            <p className="text-4xl md:text-3xl font-bold text-foreground mb-2 transition-colors duration-300">{formatCurrency(currentBalance)}</p>
            <div className="md:hidden flex items-center gap-1 text-brand text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+ 2,4% este mês</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 col-span-1 md:col-span-2 gap-4">
            <div className="bg-surface border border-outline/30 rounded-2xl p-5 md:p-6 flex flex-col justify-between transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <ArrowDown className="w-4 h-4 md:hidden text-brand" />
                <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase">Entradas (Mês)</h3>
              </div>
              <p className="text-xl md:text-3xl font-bold text-brand">{formatCurrency(totalIn)}</p>
            </div>

            <div className="bg-surface border border-outline/30 rounded-2xl p-5 md:p-6 flex flex-col justify-between transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <ArrowUp className="w-4 h-4 md:hidden text-alert" />
                <h3 className="text-muted text-xs md:text-sm font-semibold tracking-widest uppercase">Saídas (Mês)</h3>
              </div>
              <p className="text-xl md:text-3xl font-bold text-alert">{formatCurrency(totalOut)}</p>
            </div>
          </div>
        </div>

        {/* ================= LISTA DE TRANSAÇÕES ================= */}
        <section className="bg-transparent md:bg-surface md:border md:border-outline/30 rounded-2xl md:overflow-hidden transition-colors duration-300">
          <div className="flex justify-between items-center mb-4 md:mb-0 md:p-6 md:border-b md:border-outline/30">
            <h3 className="text-lg md:text-xl font-semibold text-foreground transition-colors duration-300">
              <span className="md:hidden">Transações Recentes</span>
              <span className="hidden md:inline">Últimas Transações</span>
            </h3>
            <button className="text-brand text-sm font-medium hover:underline">Ver tudo</button>
          </div>

          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline/30 text-xs font-semibold text-muted uppercase tracking-wider transition-colors duration-300">
            <div className="col-span-6">Descrição</div>
            <div className="col-span-3 text-right">Valor</div>
            <div className="col-span-3 text-right">Data</div>
          </div>

          <ul className="space-y-3 md:space-y-0">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex md:grid md:grid-cols-12 items-center gap-4 bg-surface md:bg-transparent p-4 md:px-6 md:py-5 rounded-xl md:rounded-none md:border-b md:border-outline/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300">
                
                <div className="flex items-center gap-4 col-span-6 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-input flex items-center justify-center shrink-0 transition-colors duration-300">
                    {getIcon(tx.iconName)}
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-foreground transition-colors duration-300">{tx.title}</p>
                    <p className="text-xs text-muted mt-0.5 transition-colors duration-300">{tx.category} <span className="md:hidden">• {tx.date.split(' ')[0]} {tx.date.split(' ')[1]}</span></p>
                  </div>
                </div>

                <div className="text-right col-span-3 md:flex md:justify-end md:items-center">
                   <span className={`text-sm md:text-base font-bold whitespace-nowrap ${tx.type === 'in' ? 'text-brand' : 'text-alert'}`}>
                    {tx.type === 'in' ? '+' : '-'} {formatCurrency(tx.amount)}
                  </span>
                </div>
                
                <div className="hidden md:flex justify-end items-center col-span-3">
                  <span className="text-sm text-muted transition-colors duration-300">{tx.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FAB Mobile */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-30">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full bg-brand hover:bg-brand-hover text-[#121413] font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(56,162,141,0.3)] transition-colors"
           >
             <Plus className="w-6 h-6" />
             Nova Transação
           </button>
        </div>

        <div className="h-24 md:hidden"></div>
      </main>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <div className="bg-surface w-full max-w-md rounded-2xl border border-outline/50 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200 transition-colors duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl font-bold mb-6 text-foreground transition-colors duration-300">Adicionar Transação</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newTx: Transaction = {
                id: Math.random().toString(36).substr(2, 9),
                title: formData.get('title') as string,
                category: formData.get('category') as string,
                amount: Number(formData.get('amount')),
                type: formData.get('type') as TransactionType,
                date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' de ', ' '),
                iconName: 'zap'
              };
              setTransactions([newTx, ...transactions]);
              setIsModalOpen(false);
            }} className="space-y-4">
              
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block transition-colors duration-300">Título</label>
                <input name="title" required type="text" className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground placeholder:text-muted/60 focus:ring-2 focus:ring-brand outline-none transition-colors duration-300" placeholder="Ex: Conta de Luz" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block transition-colors duration-300">Valor (R$)</label>
                  <input name="amount" required type="number" step="0.01" className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground placeholder:text-muted/60 focus:ring-2 focus:ring-brand outline-none transition-colors duration-300" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block transition-colors duration-300">Tipo</label>
                  <select name="type" className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground focus:ring-2 focus:ring-brand outline-none appearance-none transition-colors duration-300">
                    <option value="out">Saída</option>
                    <option value="in">Entrada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block transition-colors duration-300">Categoria</label>
                <input name="category" required type="text" className="w-full bg-input border border-outline rounded-lg py-2.5 px-4 text-foreground placeholder:text-muted/60 focus:ring-2 focus:ring-brand outline-none transition-colors duration-300" placeholder="Ex: Contas Fixas" />
              </div>

              <button type="submit" className="w-full mt-4 bg-brand hover:bg-brand-hover text-[#121413] font-bold py-3 rounded-xl transition-colors">
                Salvar Registro
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}