

module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  post.associate = function (models) {
    // associations can be defined here
    models.post.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };
  return post;
};
