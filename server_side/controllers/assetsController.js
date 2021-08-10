const router = require('express').Router()
const Asset = require('../models/assets/assets.js')

// ASSET - CREATE ENDPOINT
router.post("/new", async (req, res) => {
    try {
        const newAsset = {
            user_id: req.body.user_id,
            asset_type: req.body.asset_type,
            asset_purchase_date: req.body.purchase_date,
            asset_purchase_value: req.body.purchase_value,
            asset_purchase_qty: req.body.purchase_qty,
            asset_ticker: req.body.ticker,
            asset_current_value: req.body.current_value
        }

        Asset
            .create(newAsset)
            .then(dbRes => res.status(200).json(dbRes.rows[0]))

    } catch (err) {
        res.status(500).json(err)
    }
})

// ASSET - READ ONE ENDPOINT
router.get("/:id", async (req, res) => {
    try {
        Asset
            .findOne( req.params.id )
            .then( dbRes => res.status(200).json(dbRes.rows[0]) )
    } catch (err) {
        res.status(404).json(err)
    }
})

// ASSET - UPDATE ENDPOINT
router.patch("/:id/edit", async (req, res) => {
    try {
        const asset = await Asset.findOne( req.params.id )
        if(asset.rows.length === 0) return res.status(404).send("asset not found")

        Asset
            .update( req.body.current_value, req.params.id )
            .then( dbRes => res.status(200).json(dbRes.rows[0]) )
    } catch (err) {
        res.status(404).json(err)
    }
})

// ASSET - DELETE ENDPOINT
router.delete("/:id", async (req, res) => {
    try {
        const asset = await Asset.findOne( req.params.id )
        if(asset.rows.length === 0) return res.status(404).send("asset not found")

        Asset
            .delete( req.params.id )
            .then( dbRes => res.status(200).json('delete operation successful.') )
    } catch (err) {
        res.status(404).json(err)
    }    
})

// ASSET - READ ALL ENDPOINT
router.get("/", async (req, res) => {
    try {
        Asset
            .findAll( req.body.user_id )
            .then( dbRes => res.status(200).json(dbRes.rows) )
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router