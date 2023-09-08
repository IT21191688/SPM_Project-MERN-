const mongoose = require('mongoose');


//create variable schema using mongoose
const Schema = mongoose.Schema;

//give attributes for courses
const CourseSchema = new Schema({

    courseid: {
        type: String,
        required : true
    },

    coursename: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    sections : {
        type: String
    },
    
} 
)

//db table,schema
const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;








