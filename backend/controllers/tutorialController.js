const Tutorial = require('../models/tutorialModel');

const createTutorial = async (req, res) => {
  try {
    const { title, description, courseid } = req.body;
    const newTutorial = new Tutorial({
      title,
      description,
      courseid,
      pdf: req.file.path, // Store the path to the uploaded PDF file
    });

    await newTutorial.save();
    res.json('Tutorial added');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating tutorial' });
  }
};

const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tutorials' });
  }
};

const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    res.json(tutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tutorial' });
  }
};

const updateTutorialById = async (req, res) => {
  try {
    const tutorialId = req.params.id;
    const newData = req.body;
    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      tutorialId,
      newData,
      { new: true }
    );
    if (!updatedTutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    res.json(updatedTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating tutorial' });
  }
};

const deleteTutorialById = async (req, res) => {
  try {
    const tutorialId = req.params.id;
    const deletedTutorial = await Tutorial.findByIdAndRemove(tutorialId);
    if (!deletedTutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    res.json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting tutorial' });
  }
};


module.exports = {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorialById,
  deleteTutorialById,
};
