const express = require('express');
const route = express.Router();
const multer = require('multer');
const registerController = require('../controllers/registerController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

route.post('/', upload.single('profile_pic'), registerController);

module.exports = route;
