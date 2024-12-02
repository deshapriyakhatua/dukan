import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import { Toaster } from 'sonner';
import { SessionProvider } from "next-auth/react"
import connectToDatabase from "@/lib/mongoose";

const montserrat = Montserrat({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat'
});

export const metadata = {
  title: "Ecommerce",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  // connect to database
  // await connectToDatabase();

  return (
    <html lang="en">
      <SessionProvider>
      <AuthProvider>
        <body className={` ${montserrat.variable}`}>
          <Suspense fallback={null}>
            <Header />
            {children}
            <Footer />
            <Toaster
              position="top-right"
              richColors={true}
              expand={true}
              closeButton={true} />
          </Suspense>
        </body>
      </AuthProvider>
      </SessionProvider>
    </html>
  );
}
