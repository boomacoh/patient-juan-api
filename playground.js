// let array = ['system', 'clinic:doctor', 'clinic:staff'];
// let x = array.join(' ');
// let y = x.split(' ');

// console.log(typeof x, x);
// console.log(typeof y, y);

// let name = 'abddere';

// x = name.charAt(0).toUpperCase() + name.slice(1);


// console.log(x);

const access = ['system', 'clinic:doctor', 'clinic:staff'];
const requiredRole = ['clinic:doctor', 'system'];
const myRoles = ['clinic:staff', 'system'];

const isPermitted = requiredRole.some(role => myRoles.includes(role));

console.log(isPermitted);



// console.log(x);