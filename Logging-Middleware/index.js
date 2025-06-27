const axios = require('axios');
const { LOG_API, ACCESS_TOKEN } = require('./config'); // or env

async function log(stack, level, pkg, message) {
  try {
    await axios.post(LOG_API, {
      stack, level, package: pkg, message
    }, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
  } catch (err) {
    // ignore or retry
  }
}

module.exports = { log };
