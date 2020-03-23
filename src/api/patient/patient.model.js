const Sequelize = require('sequelize');
const Test = require('../test/test.model');

const Patient = sequelize.define('patient', {
    patientId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    firstName: { type: Sequelize.STRING(255), allowNull: false },
    middleName: Sequelize.STRING(255),
    lastName: { type: Sequelize.STRING(255), allowNull: false },
    fullName: { type: Sequelize.VIRTUAL, get() { return `${this.firstName} ${this.lastName}` } },
    suffix: Sequelize.STRING(50),
    nickname: Sequelize.STRING(255),
    birthdate: { type: Sequelize.DATEONLY, allowNull: false },
    sex: Sequelize.STRING(50),
    civilStatus: Sequelize.STRING(50),
    nationality: Sequelize.STRING(50),
    citizenship: Sequelize.STRING(50),
    religion: Sequelize.STRING(50),
    bloodType: Sequelize.STRING(50),
    philhealthId: Sequelize.STRING(50),
    withHMO: Sequelize.BOOLEAN,
    mipId: Sequelize.STRING(50),
    memberId: Sequelize.STRING(255),
    mailingAddress: Sequelize.STRING(255),
    contactNo1: Sequelize.STRING(50),
    contactNo2: Sequelize.STRING(50),
    contactNo3: Sequelize.STRING(50),
    email: Sequelize.STRING(255),
    emergencyContactFullName: Sequelize.STRING(255),
    emergencyContactNo1: Sequelize.STRING(50),
    emergencyContactNo2: Sequelize.STRING(50),
    emergencyContactRelationship: Sequelize.STRING(50),
    referringPhysId: Sequelize.INTEGER(11),
    referringPhysFullName: Sequelize.STRING(255)
}, {
    timestamps: true,
});

Patient.hasMany(Test, { foreignKey: 'patientId' });
//hasOne -> targetModel
//belongsTo -> sourceModel

module.exports = Patient;
