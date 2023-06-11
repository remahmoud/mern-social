import React from "react";
import {
    useGetPostsQuery,
    useLikePostMutation,
    useRemovePostMutation,
    useUnlikePostMutation,
} from "app/queries/post";
import Spinner from "./Spinner";
import {
    UserCircleIcon,
    HeartIcon,
    ShareIcon,
    ChatBubbleBottomCenterIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { removePostFromUserPosts } from "app/slices/authSlice";
import { deletePostFromList } from "app/slices/postSlice";
dayjs.extend(relativeTime);

export default function PostList({ posts, isUser = false }) {
    const [parent] = useAutoAnimate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [removePost] = useRemovePostMutation();
    const user = useSelector((state) => state.auth.user);
    const { isloading } = useGetPostsQuery({}, { refetchOnFocus: true });
    const handleLike = async (id) => {
        await likePost(id).unwrap();
    };
    const handleUnlike = async (id) => {
        await unlikePost(id).unwrap();
    };
    const handleRemovePost = async (id) => {
        await removePost(id).unwrap();
        if (user) {
            dispatch(removePostFromUserPosts(id));
        } else {
            dispatch(deletePostFromList(id));
        }
    };
    return (
        <Spinner condition={isloading}>
            <div className="flex flex-col gap-3 mb-4" ref={parent}>
                {posts?.map((post) => (
                    <div
                        key={post._id}
                        className="w-full flex flex-col gap-2 p-6 hover:bg-gray-100 bg-white rounded-lg border border-gray-200 shadow-md"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <Link
                                to={`/user/profile/${post.user._id}`}
                                className="flex flex-row items-center gap-2"
                            >
                                {post.user.avatar ? (
                                    <img
                                        src={post.user.avatar}
                                        alt={post.user.fullname}
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <UserCircleIcon className="w-8 h-8 text-gray-500" />
                                )}
                                <div className="font-medium text-sm">
                                    <div className="capitalize">
                                        {post.user.fullname}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Posted in{" "}
                                        {dayjs(post.createdAt).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </div>
                                </div>
                            </Link>
                            {user && user._id === post.user._id && (
                                <button
                                    onClick={() => handleRemovePost(post._id)}
                                    className="light__btn py-1 px-3 flex flex-row items-center text-opacity-70"
                                >
                                    <ExclamationTriangleIcon className="w-5 h-5" />{" "}
                                    Delete
                                </button>
                            )}
                        </div>
                        <hr className="h-px bg-gray-200 border-0" />
                        <Link to={`/post/${post._id}`} className="mb-2">
                            {post.text && <p className="mb-2">{post.text}</p>}
                            <div className="flex items-center justify-center">
                                {post.photo && (
                                    <img
                                        src={post.photo}
                                        alt={post.user.fullname}
                                    />
                                )}
                            </div>
                        </Link>
                        <div className="flex flex-row w-full justify-end">
                            <div className="h-auto">
                                {user && !post.likes?.includes(user._id) ? (
                                    <button
                                        onClick={() => handleLike(post._id)}
                                        className="light__btn py-1 px-6 rounded-none rounded-l-lg text-center text-opacity-80 focus:ring-0"
                                    >
                                        <HeartIcon className="w-6 h-6 text-opacity-80" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUnlike(post._id)}
                                        className="light__btn py-1 px-6 rounded-none rounded-l-lg text-center text-opacity-80 focus:ring-0"
                                    >
                                        <HeartIcon className="w-6 h-6 fill-blue-700 opacity-80" />
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        navigate(`/post/${post._id}`)
                                    }
                                    className="light__btn py-1 px-6 rounded-none text-center text-opacity-80 focus:ring-0"
                                >
                                    <ChatBubbleBottomCenterIcon className="w-6 h-6" />
                                </button>
                                <button className="light__btn py-1 px-6 rounded-none rounded-r-lg text-center text-opacity-80 focus:ring-0">
                                    <ShareIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Spinner>
    );
}
