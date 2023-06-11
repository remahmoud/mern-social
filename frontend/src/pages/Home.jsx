import React from "react";
import { useGetProfileQuery } from "app/queries/auth";
import Spinner from "components/Spinner";
import AddPost from "components/AddPost";
import PostList from "components/PostList";
import Warning from "components/alerts/Warning";
import { useSelector } from "react-redux";
import Sidebar from "components/Sidebar";

export default function Home() {
    const { isLoading } = useGetProfileQuery();
    const user = useSelector((state) => state.auth.user);
    const posts = useSelector((state) => state.post.list);
    return (
        <Spinner condition={isLoading}>
            <div>
                {!user?.isVerified && (
                    <Warning>Activate your account now</Warning>
                )}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <main className="basis-4/6 flex flex-col gap-4">
                        <AddPost />
                        <PostList posts={posts} />
                    </main>
                    <Sidebar className="basis-2/6 flex flex-col gap-4" />
                </div>
            </div>
        </Spinner>
    );
}
