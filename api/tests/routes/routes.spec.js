/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'Example Summary'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);

  }));


  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));


  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)

    );

    it('should get an 404 error if the query name doesent exist', () => 
      agent.get('/recipes/?name=fakename').expect(404)

    );

    it('should create the recipe when post', () => {
      const newRecipe = {
        name: 'Sample Name',
        summary: 'Sample summary'

      };

      agent.post('/recipes').send(newRecipe).expect({ 
        message: 'The recipe was succesfully created', 
        recipeCreated: newRecipe

      });

    });

    it('should throw an error if Name or Summary are not sent', () => {
      const newRecipe = {};

      agent.post('/recipes').send(newRecipe).expect(404);

    });

    it('should get 200 when the id is true', () => {
      agent.get('/recipes/78959').expect(200);

    });

    it('should get 404 when the id is false', () => {
      agent.get('/recipes/999999').expect(404);

    });

  });

  describe('GET /diets', () => {
    it('should get 200', () => {
      agent.get('/diets').expect(200);

    })

  })
});
