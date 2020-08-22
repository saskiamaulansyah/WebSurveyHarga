module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }, {
      freezeTableName: true,
      underscored: true
    });
    return User;
  };
  