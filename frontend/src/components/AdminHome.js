import React from "react";
import { useEffect } from "react";


export default function AdminHome() {

    //window.location.reload();

    return (

        <div style={{ height: "90vh" }}>

            <h1>Admin Home</h1>

            <a href="/adminRegister"><button className="btn btn-primary btn-lg">Admin Register</button></a>

        </div>
    )

}


