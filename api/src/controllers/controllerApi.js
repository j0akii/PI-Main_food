const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');
const URL_API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

// Obtengo los datos de la API:

const getApi = async () => {
  try {
    const apiData = await axios.get(URL_API);
    const { results } = apiData.data

    if (results.length > 0) {
      const allRecipes = await results?.map((recipe) => {
        return {
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          healthScore: recipe.healthScore,
          price: recipe.pricePerServing,
          diets: recipe.diets?.map((diet) => diet),
          summary: recipe.summary,
          stepByStep:
            recipe.analyzedInstructions[0] &&
            recipe.analyzedInstructions[0].steps
              ? recipe.analyzedInstructions[0].steps
                  .map((item) => item.step)
                  .join(" \n")
              : "",
        };
      })

      return allRecipes
    }
  }
  catch (error) {
    const errorMessage = 'There was an error during de petition to the API: ' + error.message;
    console.log(errorMessage);
    return;
  }
};

// Obtengo los datos de la base de datos:

const getData = async () => {
  try {
    const getDB = await Recipe.findAll({
    include: {
      model: Diet,
      atrributes: ['name'],
      through: {
          atrributes: ['id', 'name'],
        },
      },
    });

    const allRecipes = await getDB?.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.name,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        image: recipe.image,
        stepByStep: recipe.stepByStep,
        diets: recipe.diets?.map((diet) => diet.name),
      };
    });

    return allRecipes;

  }
  catch (error) {
    const errorMessage = 'There was an error during de petition to the Data Base "Food": ' + error.message;
    console.log(errorMessage);
    return;
  };
};

module.exports = {
    getApi,
    getData
}