// Requiero router de express

const { Router } = require('express')
const router = Router();

// Requiero la bd

const { Diet, Recipe } = require('../db')


// Requiero las llamadas a la api y a la bd

const controllers = require('../controllers/controllerApi')



// Hago un llamado a todas las recetas + busqueda por nombre:

router.get('/', async (req, res) => {
  const recipeName = req.query.name;
  const dbRecipes = await controllers.getData();
  const apiRecipes = await controllers.getApi();
  const allRecipes = dbRecipes.concat(apiRecipes);

  if (recipeName) {
    const filterRecipes = await allRecipes.filter((recipe) => recipe.name.toLowerCase().includes(recipeName.toLowerCase()));

    if (filterRecipes.length) {
      res.status(200).send(filterRecipes)

    }
    else {
      res.status(404).send('There is no recipe with the indicated name: ' + recipeName.toLowerCase());

    }

  } 
  else {
    res.status(200).send(allRecipes);

  }

});

// Hago el post que crea una receta:

router.post('/', async (req, res) => {
  const { 
    name,
    summary,
    healthScore,
    stepByStep,
    image,
    price,
    diet
  } = req.body;

  if (!name || !summary) {
    res.status(404).send('The "Name" or "Summary" data was not received correctly...');

  }

  else {

    try {

      const recipeCreated = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        stepByStep,
        price
      });

      const dietDB = await Diet.findAll({
        where: {
          name: diet,
        },
      });

      recipeCreated.addDiet(dietDB);
      res.json({ message: 'The recipe was succesfully created', recipeCreated: recipeCreated });

    }

    catch (error) {
      res.status(404).send('There was an error with the creation of the recipe: ' + error.message);

    }

  }

});

// Hago el get que me trae la receta pedida por ID:

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const dbRecipes = await controllers.getData();
  const apiRecipes = await controllers.getApi();
  const allRecipes = dbRecipes.concat(apiRecipes);

  if (id) {
    const findByID = await allRecipes.filter((recipe) => recipe.id == id);

      if (findByID.length) {
        res.status(200).json(findByID)

      }
      else {
        res.status(404).send('The recipe with the id ' + id + ' does not exist');

      }
  }
})

module.exports = router;
