

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('users', [{
      name: 'Musashi',
      email: 'emailemail@email.com',
      password: '$2y$12$rZgc7vLXbuvijuRlvb1xqutSIuFG6MW7cbe2hZpcDaeCM0xMj6sMq',
      createdAt: '9999-12-31 23:59:59',
      updatedAt: '9999-12-31 23:59:59'
    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})

  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

};
