import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import SessionProvider from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "Boilerplate | AD",
  description: "Boilerplate created by Alexandre Dissi",
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors position="top-right" duration={2000} />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
