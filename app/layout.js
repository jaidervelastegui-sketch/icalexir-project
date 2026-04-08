import "./globals.css";

export const metadata = {
  title: "ICAL EXIR",
  description: "Streetwear brand",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}