const Sequelize = require('sequelize');
const config = require('../../config');

const Profile = sequelize.define('profile', {
  fullName: Sequelize.VIRTUAL,
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
  specialization: Sequelize.STRING,
  tinNo: Sequelize.STRING,
  image: Sequelize.STRING,
  contactNo: Sequelize.STRING,
  address: Sequelize.STRING,
  title: Sequelize.STRING,
  type: { type: Sequelize.STRING }
}, {
  setterMethods: {
    firstName(value) {
      this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1));
    },
    lastName(value) {
      this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1));
    },
    middleName(value) {
      if (value) return this.setDataValue('middleName', value.charAt(0).toUpperCase() + value.slice(1));
    },
    contactNo(value) {
      if (value) return this.setDataValue('contactNo', value.join(';'));
      this.setDataValue('contactNo', null);
    },
    specialization(value) {
      if (value) return this.setDataValue('specialization', value.join(';'));
      this.setDataValue('specialization', null);
    },
    title(value){
      if(value) return this.setDataValue('title', value.join(';'));
      this.setDataValue('title', null);
    },
    image(value) {
      if (value) return this.setDataValue('image', `${config.apiUrl}/images/profile/${value}`);
      this.setDataValue('image', null);
    }
  },
  getterMethods: {
    fullName(){
      if(this.suffix) return `${this.firstName} ${this.lastName} ${this.suffix}`;
      return `${this.firstName} ${this.lastName}`;
    },
    contactNo() {
      contactNos = this.getDataValue('contactNo');
      if (contactNos) return contactNos.split(';');
      return [];
    },
    specialization() {
      specializations = this.getDataValue('specialization');
      if (specializations) return specializations.split(';');
      return [];
    },
    title(){
      titles = this.getDataValue('title');
      if(titles) return titles.split(';');
      return [];
    }
  }
})

module.exports = Profile;