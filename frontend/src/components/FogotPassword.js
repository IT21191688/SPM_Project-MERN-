import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function FogotPassword() {


    const navigate = useNavigate();

    const [email, setUserName] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [enteredvalue, setEnteredvalue] = useState('')

    const keySubmit = async (e) => {
        e.preventDefault();

        try {

            if (enteredvalue === verificationCode) {

                alert(enteredvalue + verificationCode)
                navigate('/changePassword/' + email);

            } else {

                alert("Your Varification code not valid Please try Again")
                window.location.reload('/login');

            }


        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const sendVerificationCode = async (e) => {
        e.preventDefault();

        try {

            const key = generateVerificationCode();

            const response = await axios.post('http://localhost:8080/auth/sendVerificationCode', { email, key });

            const verificationCode = response.data.Digits;
            alert("Verification code sent: " + verificationCode);

            setVerificationCode(verificationCode);


        } catch (error) {

            alert("Something went wrong" + error)
            console.log(error);
        }
    };

    const cancel = () => {


        navigate('/login')

    }

    const generateVerificationCode = () => {
        const codeLength = 6; // Length of the verification code
        return nanoid(codeLength);
    };


    return (

        <div className='container flex justify-center' style={{ height: "90vh" }}>

            <div className='pb-10'>

                <form className='mt-20 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl w-96' method="post" encType="multipart/form-data" >
                    <h1 className='text-primary text-2xl font-bold'>Change Password</h1><br></br>


                    <div className='row'>
                        <div class="form-group col-md-12">
                            <label >User Name</label>
                            <input type="email" class="form-control" placeholder="Enter Your Email" onChange={e => setUserName(e.target.value)} />
                        </div>

                    </div><br></br>

                    <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={sendVerificationCode}>Send</button><br></br><br></br>
                    <div className='row'>
                        <div class="form-group col-md-12">
                            <label >Verification Code</label>
                            <input type="password" class="form-control" placeholder="Enter Verification Code" onChange={e => setEnteredvalue(e.target.value)} />
                        </div>

                    </div><br></br>

                    <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={keySubmit}>Submit</button><br></br><br></br>
                    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={cancel}>Cancel</button><br></br>

                </form>

            </div>

        </div>
    )



}