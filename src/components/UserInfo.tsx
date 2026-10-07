"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const pathname = usePathname();

    if (pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    const initial =
        user?.name?.charAt(0).toUpperCase() ||
        user?.email?.charAt(0).toUpperCase() ||
        "?";

    return (
        <div className="absolute right-2 sm:right-4 flex items-center gap-2 sm:gap-3">
            {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* User Profile */}
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 sm:gap-3 group"
                    >
                        {/* User Name */}
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-500">
                                Welcome
                            </p>

                            <h2 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:opacity-70 transition">
                                {user.name}
                            </h2>
                        </div>

                        {/* User Avatar */}
                        {user.image ? (
                            <img 
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 group-hover:opacity-80 transition"
                            />
                        ) : (
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold group-hover:opacity-80 transition">
                                {initial}
                            </div>
                        )}
                    </Link>

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="btn btn-sm sm:btn-md btn-outline"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="btn btn-sm sm:btn-md"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="btn btn-sm sm:btn-md btn-neutral btn-outline"
                    >
                        সাইন আপ
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserInfo;