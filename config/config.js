let path = require("path");
let fixture = path.join(__dirname, "../.env");
let dotenv = require('dotenv').config({ path: fixture })
let config = dotenv.parsed
module.exports = {
    local: {
        username: process.env.DBUSERNAME ? process.env.DBUSERNAME : config?.DBUSERNAME,
        password: process.env.PASSWORD ? process.env.PASSWORD : config?.PASSWORD,
        database: process.env.DBNAME ? process.env.DBNAME : config?.DBNAME,
        host: process.env.DBHOST ? process.env.DBHOST : config?.DBHOST,
        port: process.env.DBPORT ? process.env.DBPORT : config?.DBPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000,
        }
    },
    development: {
        username: process.env.DBUSERNAME ? process.env.DBUSERNAME : config?.DBUSERNAME,
        password: process.env.PASSWORD ? process.env.PASSWORD : config?.PASSWORD,
        database: process.env.DBNAME ? process.env.DBNAME : config?.DBNAME,
        host: process.env.DBHOST ? process.env.DBHOST : config?.DBHOST,
        port: process.env.DBPORT ? process.env.DBPORT : config?.DBPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000,
        }
    },
    production: {
        username: process.env.DBUSERNAME ? process.env.DBUSERNAME : config?.DBUSERNAME,
        password: process.env.PASSWORD ? process.env.PASSWORD : config?.PASSWORD,
        database: process.env.DBNAME ? process.env.DBNAME : config?.DBNAME,
        host: process.env.DBHOST ? process.env.DBHOST : config?.DBHOST,
        port: process.env.DBPORT ? process.env.DBPORT : config?.DBPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000,
        }
    }
};


