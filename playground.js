// const access = ['system', 'clinic:doctor', 'clinic:staff'];
// const requiredRole = ['clinic:doctor', 'system'];
// const myRoles = ['clinic:staff', 'system'];

// const isPermitted = requiredRole.some(role => myRoles.includes(role));

// console.log(isPermitted);
const file = '1585371354900.png';
const fs = require('fs');
const path = require('path');

fs.unlink(path.join(__dirname, './src/public/images/profile/', file), (err) => {
  if (err) throw new err
  console.log(`${file} deleted!`);
});
