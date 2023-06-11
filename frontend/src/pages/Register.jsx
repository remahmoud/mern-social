import { useRegisterMutation } from "app/queries/auth";
import Spinner from "components/Spinner";
import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const user = useSelector((state) => state.auth.user);
    const handleRegister = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const res = await register(data).unwrap();
        if (res) {
            navigate("/login");
        }
    };
    if (user) return <Navigate to="/" replace />;
    return (
        <Spinner condition={isLoading}>
            <form className="h-full" onSubmit={handleRegister}>
                <div className="container mx-auto md:w-1/2 mt-20">
                    <h1 className="text-center text-5xl text-blue-700 font-bold mb-8">
                        Register Now
                    </h1>
                    <div className="mb-6">
                        <label htmlFor="fname" className="form__label">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            className="form__input"
                            placeholder="First Name"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lname" className="form__label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            className="form__input"
                            placeholder="Last Name"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="form__label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form__input"
                            placeholder="name@social.com"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="form__label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form__input"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto md:w-1/3 px-5 py-2.5 text-center"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </Spinner>
    );
}
