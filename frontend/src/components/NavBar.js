import React from "react";
import { useState, useEffect } from 'react';


export default function NavBarUser() {


    const [user, setUser] = useState({});
    const [role, setRole] = useState("") // user object
    const logOut = () => {
        localStorage.clear();

        window.location.href = '/login';
    }



    useEffect(() => {
        const data = localStorage.getItem("user");
        setUser(JSON.parse(data));
        setRole(localStorage.getItem("role"));
    }, []);

    return (

        <>
            <nav className="bg-purple-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <a className="text-white text-2xl font-bold" href="#">
                            CODE MAGE
                        </a>
                        <button
                            className="text-white text-xl md:hidden"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon">&#9776;</span>
                        </button>
                        <div className="md:flex md:items-center md:justify-end hidden" id="navbarNav">
                            <ul className="flex space-x-2 text-white">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Home
                                    </a>
                                </li>
                                {role === 'admin' ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/adminHome">
                                                <i className="fa fa-th-list fa-fw mr-1"></i>Dashboard
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Account
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <a className="dropdown-item" href={'/profile'}>
                                                        Profile
                                                    </a>
                                                    <a className="dropdown-item" href={'/resetPassword'}>
                                                        Change Password
                                                    </a>
                                                    <button className="dropdown-item" onClick={() => logOut()}>
                                                        LogOut
                                                    </button>
                                                </ul>
                                            </div>
                                        </li>
                                    </>
                                ) : null}
                                {role === 'user' ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/userHome">
                                                <i className="fa fa-th-list fa-fw mr-1"></i>Home
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/editor">
                                                <i className="fa fa-th-list fa-fw mr-1"></i>Code Editor
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/allpost">
                                                <i className="fa fa-th-list fa-fw mr-1"></i>Review Code
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <div className="dropdown">
                                                <a className="btn btn-secondary row" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa-regular fa-user col" />
                                                    <span className="col"></span>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <a className="dropdown-item" href={'/profile'}>
                                                        Profile
                                                    </a>
                                                    <a className="dropdown-item" href={'/resetPassword'}>
                                                        Change Password
                                                    </a>
                                                    <button className="dropdown-item" onClick={() => logOut()}>
                                                        LogOut
                                                    </button>
                                                </ul>
                                            </div>
                                        </li>
                                    </>
                                ) : null}
                                {!role ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link bg-orange-600 rounded text-black" href="/login">
                                                <i className="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Login
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link bg-teal-400 rounded text-black" href="/register">
                                                <i className="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Register
                                            </a>
                                        </li>
                                    </>
                                ) : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )

}


