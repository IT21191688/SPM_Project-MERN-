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
        <div className='container flex justify-center' style={{ height: "90vh" }}>
            <div className='pb-5'>
                <form className='mt-5 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl w-100' method="post" encType="multipart/form-data">
                    <h1 className='text-primary text-2xl font-bold'>Change Password</h1>
                    <br />
                    <div className='row'>
                        <div className="form-group col-md-12">
                            <label>User Name</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email} disabled />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className="form-group col-md-12">
                            <label>New Password</label>
                            <input type="password" className="form-control" placeholder="Enter new password" onChange={e => setNewPassword(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className="form-group col-md-12">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Confirm new password" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-success btn-block font-medium rounded-lg text-sm text-white px-5 py-2.5" onClick={resetSubmit}>
                        Submit
                    </button>
                    <br />
                    <button type="submit" className="btn btn-danger btn-block font-medium rounded-lg text-sm text-white px-5 py-2.5" onClick={cancel}>
                        Cancel
                    </button>
                    <br />
                </form>
            </div>
        </div>
    )



}