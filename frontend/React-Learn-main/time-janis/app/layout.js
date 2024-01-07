import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Janis Time Management",
  description: "A time management app made by Janis (m226).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <main className="main">
          <div className="container">
            <div className="components">
            {children}{" "}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
