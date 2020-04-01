'use strict'
module.exports = (sequelize, DataTypes) => {
  const schema = {
    schemeId: { type: DataTypes.STRING, primaryKey: true }
  }

  const options = {
    freezeTableName: true,
    tableName: 'schemes'
  }

  const Scheme = sequelize.define('schemes', schema, options)

  Scheme.associate = function (models) {
    // associations can be defined here
  }

  return Scheme
}
