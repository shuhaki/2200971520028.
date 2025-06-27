const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6);

function genCode() {
  return nanoid();
}

function validateCustom(code) {
  return /^[0-9a-zA-Z]{4,10}$/.test(code);
}

module.exports = { genCode, validateCustom };
