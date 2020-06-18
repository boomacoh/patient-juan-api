const Sequelize = require('sequelize');

const Patient = sequelize.define('patient', {
    firstName: { type: Sequelize.STRING(255), allowNull: false },
    middleName: Sequelize.STRING(255),
    lastName: { type: Sequelize.STRING(255), allowNull: false },
    fullName: Sequelize.VIRTUAL,
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
        },
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
            });
        }
    }
});


//hasOne -> targetModel
//belongsTo -> sourceModel

module.exports = Patient;
