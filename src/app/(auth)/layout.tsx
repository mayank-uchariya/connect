import { ClerkProvider } from "@clerk/nextjs";
import '@/app/globals.css'

export const metadata = {
  title: "Auth",
  description: "Next 14 social media app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
