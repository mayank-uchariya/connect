"use client"

import { SignUp, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 
export default function Page() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    localStorage.removeItem("Item")
    if (isSignedIn) {
      console.log("User signed in!");
      localStorage.setItem("Item", "True")
      router.push("/");
    }
  }, [isSignedIn, router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp
        appearance={{ baseTheme: dark }}
      />
    </div>
  )
} 