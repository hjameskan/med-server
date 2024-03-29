module.exports = ({ Prescription, User, Drug, DrugTakenRecord }) => {
    Prescription.belongsTo(User, {
      as: 'patient',
      foreignKey: 'patientId',
    });
  
    Prescription.belongsTo(User, {
      as: 'doctor',
      foreignKey: 'doctorId',
    });
  
    Prescription.belongsTo(Drug, {
      as: 'drug',
      foreignKey: 'drugId',
    });

    Prescription.hasMany(DrugTakenRecord, {
      foreignKey: 'prescriptionId',
    });
  };
  