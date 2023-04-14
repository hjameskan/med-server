module.exports = ({ DrugTakenRecord, User, Prescription, Drug }) => {
    DrugTakenRecord.belongsTo(User, {
      as: 'patient',
      foreignKey: 'patientId',
    });
  
    DrugTakenRecord.belongsTo(Prescription, {
      as: 'prescription',
      foreignKey: 'prescriptionId',
    });
  
    DrugTakenRecord.belongsTo(Drug, {
      as: 'drug',
      foreignKey: 'drugId',
    });
  };
  