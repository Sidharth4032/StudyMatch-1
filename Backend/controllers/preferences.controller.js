// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');


const prisma = new PrismaClient();



const addPreferences = catchAsync(async (req, res) => {
    const { userId, ...preferences } = req.body;
  try {
    const newPreference = await prisma.userPreference.create({
      data: {
        userId,
        ...preferences
      },
    });
    res.status(201).json(newPreference);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create preference' });
  }
});


const readPreferences = catchAsync(async (req, res) => {
    const userId = parseInt(req.params.userId);
  try {
    const preferences = await prisma.userPreference.findMany({
      where: {
        userId
      },
    });
    res.status(200).json(preferences);
  } catch (error) {
    res.status(400).json({ error: 'Unable to fetch preferences' });
  }

});



const updatePreferences = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
      const updatedPreference = await prisma.userPreference.update({
        where: { id },
        data,
      });
      res.status(200).json(updatedPreference);
    } catch (error) {
      res.status(400).json({ error: 'Unable to update preference' });
    }
});

module.exports = {
    addPreferences,
    readPreferences,
    updatePreferences
}