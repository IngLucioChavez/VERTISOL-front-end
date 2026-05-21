import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}