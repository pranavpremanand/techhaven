import { Poppins } from "next/font/google";
import "../../globals.css";
import "keen-slider/keen-slider.min.css";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "@/store/Provider";
import SpinnerContextProvider from "@/components/SpinnerContext";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Admin | ARK For Ease",
  description: "",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <ReactQueryProvider>
            <SpinnerContextProvider>
              <Toaster />
              <main>{children}</main>
            </SpinnerContextProvider>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
