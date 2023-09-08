import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ChangePass() {

    const { email } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const resetSubmit = async (e) => {
        e.preventDefault();

        try {

            if (password === newPassword) {
                const response = await axios.post('http://localhost:8080/auth/changePassword', { email, password });



                if (response.data.changed == true) {

                    alert("Password Changed Plese Loging again")
                    navigate('/login');
                } else {

                    alert("Password Not Changed Please Try again")
                    navigate('/fogotPassword');

                }

            }

        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const cancel = () => {

        navigate('/login');


    }


    return (

        <div className='container flex justify-center' style={{ height: "90vh" }} >

            <div className='pb-10'>

                <form className='mt-10 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl w-80' method="post" encType="multipart/form-data" >
                    <h1 className='text-primary text-2xl font-bold'>Change Password</h1><br></br>


                    <div className='row'>
                        <div class="form-group col-md-12">
                            <label >User Name</label>
                            <input type="email" class="form-control" placeholder="Enter password" value={email} disabled />
                        </div>

                    </div><br></br>
                    <div className='row'>
                        <div class="form-group col-md-12">
                            <label >New Password</label>
                            <input type="password" class="form-control" placeholder="Enter password" onChange={e => setNewPassword(e.target.value)} />
                        </div>

                    </div><br></br>
                    <div className='row'>

                        <div class="form-group col-md-12">
                            <label >Comfirm Password</label>
                            <input type="password" class="form-control" placeholder="comfirm password" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div><br></br>


                    <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={resetSubmit}>Submit</button><br></br><br></br>
                    <button type="submit" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={cancel}>Cancel</button><br></br>

                </form>


            </div>

        </div>
    )



}