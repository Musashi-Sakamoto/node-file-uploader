

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'users_email_unique'
    });
    await queryInterface.addConstraint('users', ['name'], {
      type: 'unique',
      name: 'users_name_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.removeConstraint('users', 'users_email_unique');
    await queryInterface.removeConstraint('users', 'users_name_unique');
  }
};
