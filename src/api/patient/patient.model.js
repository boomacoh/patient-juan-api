const Sequelize = require('sequelize');

const Patient = sequelize.define('patient', {
    fullName: Sequelize.VIRTUAL,
    firstName: { type: Sequelize.STRING(255), allowNull: false },
    middleName: Sequelize.STRING(255),
    lastName: { type: Sequelize.STRING(255), allowNull: false },
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
    hmo: Sequelize.STRING,
    mailingAddress: Sequelize.STRING(255),
    contactNo: Sequelize.STRING,
    email: Sequelize.STRING(255),
    emergencyContactFullName: Sequelize.STRING(255),
    emergencyContactRelationship: Sequelize.STRING,
    emergencyContactNo: Sequelize.STRING,
    image: Sequelize.STRING
}, {
    scopes: {
        institution: (institutionId) => { return { where: { institutionId: institutionId } } }
    },
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
        }
    },
    getterMethods: {
        fullName() {
            if (this.suffix) return `${this.firstName} ${this.lastName} ${this.suffix}`;
            return `${this.firstName} ${this.lastName}`;
        }
    },
    hooks: {
        afterCreate: (patient, options) => {
            patient.createMedicalHistory()
            .then(mh => {
                mh.createPastMedicalHistory();
                mh.createFamilyMedicalHistory();
                mh.createSocialPersonalHistory();
                if(patient.sex === 'Female') mh.createObGyneHistory();
            });
        }
    }
});


//hasOne -> targetModel
//belongsTo -> sourceModel

module.exports = Patient;
