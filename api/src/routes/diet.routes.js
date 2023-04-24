const { Router } = require('express');
const { Diet } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allDiets = await Diet.findAll();
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(400).send('There was an error during de petition of diets: ' + error.message);
  }
});

module.exports = router;