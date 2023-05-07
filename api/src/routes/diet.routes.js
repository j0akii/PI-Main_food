const { Router } = require('express');
const axios = require("axios");
const { API_KEY } = process.env;
const URL_API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios(URL_API);
    const recipeDiets = new Set();

    response.data.results.forEach((recipe) => {
      const allDiets = recipe.diets ? recipe.diets.splice(',') : [];
      allDiets.forEach((diet) => recipeDiets.add(diet.trim())); 
    })

    const dietsFinal = [...recipeDiets];

    res.json(dietsFinal);
  } 
  catch (error) {
    res.status(400).send('There was an error during de petition of diets: ' + error);
  }
});

module.exports = router;