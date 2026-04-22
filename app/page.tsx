"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Wallet,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import { useAuth } from "./auth/authProvider";

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <main className="min-h-screen w-full flex-1 flex items-center justify-center relative overflow-hidden bg-background font-sans">
      {/* Efeito de brilho sutil ao fundo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* WRAPPER CENTRAL: Isso garante a centralização perfeita do conteúdo principal */}
      <div className="w-full flex flex-col items-center justify-center px-6 py-12 z-10">
        {/* Header / Brand */}
        {/* Adicionado w-full e text-center para forçar o alinhamento do texto */}
        <header className="w-full flex flex-col items-center justify-center text-center mb-8">
          <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-xl mb-4 border border-outline shadow-sm md:hidden">
            <Wallet className="text-brand w-6 h-6" />
          </div>
          <h1 className="text-brand font-semibold text-2xl md:text-3xl tracking-tight">
            <span className="md:hidden">Santuário Financeiro</span>
            <span className="hidden md:inline">The Digital Vault</span>
          </h1>
          <p className="text-muted text-xs md:text-sm tracking-widest uppercase mt-2 font-medium">
            Gestão Financeira
          </p>
        </header>

        {/* Login Card */}
        {/* Adicionado mx-auto para garantir centralização absoluta do card */}
        <section className="bg-surface w-full max-w-[420px] mx-auto rounded-2xl p-6 md:p-8 shadow-2xl border border-outline/30">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-1 text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="text-muted text-sm">Acesse sua conta financeira</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault(); // Evita que a página recarregue
            const success = handleLogin(email, password);
            setError(!success); // Se o sucesso for falso, exibe o erro
          }}>
            {/* Input: E-mail */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  value={email}
                  type="email"
                  required
                  className="w-full bg-input border border-outline rounded-lg py-3 pl-11 pr-4 text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Input: Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Senha
                </label>
                <a
                  href="#"
                  className="text-brand hover:text-brand-hover text-xs font-medium transition-colors focus:outline-none focus:underline rounded-sm focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  required
                  className="w-full bg-input border border-outline rounded-lg py-3 pl-11 pr-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all tracking-widest"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-alert text-sm font-medium" role="alert">
                Credenciais inválidas. Use admin@vault.com / admin123
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-brand hover:bg-brand-hover text-[#121413] font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
            >
              <span className="md:hidden">Acessar Conta</span>
              <span className="hidden md:inline">Entrar no Site</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>

          {/* Separator & Sign Up (Mobile Focus) */}
          <div className="mt-8 pt-6 border-t border-outline/50 text-center md:hidden">
            <p className="text-sm text-muted">
              Não possui uma conta?{" "}
              <a
                href="#"
                className="text-brand hover:text-brand-hover font-medium focus:outline-none focus:underline"
              >
                Criar agora
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer / Trust Badges - Agora ele não interfere mais no centro da tela */}
      <footer className="absolute bottom-0 w-full p-6 text-xs text-muted font-medium uppercase tracking-wider z-10 bg-background/50 backdrop-blur-sm">
        {/* Mobile Footer */}
        <div className="flex justify-between w-full max-w-[420px] mx-auto md:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span className="text-left leading-tight">
              Segurança
              <br />
              Bancária
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LockKeyhole className="w-4 h-4" aria-hidden="true" />
            <span className="text-left leading-tight">
              Criptografia Ponta-a-
              <br />
              Ponta
            </span>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden md:flex justify-center items-center">
          SEGURANÇA E PRIVACIDADE • &copy; {new Date().getFullYear()} THE
          DIGITAL VAULT
        </div>
      </footer>
    </main>
  );
}
