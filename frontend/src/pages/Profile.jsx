import { useGetUserQuery } from "app/queries/auth";
import PostList from "components/PostList";
import Spinner from "components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";

export default function Profile() {
    const { id } = useParams();
    const { isLoading } = useGetUserQuery(id);
    const user = useSelector((state) => state.auth.anotherUserInfo);
    return (
        <Spinner condition={isLoading}>
            {user && (
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <aside className="basis-2/5 p-6 border border-gray-200 rounded-lg">
                        <div className="flex flex-col gap-4">
                            <p className="profile__raw">
                                First Name: <span>{user.fname}</span>
                            </p>
                            <p className="profile__raw">
                                Last Name: <span>{user.lname}</span>
                            </p>
                            <p className="profile__raw">
                                Username: <span>{user.username}</span>
                            </p>
                            <p className="profile__raw">
                                Email: <span>{user.email}</span>
                            </p>
                            <p className="profile__raw">
                                Followers: <span>{user.followers.length}</span>
                            </p>
                            <p className="profile__raw">
                                Following: <span>{user.following.length}</span>
                            </p>
                            <p className="profile__raw">
                                Posts: <span>{user.posts.length}</span>
                            </p>
                            <p className="profile__raw">
                                Verified:{" "}
                                {user.isVerified ? (
                                    <span className="bg-green-700 bg-opacity-80 text-white p-0.5 rounded-full">
                                        <CheckIcon className="w-5 h-5" />
                                    </span>
                                ) : (
                                    <span className="bg-red-500 bg-opacity-80 text-white p-0.5 rounded-full">
                                        <XMarkIcon className="w-5 h-5" />
                                    </span>
                                )}
                            </p>
                            <p className="profile__raw">
                                Activated:{" "}
                                {user.isActivated ? (
                                    <span className="bg-green-700 bg-opacity-80 text-white p-0.5 rounded-full">
                                        <CheckIcon className="w-5 h-5" />
                                    </span>
                                ) : (
                                    <span className="bg-red-500 bg-opacity-80 text-white p-0.5 rounded-full">
                                        <XMarkIcon className="w-5 h-5" />
                                    </span>
                                )}
                            </p>
                        </div>
                    </aside>
                    <main className="basis-3/5">
                        <PostList posts={user.posts} isUser />
                    </main>
                </div>
            )}
        </Spinner>
    );
}
