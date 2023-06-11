import {
    useAddNewCommentMutation,
    useGetSinglePostQuery,
    useRemovePostMutation,
} from "app/queries/post";
import Spinner from "components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    UserCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import CommentList from "components/CommentList";
import Sidebar from "components/Sidebar";

export default function Post() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading } = useGetSinglePostQuery(id);
    const [removePost] = useRemovePostMutation();
    const [addNewComment] = useAddNewCommentMutation();
    const post = useSelector((state) => state.post.item);
    const user = useSelector((state) => state.auth.user);
    const handleCreateComment = async (e, postId) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        await addNewComment({ data, id: postId }).unwrap();
        e.target.reset();
    };
    const handleRemovePost = async (id) => {
        const res = await removePost(id).unwrap();
        if (res) {
            navigate("/");
        }
    };
    return (
        <Spinner condition={isLoading}>
            <div className="flex flex-col md:flex-row gap-4">
                <main className="basis-4/6 flex flex-col gap-4">
                    {post && (
                        <>
                            <article className="h-auto flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {post.user.avatar ? (
                                            <img
                                                src={post.user.avatar}
                                                alt={post.user.fullname}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <UserCircleIcon className="w-10 h-10 text-gray-500" />
                                        )}
                                        <div className="font-medium">
                                            <div className="capitalize">
                                                <Link
                                                    to={`/user/profile/${post.user._id}`}
                                                >
                                                    {post.user.fullname}
                                                </Link>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Posted in{" "}
                                                {dayjs(post.createdAt).format(
                                                    "DD MMMM YYYY"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {user && user._id === post.user._id && (
                                        <button
                                            onClick={() =>
                                                handleRemovePost(post._id)
                                            }
                                            className="light__btn py-1 px-3 flex flex-row items-center text-opacity-70"
                                        >
                                            <ExclamationTriangleIcon className="w-5 h-5" />{" "}
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <p className="px-1">{post.text}</p>
                                {post.comments.length > 0 && (
                                    <CommentList comments={post.comments} />
                                )}
                                <form
                                    onSubmit={(e) =>
                                        handleCreateComment(e, post._id)
                                    }
                                >
                                    <div className="w-full bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="py-2 px-4 bg-white rounded-t-lg">
                                            <label
                                                htmlFor="comment"
                                                className="sr-only"
                                            >
                                                Your comment
                                            </label>
                                            <textarea
                                                id="comment"
                                                rows="4"
                                                name="text"
                                                className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:outline-none"
                                                placeholder="Write a comment..."
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-center items-center py-2 px-3 border-t">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center py-2.5 px-12 text-xs font-medium text-center text-white bg-blue-700 bg-opacity-80 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                                            >
                                                Add comment
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </article>
                        </>
                    )}
                </main>
                <Sidebar className="basis-2/6 flex flex-col gap-4" />
            </div>
        </Spinner>
    );
}
