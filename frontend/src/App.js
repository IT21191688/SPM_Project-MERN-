import './App.css';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from './components/Register';
import Login from './components/Login'
import FogotPassword from './components/FogotPassword'
import ResetPassword from './components/ResetPassword'
import NavBar from './components/NavBar';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AdminSideRegister from './components/AdminSideRegister';
import ChangePass from './components/ChangePass';
import Profile from './components/Profile';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

import Cookies from 'js-cookie';



function App() {


  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('role') ? localStorage.getItem('role') : "");

  })


  // Function to handle beforeunload event
  const handleBeforeUnload = () => {
    // Clear the user data from localStorage when the browser is closed
    localStorage.removeItem('role');
  };





  return (
    <>
      <div className="App">

        <ToastContainer autoClose={3000} />
        <NavBar />



        {
          user === "admin" ? (

            <Router>
              <Routes>
                <Route path='/adminHome' element={<AdminHome />} />
                <Route path="/adminRegister" element={<AdminSideRegister />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/resetPassword' element={<ResetPassword />} />

              </Routes>
            </Router>

          ) : user === 'user' ? (


            <Router>

              <Routes>

                {/*<Route exact path='/userHome/:token/:role' element={<UserHome />} />*/}
                <Route path='/userHome' element={<UserHome />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/resetPassword' element={<ResetPassword />} />

              </Routes>

            </Router>


          ) : null

        }


        <Router>
          <Routes>


            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/fogotPassword' element={<FogotPassword />} />
            <Route path='/changePassword/:email' element={<ChangePass />} />
            {/*<Route path="/*" element={<Profile />} />*/}
          </Routes>
        </Router>

        { /*<Footer />*/}
      </div>
    </>
  );
}

export default App;