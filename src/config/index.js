/**
 * @fileoverview Configuration file.
 */

require('dotenv').config();

module.exports = {
  app: {
    env: process.env.NODE_ENV,
  },
  api: {
    base: process.env.API_BASE,
  },
};
