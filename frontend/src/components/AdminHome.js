import React from "react";
import '../css/adminhome.css';

export default function AdminHome() {
    return (
        <div className="admin-home-container">

            <div className="admin-options">
                <div className="admin-option user-management">
                    <a href="/getUsers" className="admin-option-link">
                        <h2>User Management</h2>
                        <p>Manage user accounts</p>
                    </a>
                </div>
                <div className="admin-option course-tutes">
                    <h2>Course & Tutes</h2>
                    <div className="course-tutes-options">
                        <div className="course-tutes-option">
                            <a href="/getCourseAdmin" className="admin-option-link">
                                <h3>View Course</h3>
                                <p>View and manage courses</p>
                            </a>
                        </div>
                        <div className="course-tutes-option">
                            <a href="/createCourse" className="admin-option-link">
                                <h3>Create Course</h3>
                                <p>Create new courses</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


