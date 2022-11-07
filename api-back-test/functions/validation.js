const AWS = require("aws-sdk");
const xml2js = require('xml2js');
const moment = require('moment');
const crypto = require('crypto');
const luhn = require("luhn");
var validator = require("email-validator");

let yearcurrent = moment().year();
let yearend =yearcurrent+5;

async function getDatosCliente(email,card_number,cvv,expiration_year,expiration_month){
    //return new Promise((resolve, reject) => {
    let response = {};
        const errors = [];
        let card = luhn.validate(card_number);
        let validemail = validator.validate(email);
        console.log('los datos 2 son: ', email,card_number ,cvv ,expiration_month, expiration_year);
    try {
        if (!card){
            if (card_number.length<13 || card_number.length>16){
                errors.push({ NumberCreditCard: "Number Credit Card is Incorrect" });
            } 
            errors.push({ NumberCreditCard: "Credit Card is Incorrect" });
        }
        if (cvv.length<3 || cvv.length>4){
            errors.push({ NumberCreditCard: "Number CVV is Incorrect" });
        }
        if ((expiration_month.length<1 && expiration_month.length>2) || (expiration_month<1 && expiration_month>12) ){
            errors.push({ Expiration_month: "Expiration_month is Incorrect" });
        }
        if ((expiration_year.length!=4) || (expiration_year<yearcurrent || expiration_year>yearend) ){
            errors.push({ Expiration_month: "Expiration_year is Incorrect" });
        }
        if ((email.length<5 && email.length>100) || (!validemail) ){
            errors.push({ Expiration_month: "Email is Incorrect" });
        }


        if (Object.keys(errors).length) {
            response.statusCode = 400;
            response.body = JSON.stringify({
              data: "",
              message: "Failed Datos Clients",
              errors: errors,
            });
          }
        else {

            response.body = JSON.stringify({
                //message: "Order created successfully",
                //data: getOrderAcumaticaResult,
                errors: "",
              });
        }
    } catch (error) {
        response = error;
    }
     return response;   
    //});
}
module.exports = {
    getDatosCliente,
}