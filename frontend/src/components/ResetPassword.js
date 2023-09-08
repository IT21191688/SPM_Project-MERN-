import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {


    const [email, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')


    const resetSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend API
            const response = await axios.post('http://localhost:8080/auth/resetPassword', { email, password, oldPassword });


            alert(response)

            if (response.data.pass == true) {

                alert("Password Changed Plese Loging again")
                window.location.reload('/login');
            } else {

                alert("Password Not Changed Please Try again")
                window.location.reload('/resetPassword');

            }


        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const cancel = () => {

        window.location.reload('/profile')

    }



    return (

        <div className='container flex justify-center' style={{ height: "90vh" }} >

            <form className='mt-20 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl w-80' method="post" encType="multipart/form-data" >
                <h1 className='text-primary text-2xl font-bold'>Change Password</h1><br></br>


                <div className='row'>
                    <div class="form-group col-md-12">
                        <label >User Name</label>
                        <input type="email" class="form-control" placeholder="Enter password" onChange={e => setUserName(e.target.value)} />
                    </div>

                </div><br></br>
                <div className='row'>
                    <div class="form-group col-md-12">
                        <label >Old Password</label>
                        <input type="password" class="form-control" placeholder="Enter password" onChange={e => setOldPassword(e.target.value)} />
                    </div>

                </div><br></br>
                <div className='row'>

                    <div class="form-group col-md-12">
                        <label >New Password</label>
                        <input type="password" class="form-control" placeholder="New password" onChange={e => setPassword(e.target.value)} />
                    </div>
                </div><br></br>


                <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={resetSubmit}>Submit</button><br></br><br></br>
                <a type='button' href='/profile' class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={cancel}>Cancel</a><br></br>

            </form>

        </div>
    )



}