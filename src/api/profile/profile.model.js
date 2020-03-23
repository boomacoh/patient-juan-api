const Sequelize = require('sequelize');
const User = require('../user/user/user.model');
const config = require('../../config');

const Profile = sequelize.define('profile', {
  profileId: { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
  fullName: { type: Sequelize.VIRTUAL, get() { return `${this.firstName} ${this.lastName}` } },
  firstName: {
    type: Sequelize.STRING(255), allowNull: false,
    set(value) {
      this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1));
    }
  },
  lastName: {
    type: Sequelize.STRING(255), allowNull: false,
    set(value) {
      this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1));
    }
  },
  middleName: {
    type: Sequelize.STRING(255),
    set() {
      this.setDataValue('middleName', value.charAt(0).toUpperCase() + value.slice(1));
    }
  },
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
  image: {
    type: Sequelize.STRING, set(value) {
      this.setDataValue('image', `${config.apiUrl}/images/profile/${value}`);
    }
  }
})

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;