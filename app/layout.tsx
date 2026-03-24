import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Kaoba — Private Residency & Capital Circle™",
  description:
    "Private residency and investor access program in Cabarete, Dominican Republic. Lifestyle memberships from $7,500.",
  openGraph: {
    title: "El Kaoba — Private Residency & Capital Circle™",
    description:
      "Own a Caribbean home base. Access opportunity. Luxury residency memberships in Cabarete, DR.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
