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


            <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                        </li>

                        {
                            role === 'admin' ?
                                <>
                                    <li class="nav-item pl-1">
                                        <a class="nav-link" href="/adminHome"><i class="fa fa-th-list fa-fw mr-1"></i>Dashboard</a>
                                    </li>
                                    <li class="nav-item pl-1">
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                Account
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <a class="dropdown-item" href={'/profile'}>Profile</a>
                                                <a class="dropdown-item" href={'/resetPassword'}>Change Password</a>
                                                <button type="button" class="dropdown-item" onClick={() => logOut()}>LogOut</button>

                                            </ul>
                                        </div>
                                    </li>
                                </> : null
                        }

                        {role === 'user' ?
                            <>
                                <li class="nav-item pl-1">
                                    <a class="nav-link" href="/userHome"><i class="fa fa-th-list fa-fw mr-1"></i>Home</a>
                                </li>
                                <li class="nav-item pl-1 pr-20">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Account
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <a class="dropdown-item" href={'/profile'}>Profile</a>
                                            <a class="dropdown-item" href={'/resetPassword'}>Change Password</a>
                                            <button type="button" class="dropdown-item" onClick={() => logOut()}>LogOut</button>

                                        </ul>
                                    </div>
                                </li> </> : null}

                        {!role ?

                            <>

                                <li class="nav-item pl-1">
                                    <a class="nav-link bg-orange-600 rounded text-black" href="/login"><i class="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Login</a>
                                </li>
                                <li class="nav-item pl-1">
                                    <a class="nav-link bg-teal-400 rounded text-black" href="/register"><i class="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Register</a>
                                </li>

                            </>

                            : null

                        }





                    </ul>
                </div>
            </nav>

        </>
    )

}


