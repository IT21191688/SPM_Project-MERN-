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
import Editor from './components/Editor'
import AllPost from './components/AllPost';
import CreatePost from './components/CreatePost';
import SelectedPost from './components/SelectedPost';
import UpdatePost from './components/UpdatePost';
import About from './components/About';
import CreateCourse from './components/CreateCourse';
import ViewCoursesAdmin from './components/ViewCoursesAdmin';
import UpdateCourse from './components/UpdateCourse'; // Import the UpdateCourse component
import ViewCoursesUser from './components/ViewCoursesUser';
import ViewTutorialsUser from './components/ViewTutorialsUser';
import ViewTutorialsAdmin from './components/ViewTutorialsAdmin';
import CreateTutorial from './components/CreateTutorial';
import UpdateTutorial from './components/UpdateTutorial';



import Cookies from 'js-cookie';
import ViewAllUsers from './components/ViewAllUsers';
import UpdateUser from './components/UpdateUser';



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
                <Route path='/getUsers' element={<ViewAllUsers />} />
                <Route path='/updateUsers/:userId' element={<UpdateUser />} />

                <Route path='/createCourse' element={<CreateCourse />} />
                <Route path='/createTutorial/:courseId/:courseName' element={<CreateTutorial />} />
                <Route path='/getCourseAdmin' element={<ViewCoursesAdmin />} />
                <Route path='/getTutorialAdmin/:courseId/:courseName' element={<ViewTutorialsAdmin />} />
                <Route path='/courses/update/:courseId' element={<UpdateCourse />} />
                <Route path='/tutorials/update/:tutorialId/:courseId/:courseName' element={<UpdateTutorial />} />


              </Routes>
            </Router>

          ) : user === 'user' ? (


            <Router>

              <Routes>

                {/*<Route exact path='/userHome/:token/:role' element={<UserHome />} />*/}
                <Route path='/userHome' element={<UserHome />} />
                <Route path='/editor' element={<Editor />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path="/allpost" element={<AllPost />} />
                <Route path="/post/:postId" element={<SelectedPost />} />
                <Route path="/editpost/:postId" element={<UpdatePost />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="/about" element={<About />} />
                <Route path="/viewCourses" element={<ViewCoursesUser />} />
                <Route path="/viewTutorials/:courseId/:courseName" element={<ViewTutorialsUser />} />




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