import { Poppins } from "next/font/google";
import "./globals.css";
import "keen-slider/keen-slider.min.css";
import Header from "@/components/Header";
import BottomTabOptions from "@/components/BottomTabOptions";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "@/store/Provider";
import SpinnerContextProvider from "@/components/SpinnerContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "ARK For Ease",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
      <ReduxProvider>
      <SpinnerContextProvider>
        <Header />
        <BottomTabOptions />
        <Toaster/>
        <main>
          {children}
        </main>
        <Footer/>
      </SpinnerContextProvider>
      </ReduxProvider>
      </body>
    </html>
  );
}
