const { db, Gardener, Plot, Vegetable } = require('./models');
const PlotVegetable = db.model('vegetable_plot');

db
  .sync({ force: true })
  .then(() => {
    console.log('We had it YEYEYEYEY!');
    return Promise.all([
      Vegetable.create({
        name: 'onion',
        color: 'red',
        planted_on: new Date(),
      }),
      Vegetable.create({
        name: 'onion',
        color: 'yellow',
        planted_on: new Date(),
      }),
      Vegetable.create({
        name: 'zucchini',
        color: 'green',
        planted_on: new Date(),
      }),
      Vegetable.create({
        name: 'squash',
        color: 'yellow',
        planted_on: new Date(),
      }),
    ]);
  })
  .then(vegetable => {
    return Promise.all([
      Gardener.create({
        name: 'Tom',
        age: 50,
        favoriteVegetableId: vegetable[0].id,
      }),
      Gardener.create({
        name: 'Jerry',
        age: 25,
        favoriteVegetableId: vegetable[2].id,
      }),
      vegetable,
    ]);
  })
  .then(gardener => {
    // console.log('gardener', gardener[gardener.length - 1]);
    return Promise.all([
      Plot.create({
        size: 100,
        shaded: true,
        gardenerId: gardener[0].id,
      }),
      gardener[gardener.length - 1],
    ]);
  })
  .then(plot => {
    // console.log(plot[plot.length - 1]);
    return Promise.all([
      PlotVegetable.create({
        vegetableId: plot[plot.length - 1][0].id,
        plotId: plot[0].id,
      }),
    ]);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    db.close();
  });
