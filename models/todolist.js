'use strict';
module.exports = function(sequelize, DataTypes) {
  var todoList = sequelize.define('todoList', {
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
    is_completed:{ type: DataTypes.BOOLEAN, defaultValue: false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todoList;
};