const fs = require('fs');
const bcrypt = require('bcryptjs');

const sequelize = require('./config/database');
const Models = require('./Models');
const Relations = require('./Relations');

const {
    User,
    Role,
    UserRole,
    Token,
    Drug,
    Prescription,
    DrugConflict,
    DrugTakenRecord,
} = Models;

Object.values(Relations).forEach((relation) => relation(Models));

// This function will reset the sequence, for injected ids to start from the max id + 1
async function resetSequence(sequelize, tableName, columnName) {
  console.log(`Resetting sequence for ${tableName}...`);
  const maxIdResult = await sequelize.query(`SELECT MAX(${columnName}) FROM "${tableName}"`);
  const maxId = maxIdResult[0][0].max + 1 || 1;
  console.log(`Resetting sequence for ${tableName} to start from ${maxId}`);
  await sequelize.query(`SELECT setval((SELECT pg_get_serial_sequence('"${tableName}"', '${columnName}')), ${maxId}, false)`);

}

async function prepopulateDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  
    console.log('Prepopulating database...');
  
    const usersData = await fs.promises.readFile('src/db-dev-data/users.json', 'utf8');
    const users = JSON.parse(usersData);
  
    for (const user of users) {
      const existingUser = await User.findOne({ where: { username: user.username, email: user.email } });
      if (!existingUser) {
         // Generate a salt to use for hashing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await User.create({ username: user.username, email: user.email, password: hashedPassword });
        console.log(`Data inserted into User table: ${user.username}, ${user.email}`);
      } else {
        console.log(`Data already exists in User table: ${user.username}, ${user.email}, no need to pre-populate`);
      }
    }
  
    const rolesData = await fs.promises.readFile('src/db-dev-data/roles.json', 'utf8');
    const roles = JSON.parse(rolesData);
  
    for (const role of roles) {
      const existingRole = await Role.findOne({ where: { id: role.id, name: role.name } });
      if (!existingRole) {
        await Role.create({ id: role.id, name: role.name });
        console.log(`Data inserted into Role table: ${role.id}, ${role.name}`);
      } else {
        console.log(`Data already exists in Role table: ${role.name}, ${role.name}, no need to pre-populate`);
      }
    }
  
    const userRolesData = await fs.promises.readFile('src/db-dev-data/userRoles.json', 'utf8');
    const userRoles = JSON.parse(userRolesData);
  
    for (const userRole of userRoles) {
      const existingUserRole = await UserRole.findOne({ where: { userId: userRole.userId, roleId: userRole.roleId } });
      if (!existingUserRole) {
        await UserRole.create({ userId: userRole.userId, roleId: userRole.roleId }, { force: true });
        console.log(`Data inserted into UserRole table: ${userRole.userId}, ${userRole.roleId}`);
      } else {
        console.log(`Data already exists in UserRole table: ${userRole.userId}, ${userRole.roleId}, no need to pre-populate`);
      }
    }

    // Inject data from drugs.json
    const drugsData = await fs.promises.readFile('src/db-dev-data/drugs.json', 'utf8');
    const drugs = JSON.parse(drugsData);
  
    for (const drug of drugs) {
      const existingDrug = await Drug.findOne({ where: { id: drug.id, name: drug.name } });
      if (!existingDrug) {
        await Drug.create({ id: drug.id, name: drug.name });
        console.log(`Data inserted into Drug table: ${drug.id}, ${drug.name}`);
      } else {
        console.log(`Data already exists in Drug table: ${drug.id}, ${drug.name}, no need to pre-populate`);
      }
    }

    // Inject data from drugsConflicts.json
    const drugConflictsData = await fs.promises.readFile('src/db-dev-data/drugsConflicts.json', 'utf8');
    const drugConflicts = JSON.parse(drugConflictsData);
  
    for (const drugConflict of drugConflicts) {
      const existingDrugConflict = await DrugConflict.findOne({ where: { id: drugConflict.id, drugIdOne: drugConflict.drugIdOne, drugIdTwo: drugConflict.drugIdTwo } });
      if (!existingDrugConflict) {
        await DrugConflict.create({ id: drugConflict.id, drugIdOne: drugConflict.drugIdOne, drugIdTwo: drugConflict.drugIdTwo });
        console.log(`Data inserted into DrugConflict table: ${drugConflict.id}, ${drugConflict.drugIdOne}, ${drugConflict.drugIdTwo}`);
      } else {
        console.log(`Data already exists in DrugConflict table: ${drugConflict.id}, ${drugConflict.drugIdOne}, ${drugConflict.drugIdTwo}, no need to pre-populate`);
      }
    }

    // Inject data from prescriptions.json
    const prescriptionsData = await fs.promises.readFile('src/db-dev-data/prescriptions.json', 'utf8');
    const prescriptions = JSON.parse(prescriptionsData);

    for (const prescription of prescriptions) {
      const existingPrescription = await Prescription.findOne({
        where: {
          id: prescription.id,
          patientId: prescription.patientId,
          doctorId: prescription.doctorId,
          drugId: prescription.drugId,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          duration: prescription.duration,
        },
      });
      if (!existingPrescription) {
        await Prescription.create({
          id: prescription.id,
          patientId: prescription.patientId,
          doctorId: prescription.doctorId,
          drugId: prescription.drugId,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          duration: prescription.duration,
        });
        console.log(`Data inserted into Prescription table: ${prescription.id}, ${prescription.patientId}, ${prescription.doctorId}, ${prescription.drugId}`);
      } else {
        console.log(`Data already exists in Prescription table: ${prescription.id}, ${prescription.patientId}, ${prescription.doctorId}, ${prescription.drugId}, no need to pre-populate`);
      }
    }

    // Inject data from drugsTakenRecord.json
    const drugsTakenRecordData = await fs.promises.readFile('src/db-dev-data/drugsTakenRecord.json', 'utf8');
    const drugsTakenRecords = JSON.parse(drugsTakenRecordData);

    for (const record of drugsTakenRecords) {
      const existingRecord = await DrugTakenRecord.findOne({
        where: {
          id: record.id,
          patientId: record.patientId,
          prescriptionId: record.prescriptionId,
          drugId: record.drugId,
          dateTime: record.dateTime,
          taken: record.taken,
        },
      });
      if (!existingRecord) {
        await DrugTakenRecord.create({
          id: record.id,
          patientId: record.patientId,
          prescriptionId: record.prescriptionId,
          drugId: record.drugId,
          dateTime: record.dateTime,
          taken: record.taken,
        });
        console.log(`Data inserted into DrugTakenRecord table: ${record.id}, ${record.patientId}, ${record.prescriptionId}, ${record.drugId}`);
      } else {
        console.log(`Data already exists in DrugTakenRecord table: ${record.id}, ${record.patientId}, ${record.prescriptionId}, ${record.drugId}, no need to pre-populate`);
      }
    }

    
    await resetSequence(sequelize, 'DrugTakenRecords', 'id'); // Reset sequence for DrugTakenRecords table
  
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

prepopulateDatabase();

module.exports = {
    sequelize,
}
