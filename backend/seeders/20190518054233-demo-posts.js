

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkInsert('posts', [...Array(100)].map((_, i) => ({
      title: `title${i}`,
      description: `description${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
      user_id: 1,
      createdAt: '9999-12-31 23:59:59',
      updatedAt: '9999-12-31 23:59:59'
    })), {});
  },


  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('posts', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
