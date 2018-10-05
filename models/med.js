module.exports = function(sequelize, DataTypes) {
    var Med = sequelize.define("med", {
      med_id: DataTypes.INTEGER,
      med_name: DataTypes.STRING,
      med_desc: DataTypes.TEXT,
      med_delete: DataTypes.BOOLEAN

    });

    Med.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Med.belongsToMany(models.user, { 
        as: 'users', 
        through: { model: 'UserMed', unique: false }, 
        foreignKey: 'med_id',
        targetKey: 'id',
        timestamps: false

      });
    };
    return Med;
  };

  
  