import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwt(token);
      const userId = decoded.userId;

      try {
        const response = await axios.post("http://localhost:8080/auth/profile", {
          userId,
        });

        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setAge(response.data.age);
        setEmail(response.data.email);
        setDob(response.data.dob);
        setPassword(response.data.password);
        setRole(response.data.role);
      } catch (error) {
        alert("Data Load Unsuccessful" + error);
        console.log(error);
      }
    };
    fetchProfileDetails();
  }, []);

  const deleteProfileDetails = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt(token);
    const userId = decoded.userId;

    try {
      const response = await axios.post("http://localhost:8080/auth/deleteUser", {
        userId,
      });

      alert('Delete successfull');
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      alert("Delete unsuccessful" + error);
      console.log(error);
    }
  };

  const updateProfileDetails = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwt(token);
    const userId = decoded.userId;

    try {
      const response = await axios.put("http://localhost:8080/auth/updateUser", {
        userId,
        firstname,
        lastname,
        age,
        dob,
      });
      alert("Update Successful");
      window.location.href='/UserHome';

      // window.location.reload(true);
    } catch (error) {
      alert("Update unsuccessful" + error);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <form className="space-y-4" onSubmit={updateProfileDetails}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="firstNameInput">First Name</label>
            <input
              type="text"
              className="border p-2 rounded"
              value={firstname}
              id="firstNameInput"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="LastNameInput">Last Name</label>
            <input
              type="text"
              className="border p-2 rounded"
              value={lastname}
              id="LastNameInput"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="text"
              className="border p-2 rounded"
              value={email}
              id="exampleInputEmail1"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="Enter email"
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="AgeInput">Age</label>
            <input
              type="number"
              className="border p-2 rounded"
              value={age}
              id="AgeInput"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Age"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="DobInput">Date of Birth</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={dob}
              id="DobInput"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="exampleInputEmail1">Role</label>
            <input
              type="text"
              className="border p-2 rounded"
              value={role}
              id="exampleInputEmail1"
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              readOnly
            />
          </div>
          <div className="space-x-2">
            <center>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={deleteProfileDetails}
            >
              Delete
            </button>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}
