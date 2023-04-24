const { Diet } = require('./models/Diet')
const { conn } = require('./db');

const initialDiets = [
  { name: 'Gluten Free' },
  { name: 'Ketogenic' },
  { name: 'Vegetarian' },
  { name: 'Lacto-Vegetarian' },
  { name: 'Ovo-Vegetarian' },
  { name: 'Vegan' },
  { name: 'Pescetarian' },
  { name: 'Paleolithic' },
  { name: 'Primal' },
  { name: 'Whole30' },
];
    
conn.sync().then(() => {
  Diet.bulkCreate(initialDiets)
    .then(() => console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'))
    .catch((err) => console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', err))
    .finally(() => conn.close());
});
