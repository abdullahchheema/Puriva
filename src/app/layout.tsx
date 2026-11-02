import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransitionProvider } from "@/components/motion/PageTransition";
import { Loader } from "@/components/motion/Loader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const sans = Onest({ variable: "--f-sans", subsets: ["latin"], display: "swap" });
const display = Bricolage_Grotesque({ variable: "--f-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Puriva — Purified Drinking Water", template: "%s — Puriva" },
  description: "Puriva purified drinking water, in 1.5L, 1L, 500ml and 10L bottles. Everyday hydration, beautifully simple.",
};

export const viewport: Viewport = { themeColor: "#03112b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <PageTransitionProvider>
            <Loader />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
