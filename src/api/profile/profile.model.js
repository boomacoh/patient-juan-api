const Sequelize = require('sequelize');
const User = require('../user/user/user.model');
const config = require('../../config');

const Profile = sequelize.define('profile', {
  profileId: { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
  fullName: { type: Sequelize.VIRTUAL, get() { return `${this.firstName} ${this.lastName} ${this.suffix ? this.suffix : ''}` } },
  firstName: { type: Sequelize.STRING(255), allowNull: false },
  lastName: { type: Sequelize.STRING(255), allowNull: false },
  middleName: { type: Sequelize.STRING(255) },
  suffix: Sequelize.STRING(10),
  nickname: Sequelize.STRING,
  birthdate: { type: Sequelize.DATEONLY, allowNull: false },
  sex: Sequelize.STRING(50),
  civilStatus: Sequelize.STRING(20),
  nationality: Sequelize.STRING(50),
  citizenship: Sequelize.STRING(50),
  religion: Sequelize.STRING,
  bloodType: Sequelize.STRING(10),
  philhealthId: Sequelize.STRING(12),
  PRCLicenseNo: Sequelize.STRING,
  tinNo: Sequelize.STRING,
  image: Sequelize.STRING,
  contactNo: Sequelize.STRING,
  specialization: Sequelize.STRING,
  address: Sequelize.STRING
}, {
  setterMethods: {
    names(value) {
      this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1));
      this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1));
    },
    contactNo(value) {
      if (value) return this.setDataValue('contactNo', value.join(';'));
      this.setDataValue('contactNo', null);
    },
    specialization(value) {
      if (value) return this.setDataValue('specialization', value.join(';'));
      this.setDataValue('specialization', null);
    },
    image(value) {
      if (value) return this.setDataValue('image', `${config.apiUrl}/images/profile/${value}`);
      this.setDataValue('image', null);
    }
  },
  getterMethods: {
    contactNo() {
      contactNos = this.getDataValue('contactNo');
      if (contactNos) return contactNos.split(';');
    },
    specialization() {
      specializations = this.getDataValue('specialization');
      if (specializations) return specializations.split(';');
    }
  }
})

User.hasOne(Profile, { foreignKey: { name: 'userId', unique: { args: true, msg: 'User already has existing profile' } } });
Profile.belongsTo(User, { foreignKey: { name: 'userId', unique: { args: true, msg: 'User already has existing profile' } } });

module.exports = Profile;