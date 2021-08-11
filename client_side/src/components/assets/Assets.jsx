import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

import './assets.css'

const baseURL = 'http://localhost:8080/api/'

export default function Assets() {
    const [assetTotal, setAssetTotal] = useState(0)

    useEffect(() => {
        getAssetSumarries()
    }, [])

    function getAssetSumarries() {
        // need to read user_id from authentication session
        axios.post(`${baseURL}asset`, { user_id: 6 })
            .then(res => {
                let totalAssetAmount = 0
                
                res.data.forEach(record => {
                    let multiplier = 0

                    record.asset_purchase_qty === null 
                        ? multiplier = 1 
                        : multiplier = record.asset_purchase_qty

                    totalAssetAmount += multiplier * record.asset_current_value
                })

                setAssetTotal(Math.round(totalAssetAmount * 100) / 100)
            })
    }

    return (
        <div className="asset-wrapper">
            <div className="asset-value">
                <h3 className="asset-amount">${assetTotal}</h3>
                <ArrowUpwardIcon className="asset-icon"/>
            </div>
        </div>
    )
}
