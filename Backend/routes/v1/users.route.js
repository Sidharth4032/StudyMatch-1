const express = require('express');
const usersController = require('../../controllers/users.controller');


const router = express.Router();

router.route('/:id').get(usersController.readUser); // Read a user

router.route('/:id').put(usersController.modifyUser); // Modify a user

router
  .route('/')
  .get(usersController.createUser);


module.exports = router;