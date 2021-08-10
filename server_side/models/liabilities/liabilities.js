const db = require('../../db/db')

const Liability = {
    create: (newLiability) => {
        const {
            user_id,
            liability_type, 
            liability_purchase_date,
            liability_purchase_value,
            liability_purchase_qty,
            liability_current_value,
        } = newLiability

        const sql = `
            INSERT INTO liability 
            (user_id, liability_type, liability_purchase_date, liability_purchase_value, liability_purchase_qty, liability_current_value)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning liability.*
        `

        return db.query(sql, 
            [
                user_id, 
                liability_type, 
                liability_purchase_date,
                liability_purchase_value,
                liability_purchase_qty,
                liability_current_value
            ]
        )
    },
    findOne: (liability_id) => {
        const sql = `SELECT * FROM liability WHERE liability_id = $1`

        return db.query(sql, [liability_id])
    },
    findAll: (user_id) => {
        const sql = `SELECT * FROM liability WHERE user_id = $1`

        return db.query(sql, [user_id])
    },
    update: (liability_value, liability_id) => {
        const sql = `UPDATE liability SET liability_current_value = $1 WHERE liability_id = $2 returning liability.*`

        return db.query(sql, [liability_value, liability_id])  
    },
    delete: (liability_id) => {
        const sql = `DELETE FROM liability WHERE liability_id = $1`

        return db.query(sql, [liability_id])
    }
}

module.exports = Liability