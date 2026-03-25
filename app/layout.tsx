import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meno - הבריאות שלך, בידיים שלך",
  description:
    "Meno - אפליקציית בריאות האישה החכמה. מעקב תסמינים, תובנות מבוססות AI, וליווי אישי בכל שלב.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
