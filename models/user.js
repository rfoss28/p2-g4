module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_secid: DataTypes.INTEGER,
      user_delete: DataTypes.BOOLEAN

    });

    
    User.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      User.belongsToMany(models.med, { 
        as: 'meds', 
        through: { model: 'UserMed', unique: false }, 
        foreignKey: 'user_id',
        targetKey: 'id',
        timestamps: false

      });
    };
    return User;
    
  };

  