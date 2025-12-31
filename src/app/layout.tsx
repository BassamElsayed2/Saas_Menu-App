import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trezo - Tailwind Nextjs Admin Dashboard Template",
  description: "Tailwind Nextjs Admin Dashboard Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
