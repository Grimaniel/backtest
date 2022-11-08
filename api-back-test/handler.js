'use strict';
const crypto = require('crypto');
const moment = require('moment');
const multipartParser = require('lambda-multipart-parser');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
//const mysql = require('./src/db/mysql');

const validation = require('./functions/validation.js');
const authorizer = require('./functions/authorizer.js');
//Functions

const { StatusCodes } = require('http-status-codes');
//headers
const _headers_get = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Content-Type": "application/json"
};

const _headers_post = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Content-Type": "application/json"
};

const getDatosCliente = async (event, context, callback) => {
  try {
    const params = event.queryStringParameters;
    const email = params.email;
    const card_number = params.card_number;
    const cvv = params.cvv;
    const expiration_year = params.expiration_year;
    const expiration_month = params.expiration_month;
    console.log('los datos son: ', email,card_number ,cvv ,expiration_month, expiration_year);
    const res = await validation.getDatosCliente(email,card_number,cvv,expiration_year,expiration_month);
    return { statusCode: StatusCodes.OK, headers: _headers_get, body: JSON.stringify({ message: "Information extracted successfully", data: res, errors: "" }) }
  } catch (err) {
    return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, headers: _headers_get, body: JSON.stringify({ message: "Information not extracted", data: "", errors: err }) }
  }
};

const auth = async (event, context, callback) => {
  try {
   const data = await authorizer.authenticate(event);
  }
  catch (err) {
      console.log(err);
      return context.fail("Unauthorized");
  }
  return data;
};
module.exports = {
  getDatosCliente,
  auth,
};