"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  // Simulate a loading state for form submission
  const handleSubmit = async () => {
    setLoading(true);
    // Simulate a delay for loading state (replace with actual submission logic)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <SignUp.Root>
        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-xl border border-gray-200">
          <SignUp.Step name="start">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
              Create an Account
            </h1>

            <div className="flex flex-col gap-y-4 mb-6">
              <Clerk.Connection
                name="google"
                className="flex items-center gap-x-3 justify-center font-medium border border-gray-300 shadow-lg py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Clerk.Icon className="text-gray-700" />
                <span className="font-semibold">Sign up with Google</span>
              </Clerk.Connection>
              <Clerk.Connection
                name="github"
                className="flex items-center gap-x-3 justify-center font-medium border border-gray-300 shadow-lg py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Clerk.Icon className="text-gray-700" />
                <span className="font-semibold">Sign up with GitHub</span>
              </Clerk.Connection>
            </div>

            <Clerk.Field name="username" className="mb-6">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Username
              </Clerk.Label>
              <Clerk.Input className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
              <Clerk.FieldError className="text-red-500 text-sm mt-1" />
            </Clerk.Field>

            <Clerk.Field name="emailAddress" className="mb-6">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Email
              </Clerk.Label>
              <Clerk.Input className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
              <Clerk.FieldError className="text-red-500 text-sm mt-1" />
            </Clerk.Field>

            <Clerk.Field name="password" className="mb-6">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              <Clerk.FieldError className="text-red-500 text-sm mt-1" />
            </Clerk.Field>

            <SignUp.Action
              submit
              onClick={handleSubmit}
              className="bg-teal-500 text-white rounded-lg py-3 px-6 w-full hover:bg-teal-600 transition-colors"
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12a8 8 0 016-7.75V4a1 1 0 011-1h2a1 1 0 011 1v.25A8 8 0 0120 12h-2a1 1 0 01-1-1v-1.75A8 8 0 014 12z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Sign up"
              )}
            </SignUp.Action>
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </SignUp.Step>

          <SignUp.Step name="continue">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Fill in Missing Fields
            </h1>

            <Clerk.Field name="username" className="mb-6">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Username
              </Clerk.Label>
              <Clerk.Input className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
              <Clerk.FieldError className="text-red-500 text-sm mt-1" />
            </Clerk.Field>

            <SignUp.Action
              submit
              onClick={handleSubmit}
              className="bg-teal-500 text-white rounded-lg py-3 px-6 w-full hover:bg-teal-600 transition-colors"
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12a8 8 0 016-7.75V4a1 1 0 011-1h2a1 1 0 011 1v.25A8 8 0 0120 12h-2a1 1 0 01-1-1v-1.75A8 8 0 014 12z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Continue"
              )}
            </SignUp.Action>
          </SignUp.Step>

          <SignUp.Step name="verifications">
            <SignUp.Strategy name="phone_code">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Check Your Phone
              </h1>

              <Clerk.Field name="code" className="mb-6">
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Phone Code
                </Clerk.Label>
                <Clerk.Input className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                <Clerk.FieldError className="text-red-500 text-sm mt-1" />
              </Clerk.Field>

              <SignUp.Action
                submit
                onClick={handleSubmit}
                className="bg-teal-500 text-white rounded-lg py-3 px-6 w-full hover:bg-teal-600 transition-colors"
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 12a8 8 0 016-7.75V4a1 1 0 011-1h2a1 1 0 011 1v.25A8 8 0 0120 12h-2a1 1 0 01-1-1v-1.75A8 8 0 014 12z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify"
                )}
              </SignUp.Action>
            </SignUp.Strategy>

            <SignUp.Strategy name="email_code">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Check Your Email
              </h1>

              <Clerk.Field name="code" className="mb-6">
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Email Code
                </Clerk.Label>
                <Clerk.Input className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                <Clerk.FieldError className="text-red-500 text-sm mt-1" />
              </Clerk.Field>

              <SignUp.Action
                submit
                onClick={handleSubmit}
                className="bg-teal-500 text-white rounded-lg py-3 px-6 w-full hover:bg-teal-600 transition-colors"
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 12a8 8 0 016-7.75V4a1 1 0 011-1h2a1 1 0 011 1v.25A8 8 0 0120 12h-2a1 1 0 01-1-1v-1.75A8 8 0 014 12z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify"
                )}
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
        </div>
      </SignUp.Root>
    </div>
  );
}
