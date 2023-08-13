import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [jwtToken, setJwtToken] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Send login request to the backend API
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            const token = response.data.token;
            const role = response.data.role

            // Store the token in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            alert("Login success" + role)

            window.location.reload(true);


        } catch (error) {

            alert("Login Unsuccess")
            console.log(error);

        }
    };


    const googleAuth = async () => {

        try {

            const popup = window.open("http://localhost:8080/auth/google", "_blank", "width=600,height=600");


            const receiveMessage = (event) => {
                if (event.origin === "http://localhost:8080" && event.data.token && event.data.role) {
                    const { token, role } = event.data;


                    // Store the token in local storage
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);



                    // Close the popup
                    popup.close();
                    window.removeEventListener("message", receiveMessage);

                    window.location.reload(true);
                }
            };



            // Add event listener to receive messages from the popup
            window.addEventListener("message", receiveMessage);

        } catch (error) {

            alert("Login Unsucess")
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('role') === 'admin') {
            navigate('/adminHome');

        } else if (localStorage.getItem('role') === 'user') {
            navigate('/userHome');
        }
        else {
            navigate('/login')
        }
    }, []);


    return (

        <div className='container flex justify-center' style={{ height: "90vh" }}>

            <div className='pb-10'>

                <form className='mt-10 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl w-96' method="post" encType="multipart/form-data" >
                    <h1 className='text-primary text-2xl font-bold'>Login Form</h1><br></br>


                    <div className='row'>
                        <div class="form-group col-md-12">
                            <label >Email</label>
                            <input type="email" class="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                        </div>

                    </div><br></br>
                    <div className='row'>

                        <div class="form-group col-md-12">
                            <label >Password</label>
                            <input type="password" class="form-control" placeholder="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div><br></br>

                    <div className='justify-center justify-items-center'>


                        <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={handleSubmit}>Login</button><br></br><br></br>
                        <Link to={'/register'}><button type="submit" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48">Register</button></Link><br></br><br></br>


                        <center>
                            <a type='button' class="px-4 py-2 border flex gap-2 border-slate-200 rounded text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 w-48 mr-2 mb-2" onClick={googleAuth} ><img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />Google Login</a>
                        </center>
                    </div>




                    <span>Fogot Password: <Link to={'/fogotPassword'} className='cursor-pointer'>Reset</Link></span>

                </form>

            </div>

        </div>
    )

}