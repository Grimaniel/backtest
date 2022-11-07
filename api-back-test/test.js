const moment = require('moment');
const luhn = require("luhn");
let yearcurrent = moment().year();
let yearend =yearcurrent+5;
card_number= 2131232132131221123;
let card = luhn.validate(card_number);

console.log('año 1', yearcurrent);
console.log('año 2', yearend);
console.log('tarjeta ', card);