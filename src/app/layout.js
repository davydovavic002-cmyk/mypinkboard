import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Pink Board — Our Creative Space",
  description: "Аналог Miro для заметок, рисования и сортировки идей",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased bg-pink-soft text-pink-dark`}>
        {/* Здесь рендерится контент из page.js */}
        {children}
      </body>
    </html>
  );
}
