import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function CommentList({ comments }) {
    const [parent] = useAutoAnimate();
    return (
        <div className="flex flex-col gap-4" ref={parent}>
            <h3 className="text-3xl font-medium">Comments</h3>
            {comments?.map((comment) => (
                <div
                    key={comment._id}
                    className="p-4 border border-gray-200 rounded-lg"
                >
                    <div className="flex items-center gap-2 mb-2">
                        {comment.user.avatar ? (
                            <img
                                src={comment.user.avatar}
                                alt={comment.user.fullname}
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <UserCircleIcon className="w-8 h-8 text-gray-500" />
                        )}
                        <div className="font-medium text-sm">
                            <div className="capitalize">
                                <Link to={`/user/profile/${comment.user._id}`}>
                                    {comment.user.fullname}
                                </Link>
                            </div>
                            <div className="text-xs text-gray-500">
                                Posted in{" "}
                                {dayjs(comment.createdAt).format(
                                    "DD MMMM YYYY"
                                )}
                            </div>
                        </div>
                    </div>
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    );
}
