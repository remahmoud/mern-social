import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useTopUsersQuery } from "app/queries/auth";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function TopUsersList() {
    const { isLoading } = useTopUsersQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const { topUsers } = useSelector((state) => state.auth);
    return (
        <Spinner condition={isLoading}>
            {topUsers && topUsers.length > 0 && (
                <ul className="border border-gray-200 rounded-lg shadow-md px-6 py-4 divide-y divide-gray-200 w-full">
                    <h2 className="py-3 text-center text-2xl font-bold">
                        Top Users
                    </h2>
                    {topUsers.map((user) => (
                        <li className="py-3" key={user._id}>
                            <Link to={`/user/profile/${user._id}`}>
                                <div className="flex items-center space-x-4">
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
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user.fullname}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                            {dayjs(user.createdAt).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                        {user.followers.length} followers
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </Spinner>
    );
}
