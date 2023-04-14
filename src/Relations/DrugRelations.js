module.exports = ({ Drug, DrugConflict }) => {
    Drug.hasMany(DrugConflict, {
      as: 'conflictingDrugsOne',
      foreignKey: 'drugIdOne',
    });
  
    Drug.hasMany(DrugConflict, {
      as: 'conflictingDrugsTwo',
      foreignKey: 'drugIdTwo',
    });
  };
  