import { hashString } from '../utils/stringUtil';

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
    const password = await hashString('password');
    await queryInterface.bulkInsert('users', [{
      name: 'Musashi',
      email: '1292602b@gmail.com',
      password,
      isVerified: true,
      createdAt: '9999-12-31 23:59:59',
      updatedAt: '9999-12-31 23:59:59'
    }], {});
  },


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})

  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

};
