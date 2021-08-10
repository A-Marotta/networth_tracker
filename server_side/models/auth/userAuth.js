const db = require('../../db/db')

const UserAuth = {
    create: (newUser) => {
        const {email, name, username, password_digest} = newUser

        const sql = `
            INSERT into USERS 
            (email, name, username, password_digest)
            VALUES ($1, $2, $3, $4)
        `

        return db.query(sql, [email, name, username, password_digest])
    },
    findUser: (email) => {
        const sql = `SELECT * FROM users WHERE email = $1`

        return db.query(sql, [email])
    }
}

module.exports = UserAuth