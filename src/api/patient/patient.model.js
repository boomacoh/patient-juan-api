const Sequelize = require('sequelize');
const Test = require('../test/test.model');
const Institution = require('../institution/institution.model');

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
    mipId: Sequelize.INTEGER,
    memberId: Sequelize.STRING(255),
    mailingAddress: Sequelize.STRING(255),
    contactNo: Sequelize.STRING,
    email: Sequelize.STRING(255),
    emergencyContactFullName: Sequelize.STRING(255),
    emergencyContactRelationship: Sequelize.STRING,
    emergencyContactNo: Sequelize.STRING,
    referringPhysId: Sequelize.INTEGER(11),
    referringPhysFullName: Sequelize.STRING(255)
}, {
    setterMethods: {
        firstName(value) {
            this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1));
        },
        lastName(value) {
            this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1))
        },
        middleName(value) {
            if (value) return this.setDataValue('middleName', value.charAt(0).toUpperCase() + value.slice(1))
            this.setDataValue('middleName', null)
        },
        nickname(value) {
            if (value) return this.setDataValue('nickname', value.charAt(0).toUpperCase() + value.slice(1))
            this.setDataValue('nickname', null)
        },
        contactNo(value) {
            if (value) return this.setDataValue('contactNo', value.join(';'));
            this.setDataValue('contactNo', null)
        },
        emergencyContactNo(value) {
            if (value) return this.setDataValue('emergencyContactNo', value.join(';'));
            this.setDataValue('emergencyContactNo', null)
        }
    },
    getterMethods: {
        contactNo() {
            contactNos = this.getDataValue('contactNo');
            if (contactNos) return contactNos.split(';');
        },
        emergencyContactNo() {
            contactNos = this.getDataValue('emergencyContactNo');
            if (contactNos) return contactNos.split(';');
        }
    }
});

// Patient.hasMany(Test, { foreignKey: 'patientId' });
Patient.belongsTo(Institution, { foreignKey: { name: 'institutionId', allowNull: false } });
Institution.hasMany(Patient, { foreignKey: { name: 'institutionId', allowNull: false } });
//hasOne -> targetModel
//belongsTo -> sourceModel

module.exports = Patient;
