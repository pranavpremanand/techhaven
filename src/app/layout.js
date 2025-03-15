import { Poppins } from "next/font/google";
import "./globals.css";
import "keen-slider/keen-slider.min.css";
import Header from "@/components/Header";
import BottomTabOptions from "@/components/BottomTabOptions";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Techhaven",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
      <Header />
      <BottomTabOptions />
      <main>
        {children}
      </main>
      <Footer/>
      </body>
    </html>
  );
}
