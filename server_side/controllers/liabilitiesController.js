const router = require('express').Router()
const Liability = require('../models/Liabilities/liabilities.js')

// LIABILITY - CREATE ENDPOINT
router.post("/new", async (req, res) => {
    try {
        const newLiability = {
            user_id: req.body.user_id,
            liability_type: req.body.liability_type,
            liability_purchase_date: req.body.purchase_date,
            liability_purchase_value: req.body.purchase_value,
            liability_purchase_qty: req.body.purchase_qty,
            liability_current_value: req.body.current_value
        }

        Liability
            .create(newLiability)
            .then(dbRes => res.status(200).json(dbRes.rows[0]))

    } catch (err) {
        res.status(500).json(err)
    }
})

// LIABILITY - READ ONE ENDPOINT
router.get("/:id", async (req, res) => {
    try {
        Liability
            .findOne( req.params.id )
            .then( dbRes => res.status(200).json(dbRes.rows[0]) )
    } catch (err) {
        res.status(404).json(err)
    }
})

// LIABILITY - UPDATE ENDPOINT
router.patch("/:id/edit", async (req, res) => {
    try {
        const liability = await Liability.findOne( req.params.id )
        if(liability.rows.length === 0) return res.status(404).send("liability not found")
        
        Liability
            .update( req.body.current_value, req.params.id )
            .then( dbRes => res.status(200).json(dbRes.rows[0]) )
    } catch (err) {
        res.status(404).json(err)
    }
})

// LIABILITY - DELETE ENDPOINT
router.delete("/:id", async (req, res) => {
    try {
        const liability = await Liability.findOne( req.params.id )
        if(liability.rows.length === 0) return res.status(404).send("liability not found")
        
        Liability
            .delete( req.params.id )
            .then( dbRes => res.status(200).json('delete operation successful.') )
    } catch (err) {
        res.status(404).json(err)
    }       
})

// LIABILITY - READ ALL ENDPOINT
router.post("/", async (req, res) => {
    try {
        Liability
            .findAll( req.body.user_id )
            .then( dbRes => res.status(200).json(dbRes.rows) )
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router

