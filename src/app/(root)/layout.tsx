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
        <body>
            <main className="flex min-h-screen">
              <LeftSection />
              <div className="flex-1 flex flex-col h-[calc(110vh-5rem)] overflow-auto">
                <Navbar />
                <div className="flex-shrink">{children}</div>
                <BottomBar />
              </div>
              <RightSection />
            </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
