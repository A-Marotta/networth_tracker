const db = require('../../db/db')

const Asset = {
    create: (newAsset) => {
        const {
            user_id,
            asset_type, 
            asset_purchase_date,
            asset_purchase_value,
            asset_purchase_qty,
            asset_ticker,
            asset_current_value,
        } = newAsset

        const sql = `
            INSERT INTO asset 
            (user_id, asset_type, asset_purchase_date, asset_purchase_value, asset_purchase_qty, asset_ticker, asset_current_value)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        return db.query(sql, 
            [
                user_id, 
                asset_type, 
                asset_purchase_date,
                asset_purchase_value,
                asset_purchase_qty,
                asset_ticker,
                asset_current_value,
            ]
        )
    },
    findOne: (asset_id) => {
        const sql = `SELECT * FROM asset WHERE asset_id = $1`

        return db.query(sql, [asset_id])
    },
    findAll: (user_id) => {
        const sql = `SELECT * FROM asset WHERE user_id = $1`

        return db.query(sql, [user_id])
    },
    update: (asset_value, asset_id) => {
        const sql = `UPDATE asset SET asset_current_value = $1 WHERE asset_id = $2 returning asset.*`

        return db.query(sql, [asset_value, asset_id])
    },
    delete: (asset_id) => {
        const sql = `DELETE FROM asset WHERE asset_id = $1`

        return db.query(sql, [asset_id])
    }
}

module.exports = Asset