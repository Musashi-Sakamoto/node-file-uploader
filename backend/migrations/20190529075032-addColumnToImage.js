

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('images', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'image'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('images', 'type');
  }
};
