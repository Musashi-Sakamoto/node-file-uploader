

module.exports = {
  up: async (queryInterface, Sequelize) => [
    queryInterface.renameColumn('images', 'url', 'key')
  ],

  down: async (queryInterface, Sequelize) => [
    queryInterface.renameColumn('images', 'key', 'url')
  ]

};
