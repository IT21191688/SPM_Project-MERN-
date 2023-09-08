const router = require("express").Router();
//const Course = require("../models/courseModel");

const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCourseById,
} = require('../controllers/courseController');

router.post('/add', addCourse);
router.get('/getCourses', getCourses);
router.put('/update/:courseid', updateCourse);
router.delete('/delete/:courseid', deleteCourse);
router.get('/get/:courseid', getCourseById);

module.exports = router;


/*
router.route("/add").post(async (req, res) => {
  try {
    const { courseid, coursename, description, sections } = req.body;
    const newCourse = new Course({
      courseid,
      coursename,
      description,
      sections,
    });

    await newCourse.save();
    res.json("Course added");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error adding course" });
  }
});

router.route("/getCourses").get(async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching courses" });
  }
});

router.route("/update/:courseid").put(async (req, res) => {
  try {
    const courseid = req.params.courseid;
    const newData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(courseid, newData, {
      new: true,
    });
    res.json(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating course" });
  }
});

router.route("/delete/:courseid").delete(async (req, res) => {
  try {
    const courseid = req.params.courseid;
    await Course.findByIdAndRemove(courseid);
    res.json("Course deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting course" });
  }
});

router.route("/get/:courseid").get(async (req, res) => {
  try {
    const courseid = req.params.courseid;
    const course = await Course.findById(courseid);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ status: "Course fetched", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error when fetching a course" });
  }
});


module.exports = router;
*/