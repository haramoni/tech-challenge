import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/app/auth/authProvider";
import { ThemeProvider } from "@/app/theme/themeProvider";
import { Sidebar } from "@/app/_components/layout/sidebar";
import { HeaderMobile } from "@/app/_components/layout/headerMobile";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Digital Vault",
  description: "Financial management dashboard",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ThemeProvider>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <body className="flex flex-col md:flex-row">
              <HeaderMobile />
              <Sidebar />
              {children}
            </body>
          </AuthProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </html>
  );
}
