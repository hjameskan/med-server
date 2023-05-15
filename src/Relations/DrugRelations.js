module.exports = ({ Drug, DrugConflict, Prescription }) => {
    Drug.hasMany(DrugConflict, {
      as: 'conflictingDrugsOne',
      foreignKey: 'drugIdOne',
    });
  
    Drug.hasMany(DrugConflict, {
      as: 'conflictingDrugsTwo',
      foreignKey: 'drugIdTwo',
    });
    
    Drug.hasMany(Prescription, {
      as: 'prescriptions',
      foreignKey: 'drugId',
    });
  };
  