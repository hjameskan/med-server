module.exports = ({ DrugConflict, Drug }) => {
    DrugConflict.belongsTo(Drug, {
      as: 'drugOne',
      foreignKey: 'drugIdOne',
    });
  
    DrugConflict.belongsTo(Drug, {
      as: 'drugTwo',
      foreignKey: 'drugIdTwo',
    });
  };
  