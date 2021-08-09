const {Pool} = require('pg') 

let db;
if (process.env.PRODUCTION) {
    db = new Pool({
        connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
    db = new Pool({
    database: 'net_tracker'
  })
}

module.exports = db
