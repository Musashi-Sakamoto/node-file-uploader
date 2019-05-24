module.exports = {
  up: async (queryInterface, Sequelize) => [
    queryInterface.renameColumn('images', 'user_id', 'post_id')
  ],

  down: async (queryInterface, Sequelize) => [
    queryInterface.renameColumn('images', 'post_id', 'user_id')
  ]

};
