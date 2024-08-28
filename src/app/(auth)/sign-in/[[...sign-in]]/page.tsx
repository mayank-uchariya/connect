"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white w-full max-w-lg rounded-2xl py-12 px-10 shadow-xl border border-gray-200 space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>
          <div className="flex flex-col gap-y-4">
            <Clerk.Connection
              name="google"
              className="flex items-center gap-x-3 justify-center font-medium border border-gray-300 shadow-md py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors"
            >
              <Clerk.Icon className="text-gray-700" />
              <span className="font-medium">Sign in with Google</span>
            </Clerk.Connection>
            <Clerk.Connection
              name="github"
              className="flex items-center gap-x-3 justify-center font-medium border border-gray-300 shadow-md py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors"
            >
              <Clerk.Icon className="text-gray-700" />
              <span className="font-medium">Sign in with GitHub</span>
            </Clerk.Connection>
          </div>
          <Clerk.Field name="identifier" className="space-y-4">
            <Clerk.Label className="text-sm font-medium text-gray-700">
              Email Address
            </Clerk.Label>
            <Clerk.Input className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-teal-500 text-white rounded-lg py-3 px-4 w-full hover:bg-teal-600 transition-colors"
          >
            Continue
          </SignIn.Action>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-500 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
