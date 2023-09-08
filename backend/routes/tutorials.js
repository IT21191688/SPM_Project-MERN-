
const router = require("express").Router();
//const Tutorial = require("../models/tutorialModel");


const {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorialById,
  deleteTutorialById,
} = require('../controllers/tutorialController');

router.post('/create', createTutorial);
router.post('/allT', getAllTutorials);
router.post('/getT/:id', getTutorialById);
router.put('/updateT/:id', updateTutorialById);
router.delete('/deleteT/:id', deleteTutorialById);

module.exports = router;

/*
// Create a new tutorial
router.route("/create").post (async (req, res) => {
  try {
    const { title, description, courseid } = req.body;
    const newTutorial = new Tutorial({
         title, 
         description,  
         courseid 
    });

    await newTutorial.save();
    res.json("Tutorial added");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating tutorial" });

  }
});

// Get all tutorials
router.get("/", async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tutorials' });
  }
});

// Get a specific tutorial by ID
router.get("/:id", async (req, res) => {
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
});

// Update a tutorial by ID
router.put("/:id", async (req, res) => {
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
});

// Delete a tutorial by ID
router.delete("/:id", async (req, res) => {
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
});


module.exports = router;
*/
