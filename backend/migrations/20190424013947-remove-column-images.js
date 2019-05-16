

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('images', 'name'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('images', 'name', {
    allowNull: false,
    type: Sequelize.STRING
  })
};
