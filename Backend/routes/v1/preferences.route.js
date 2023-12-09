const express = require('express');
const preferencesController = require('../../controllers/preferences.controller');


const router = express.Router();



router
  .route('/add')
  .post(preferencesController.addPreferences);


router
    .route('/:userId')
    .get(preferencesController.readPreferences);

module.exports = router;