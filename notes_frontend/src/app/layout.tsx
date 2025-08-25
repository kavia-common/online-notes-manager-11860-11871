import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Notes",
  description: "Create, edit, and manage your notes online.",
  applicationName: "Online Notes",
  keywords: ["notes", "nextjs", "productivity"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
