import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './assets.css'

const baseURL = 'http://localhost:8080/api/'

export default function Assets() {
    const [assetTotal, setAssetTotal] = useState(0)
    const [hasAssetData, setHasAssetData] = useState(false)

    const antIcon = <LoadingOutlined style={{ fontSize: 26, color: 'blue' }} spin />;

    useEffect(() => {
        getAssetSumarries()
    }, [])

    function getAssetSumarries() {
        // need to read user_id from authentication session
        axios.post(`${baseURL}asset`, { user_id: 6 })
            .then(res => {
                let totalAssetAmount = 0
                
                res.data.forEach(record => {
                    totalAssetAmount += Number(record.asset_current_value)
                })
                setHasAssetData(true)
                setAssetTotal(Math.round(totalAssetAmount * 100) / 100)
            })
    }

    return (
        <div className="asset-wrapper">
            <div className="asset-value">
                {hasAssetData ? <h3 className="asset-amount">${assetTotal}</h3> : <Spin indicator={antIcon} />}
                <ArrowUpwardIcon className="asset-icon"/>
            </div>
        </div>
    )
}
