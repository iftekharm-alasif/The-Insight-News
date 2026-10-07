"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInPage = () => {
const router = useRouter();


const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
    });

    if (result.error) {
        toast.error(String(result.error.message), {
            id: "signin-error",
        });
        return;
    }

    toast.success("Successfully Signed In!", {
        id: "signin-success",
    });

    router.push("/");
};

const handleSocialSignIn = async (
    provider: "google" | "github"
) => {
    const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
    });

    if (result.error) {
        toast.error(String(result.error.message), {
            id: "social-signin-error",
        });
    }
};

return (
    <div className="flex justify-center px-4 py-10 sm:py-14">
        <form
            onSubmit={onSubmit}
            className="w-full max-w-md"
        >
            <div className="mb-7 text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Sign in to stay connected with The Insight.
                </p>
            </div>

            <fieldset className="bg-base-200/60 border border-base-300 rounded-2xl p-5 sm:p-7 shadow-sm">
                <div className="space-y-1.5">
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
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-neutral w-full mt-6"
                >
                    সাইন ইন
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
                        onClick={() =>
                            handleSocialSignIn("google")
                        }
                        className="btn btn-outline w-full bg-white"
                    >
                        <span className="text-lg font-bold">
                            G
                        </span>
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            handleSocialSignIn("github")
                        }
                        className="btn btn-outline w-full bg-white"
                    >
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                        </svg>
                        GitHub
                    </button>
                </div>
            </fieldset>

            <p className="text-center text-sm text-gray-500 mt-6">
                Don`t have an account?{" "}
                <a
                    href="/signup"
                    className="font-medium text-gray-900 hover:underline"
                >
                    Create one
                </a>
            </p>
        </form>
    </div>
);


};

export default SignInPage;
