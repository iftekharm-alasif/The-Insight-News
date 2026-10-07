
import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl text-center">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
                    The Insight
                </p>

                <h1 className="mt-6 text-[100px] sm:text-[140px] font-bold leading-none tracking-tight text-black">
                    404
                </h1>

                <div className="mt-5">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                        Page Not Found
                    </h2>

                    <p className="max-w-md mx-auto mt-3 text-sm sm:text-base leading-7 text-gray-500">
                        Sorry, the page you are looking for doesn`t exist or
                        may have been moved to another location.
                    </p>
                </div>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="btn btn-neutral px-8"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-12 pt-6 border-t border-base-300">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} The Insight. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;