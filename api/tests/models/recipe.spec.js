const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);

    }));


  describe('Validators', () => {

    beforeEach(() => Recipe.sync({ force: true }));


    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());

      });

      it('should work when its a valid name', async () => {
        const newRecipe = {
          name: 'Example Name',
          summary: 'Example Summary',

        }

        const createdRecipe = await Recipe.create(newRecipe);
        expect(createdRecipe.id).to.exist;

      });

    })
    
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({
          name: 'Example Name'
        })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());

      });

      it('should work when its a valid summary', async () => {
        const newRecipe = {
          name: 'Example Name',
          summary: 'Example Summary',

        }

        const createdRecipe = await Recipe.create(newRecipe);
        expect(createdRecipe.id).to.exist;

      });

    })
    
    describe('healthScore', () => {
      it('should throw an error if healthScore is NaN', async () => {
        const newRecipe = {
          name: 'Example Name',
          summary: 'Example Summary',
          healthScore: '19.5'
        }

        try {
          await Recipe.create(newRecipe);

        } catch (error) {
          expect(error.message).to.equal('Validation isFloat on healthScore failed');

        }
      })

      it('should create a recipe with valid healthScore', async () => {
        const newRecipe = {
          name: 'Example Name',
          summary: 'Example Summary',
          healthScore: 9.5

        }

        const createdRecipe = await Recipe.create(newRecipe);
        expect(createdRecipe.id).to.exist;

      });

    })

  });
});
