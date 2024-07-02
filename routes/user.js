// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { body,param } = require('express-validator');
const userController = require('../controllers/user');
const checkEmailNotInUse=require('../helper/validator/emailCheck');
router.post('/',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().custom(async value => {
      
        await checkEmailNotInUse(value);
      }).withMessage('Email is required and must be valid'),
        body('age')
          .notEmpty()
          .isInt({ min: 18, max: 99 })
          .withMessage('Age must be between 18 and 99'),
    ],
  userController.createUser);


  router.delete('/:id', param('id').isMongoId().withMessage('Invalid user ID'), userController.deleteUser);

  router.get('/',userController.getUsers);


  // Update user by ID
  router.put(
    '/:id',
    [
      param('id').isMongoId().withMessage('Invalid user ID'),
      body('name').optional().notEmpty().withMessage('Name is required'),
      body('email').optional().isEmail().withMessage('Email is required and must be valid'),
      body('age')
        .optional()
        .isInt({ min: 18, max: 99 })
        .withMessage('Age must be between 18 and 99'),
    ],
    userController.updateUser
  );

module.exports = router;
