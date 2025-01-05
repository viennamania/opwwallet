import { Inter } from "next/font/google";
import "@/app/globals.css";

import { ThirdwebProvider } from "thirdweb/react";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>

        <ThirdwebProvider>
   
          {children}

        </ThirdwebProvider>

      </body>
    </html>
  );

}
