import React from "react";
import { useLoginMutation } from "app/queries/auth";
import Spinner from "components/Spinner";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "app/slices/authSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = Object.fromEntries(new FormData(e.target).entries());
        const res = await login(user).unwrap();
        if (res.token) {
            dispatch(addToken(res.token));
            navigate("/");
        }
    };
    if (user) return <Navigate to="/" replace />;
    return (
        <Spinner condition={isLoading}>
            <form className="h-full" onSubmit={handleLogin}>
                <div className="container mx-auto md:w-1/2 mt-20">
                    <h1 className="text-center text-5xl text-blue-700 font-bold mb-8">
                        Login Now
                    </h1>
                    <div className="mb-6">
                        <label htmlFor="email" className="form__label">
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form__input"
                            placeholder="name@social.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="form__label">
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form__input"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto md:w-1/3 px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </Spinner>
    );
}
