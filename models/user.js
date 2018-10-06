module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,

      user_med1: DataTypes.STRING,
      user_med2: DataTypes.STRING,
      user_med3: DataTypes.STRING,
      user_med4: DataTypes.STRING,
      user_med5: DataTypes.STRING,

      user_secid: DataTypes.INTEGER,
      user_delete: DataTypes.BOOLEAN

    });    
    
    return User;
    
  };


  