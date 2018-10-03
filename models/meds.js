module.exports = function(sequelize, DataTypes) {
    var Med = sequelize.define("meds", {
      med_id: DataTypes.INTEGER,
      med_name: DataTypes.STRING,
      med_desc: DataTypes.TEXT,
      med_delete: DataTypes.BOOLEAN

    });
    return Med;
  };