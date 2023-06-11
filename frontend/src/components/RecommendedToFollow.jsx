import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
    useFollowMutation,
    useRecommendedUsersQuery,
    useUnfollowMutation,
} from "app/queries/auth";
import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function RecommendedToFollow() {
    const { isLoading } = useRecommendedUsersQuery();
    const [follow] = useFollowMutation();
    const [unfollow] = useUnfollowMutation();
    const { user: current, recommended } = useSelector((state) => state.auth);
    const handleFollow = async (id) => {
        await follow(id).unwrap();
    };
    const handleUnfollow = async (id) => {
        await unfollow(id).unwrap();
    };
    return (
        <Spinner condition={isLoading}>
            {recommended && recommended.length > 0 && (
                <ul className="border border-gray-200 rounded-lg shadow-md p-6 divide-y divide-gray-200 w-full">
                    {recommended.map((user) => (
                        <li className="py-3" key={user._id}>
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={`/user/profile/${user._id}`}
                                    className="cursor-pointer"
                                >
                                    <div className="flex-shrink-0">
                                        {user.avatar ? (
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={user.avatar}
                                                alt={user.fullname}
                                            />
                                        ) : (
                                            <UserCircleIcon className="w-10 h-10 text-gray-500" />
                                        )}
                                    </div>
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <Link
                                        to={`/user/profile/${user._id}`}
                                        className="cursor-pointer"
                                    >
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user.fullname}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                            {dayjs(user.createdAt).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </p>
                                    </Link>
                                </div>

                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {current &&
                                    current.following?.includes(user._id) ? (
                                        <button
                                            className="light__btn"
                                            onClick={() =>
                                                handleUnfollow(user._id)
                                            }
                                        >
                                            unfollow
                                        </button>
                                    ) : (
                                        <button
                                            className="light__btn"
                                            onClick={() =>
                                                handleFollow(user._id)
                                            }
                                        >
                                            follow
                                        </button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Spinner>
    );
}
