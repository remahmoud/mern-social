import React from "react";
import RecommendedToFollow from "./RecommendedToFollow";
import TopUsersList from "./TopUsersList";

export default function Sidebar(props) {
    return (
        <aside {...props}>
            <RecommendedToFollow />
            <TopUsersList />
        </aside>
    );
}
