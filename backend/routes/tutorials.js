const router = require("express").Router();
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'TuteFiles'); // Store uploaded files in the "uploads" directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, 'pdf-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

const {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorialById,
  deleteTutorialById,
} = require('../controllers/tutorialController');

// Create a new tutorial with file upload
router.post('/create', upload.single('pdf'), createTutorial);

// Get all tutorials
router.get('/allT', getAllTutorials);

// Get a specific tutorial by ID
router.get('/getT/:id', getTutorialById);

// Update a tutorial by ID
router.put('/updateT/:id', updateTutorialById);

// Delete a tutorial by ID
router.delete('/deleteT/:id', deleteTutorialById);


module.exports = router;