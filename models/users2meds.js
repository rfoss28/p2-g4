module.exports = function(sequelize, DataTypes) {
    var Users2meds = sequelize.define("users2meds", {
      user_id: DataTypes.INTEGER,
      med_id: DataTypes.INTEGER,
      users2meds_delete: DataTypes.BOOLEAN

    });
    return Users2meds;
  };

  // module.exports = function(sequelize, DataTypes) {
  //   var Burger = sequelize.define("Burger", {
  //     burger_name: DataTypes.STRING,
  //     devoured: {
  //       type: DataTypes.BOOLEAN,
  //       defaultValue: false
  //     }
  //   }, {
  //     classMethods: {
  //       associate: function(models) {
  //         // associations can be defined here
  //       }
  //     }
  //   });
  //   return Burger;
  // };

  // It is possible to create foreign keys:
//  bar_id: {
//   type: Sequelize.INTEGER,
//   references: {
//     // This is a reference to another model
//     model: Bar,
//     // This is the column name of the referenced model
//     key: 'id',
//     // This declares when to check the foreign key constraint. PostgreSQL only.
//     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//   }
// }
// })