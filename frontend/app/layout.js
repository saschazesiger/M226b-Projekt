import { Inter } from "next/font/google";
//import "./globals.css";
import "./globals.scss";

import Clock from "@/components/clock";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "M226 Projekt Janis",
  description: "A time management app made by Janis (m226).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <main className="main">
         
          <div className="container2">
          <Clock />
          <br /><br />
          <h1>M226 Timemanagement</h1>
          <br /><br />
            <div className="container">
              <div className="components">{children} </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
