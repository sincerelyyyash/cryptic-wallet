import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Appbar from "@/components/Appbar";
import { Toaster } from "@/components/ui/toaster";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import Footer from "@/components/Footer";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600"]
})

export const metadata: Metadata = {
  title: "Cryptic Wallet",
  description: "Web based HD crypto wallet",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="flex-none w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Appbar />
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              {children}
            </main>

            <footer className="flex-none w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              <Footer />
            </footer>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

