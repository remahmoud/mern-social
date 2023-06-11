import React from "react";
import { BellIcon } from "@heroicons/react/24/solid";

export default function Warning({ children }) {
    return (
        <div
            className="flex p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
        >
            <BellIcon
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
            />
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">{children}</span>
            </div>
        </div>
    );
}
