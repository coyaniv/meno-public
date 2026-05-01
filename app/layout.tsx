import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://menoapp.health"),
  title: {
    default: "Meno — אפליקציה למעקב תסמיני גיל המעבר ופרימנופאוזה",
    template: "%s · Meno",
  },
  description:
    "אפליקציה בעברית למעקב אחרי תסמיני גיל המעבר, פרימנופאוזה, מחזור, דימום, שינה, מצב רוח, תרופות ותוספים — כדי לזהות דפוסים ולהגיע מוכנה יותר לרופאה.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://menoapp.health/",
    siteName: "Meno",
    title: "Meno — אפליקציה בעברית למעקב גיל המעבר ופרימנופאוזה",
    description:
      "מעקב בעברית: גלי חום, שינה, מצב רוח, מחזור, תרופות ותוספים — תמונה ברורה לאורך זמן.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meno — מעקב גיל המעבר בעברית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meno — אפליקציה בעברית למעקב גיל המעבר",
    description:
      "מעקב בעברית: גלי חום, שינה, מצב רוח, מחזור, תרופות ותוספים — תמונה ברורה לאורך זמן.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
