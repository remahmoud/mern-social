import React from "react";
import Header from "components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "pages";
import PrivateRoute from "components/PrivateRoute";
import Post from "pages/Post";
import Profile from "pages/Profile";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="container mx-auto px-4 md:px-16">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/user/profile/:id"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/post/:id"
                            element={
                                <PrivateRoute>
                                    <Post />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                            index
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
