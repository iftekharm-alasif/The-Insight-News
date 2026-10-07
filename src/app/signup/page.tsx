"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";

const SignUpPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            callbackURL: "/",
        });

        if (error) {
            console.log("Signup error:", error);
            return;
        }

        if (data) {
            console.log("Signup successful:", data);
            window.location.href = "/";
        }
    };

    const handleSocialSignUp = async (
        provider: "google" | "github"
    ) => {
        const { error } = await authClient.signIn.social({
            provider,
            callbackURL: "/",
        });

        if (error) {
            console.log("Social signup error:", error);
        }
    };

    return (
        <div className="flex justify-center px-4 py-10 sm:py-14">
            <form onSubmit={onSubmit} className="w-full max-w-md">
                <div className="mb-7 text-center">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                        Join The Insight
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Create an account to stay connected with the latest news.
                    </p>
                </div>

                <fieldset className="bg-base-200/60 border border-base-300 rounded-2xl p-5 sm:p-7 shadow-sm">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            name="name"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="space-y-1.5 mt-4">
                        <label className="text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            name="email"
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-1.5 mt-4">
                        <label className="text-sm font-medium">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-neutral w-full mt-6"
                    >
                        Create Account
                    </button>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-base-300" />
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                            OR CONTINUE WITH
                        </span>
                        <div className="h-px flex-1 bg-base-300" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleSocialSignUp("google")}
                            className="btn btn-outline w-full bg-white"
                        >
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z" />
                                <path d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z" />
                                <path d="M6.54 13.6a5.85 5.85 0 0 1 0-3.2V7.87H3.29a9.74 9.74 0 0 0 0 8.26l3.25-2.53Z" />
                                <path d="M12 6.37c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.45 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.37l3.25 2.53C7.31 8.09 9.46 6.37 12 6.37Z" />
                            </svg>
                            Google
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocialSignUp("github")}
                            className="btn btn-outline w-full bg-white"
                        >
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </fieldset>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="font-medium text-gray-900 hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
};

export default SignUpPage;