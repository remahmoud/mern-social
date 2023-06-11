import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { logout } from "app/slices/authSlice";

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    return (
        <header className="mb-3">
            <nav className="relative w-full text-grey-900 py-4">
                <div className="container mx-auto px-4 md:px-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "link__active" : ""
                            }
                        >
                            My Social
                        </NavLink>
                    </h1>
                    <ul className="flex items-center gap-6">
                        {user ? (
                            <>
                                <li className="font-semibold capitalize">
                                    <NavLink
                                        to={`/user/profile/${user._id}`}
                                        className={({ isActive }) =>
                                            isActive ? "link__active" : ""
                                        }
                                    >
                                        {user.fname}
                                    </NavLink>
                                </li>
                                <li className="font-semibold capitalize">
                                    <button
                                        onClick={() => dispatch(logout())}
                                        className="light__btn py-1 px-3 flex flex-row items-center text-opacity-75"
                                    >
                                        <ExclamationTriangleIcon className="w-4 h-4" />
                                        <span>logout</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="font-semibold">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive ? "link__active" : ""
                                        }
                                    >
                                        Sign in
                                    </NavLink>
                                </li>
                                <li className="bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold">
                                    <NavLink to="/register">Sign up</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
