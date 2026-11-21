import type { Metadata, Viewport } from "next";
import { direction, htmlLang } from "@/lib/presentation/i18n/config";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { iranSans } from "@/app/fonts";
import { Providers } from "@/app/providers";
import "./globals.css";

const dictionary = getDictionary();

const siteTitle = dictionary.metadata.title;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: dictionary.metadata.description,
};

// Edge-to-edge on notched phones; the mobile bars pad with safe-area insets.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={htmlLang}
      dir={direction}
      className={`${iranSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${iranSans.className} flex min-h-full flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
