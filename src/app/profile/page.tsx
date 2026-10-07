"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        );
    }

    const user = session?.user;

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md text-center border border-base-300 rounded-2xl p-8 shadow-sm">
                    <div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold">
                        ?
                    </div>

                    <h1 className="text-2xl font-semibold mt-5">
                        Sign In Required
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Please sign in to access your profile.
                    </p>

                    <Link
                        href="/signin"
                        className="btn btn-neutral mt-6 px-8"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    const initial =
        user.name?.charAt(0).toUpperCase() ||
        user.email?.charAt(0).toUpperCase() ||
        "?";

    const handleEdit = () => {
        setName(user.name || "");
        setImage(user.image || "");
        setIsEditing(true);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSaving(true);

        const { error } = await authClient.updateUser({
            name,
            image,
        });

        setIsSaving(false);

        if (error) {
            toast.error(error.message || "Failed to update profile.");
            return;
        }

        toast.success("Profile updated successfully!");
        setIsEditing(false);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
            <div className="mb-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                    Account
                </p>

                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">
                    My Profile
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Manage and view your account information.
                </p>
            </div>

            <div className="border border-base-300 rounded-2xl overflow-hidden shadow-sm bg-base-100">
                <div className="bg-black text-white px-6 sm:px-8 py-7">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-20 h-20 rounded-full object-cover border-2 border-white shrink-0"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-2xl font-semibold shrink-0">
                                {initial}
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                {user.name}
                            </h2>

                            <p className="text-sm text-gray-300 mt-1 break-all">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Personal Information
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Your basic account details.
                            </p>
                        </div>

                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="btn btn-outline btn-sm"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <form
                            onSubmit={handleUpdate}
                            className="space-y-5"
                        >
                            <div>
                                <label className="text-sm font-medium">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="input input-bordered w-full mt-2"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Profile Image URL
                                </label>

                                <input
                                    type="url"
                                    value={image}
                                    onChange={(e) =>
                                        setImage(e.target.value)
                                    }
                                    className="input input-bordered w-full mt-2"
                                    placeholder="https://example.com/image.jpg"
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    Add a public image URL for your profile
                                    picture.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="btn btn-outline"
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-neutral"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="border border-base-300 rounded-xl p-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Full Name
                                </p>

                                <p className="font-medium mt-2 break-words">
                                    {user.name || "Not available"}
                                </p>
                            </div>

                            <div className="border border-base-300 rounded-xl p-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Email Address
                                </p>

                                <p className="font-medium mt-2 break-all">
                                    {user.email}
                                </p>
                            </div>

                            <div className="border border-base-300 rounded-xl p-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Email Status
                                </p>

                                <div className="mt-2">
                                    {user.emailVerified ? (
                                        <span className="inline-flex items-center gap-2 text-sm font-medium">
                                            <span className="w-2 h-2 rounded-full bg-black"></span>
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
                                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                            Not Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border border-base-300 rounded-xl p-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500">
                                    Account
                                </p>

                                <p className="font-medium mt-2">
                                    Active
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-base-300 px-6 sm:px-8 py-5 flex justify-end">
                    <Link
                        href="/"
                        className="btn btn-outline btn-sm"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;