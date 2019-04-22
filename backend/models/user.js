const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  user.validPassword = async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  };
  return user;
};
