import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";
import BottomBar from "@/components/BottomBar";
import "../globals.css";

export const metadata = {
  title: "Connect",
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
        <body className="bg-gray-100 font-sans text-gray-900">
          <div className="flex min-h-screen">
            <LeftSection />
            <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-auto">
              <Navbar />
              <div className="flex-shrink p-4">
                {children}
              </div>
              <BottomBar />
            </main>
            <RightSection />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
