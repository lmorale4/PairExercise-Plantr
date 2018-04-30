const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {
  logging: false,
});

const Gardener = db.define('garderner', {
  name: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
});

const Plot = db.define('plot', {
  size: {
    type: Sequelize.INTEGER,
  },
  shaded: {
    type: Sequelize.BOOLEAN,
  },
});

const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  planted_on: {
    type: Sequelize.DATE,
  },
});

Plot.belongsTo(Gardener, { foreignKey: 'gardenerId' });
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' });
Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' });
Gardener.belongsTo(Vegetable, { foreignKey: 'favoriteVegetableId' });

module.exports = { db, Gardener, Plot, Vegetable };
