const Course = require('../models/courseModel');

const addCourse = async (req, res) => {
  try {
    const { courseid, coursename, description, sections } = req.body;
    const newCourse = new Course({
      courseid,
      coursename,
      description,
      sections,
    });

    await newCourse.save();
    res.json('Course added');
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error adding course' });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseid = req.params.courseid;
    const newData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(courseid, newData, {
      new: true,
    });
    res.json(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseid = req.params.courseid;
    await Course.findByIdAndRemove(courseid);
    res.json('Course deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting course' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseid = req.params.courseid;
    const course = await Course.findById(courseid);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ status: 'Course fetched', course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error when fetching a course' });
  }
};

module.exports = {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCourseById,
};
