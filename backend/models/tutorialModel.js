const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorialSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  courseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },

}
)

const Tutorial = mongoose.model("Tutorial", TutorialSchema);

module.exports = Tutorial;
