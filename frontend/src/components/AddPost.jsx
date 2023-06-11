import { PhotoIcon } from "@heroicons/react/24/solid";
import { useAddNewPostMutation } from "app/queries/post";
import { createPost } from "app/slices/postSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonLoader from "./ButtonLoader";

export default function AddPost() {
    const dispatch = useDispatch();
    const [photoView, setPhotoView] = useState(null);
    const [addNewPost, { isLoading }] = useAddNewPostMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", e.target.image.files[0]);
        formData.append("text", e.target.text.value);
        const res = await addNewPost(formData).unwrap();
        if (res.post) {
            dispatch(createPost(res.post));
            e.target.reset();
            setPhotoView(null);
        }
    };
    const handleViewImage = (e) => {
        const reader = new FileReader();
        const img = e.target.files[0];
        // eslint-disable-next-line no-unused-vars
        const url = reader.readAsDataURL(img);
        reader.onloadend = () => {
            setPhotoView(reader.result);
        };
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full bg-gray-50 rounded-lg border border-gray-200">
                <div className="py-2 px-4 bg-white rounded-t-lg">
                    <label htmlFor="post" className="sr-only">
                        Your post
                    </label>
                    <textarea
                        id="post"
                        name="text"
                        rows="4"
                        className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:outline-none"
                        placeholder="Write a new post..."
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    {photoView && <img src={photoView} alt="test" />}
                </div>
                <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                    <div className="flex pl-0 space-x-1 sm:pl-2">
                        <input
                            id="PostPhoto"
                            type="file"
                            name="image"
                            className="hidden"
                            onChange={handleViewImage}
                        />
                        <label
                            htmlFor="PostPhoto"
                            title="upload post photo"
                            className="text-gray-800 text-opacity-80 cursor-pointer"
                        >
                            <PhotoIcon className="w-8 h-8" />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        {isLoading ? <ButtonLoader /> : "Add New Post"}
                    </button>
                </div>
            </div>
        </form>
    );
}
