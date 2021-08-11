import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './liabilities.css'

const baseURL = 'http://localhost:8080/api/'

export default function Liabilities() {
    const [liabilityTotal, setLiabilityTotal] = useState(0)
    const [hasLiabilityData, setHasLiabilityData] = useState(false)

    const antIcon = <LoadingOutlined style={{ fontSize: 26, color: 'blue' }} spin />

    useEffect(() => {
        getLiabilitySumarries()
    }, [])

    function getLiabilitySumarries() {
        // need to read user_id from authentication session
        axios.post(`${baseURL}liability`, { user_id: 6 })
            .then(res => {
                let totalLiabilityAmount = 0
                
                res.data.forEach(record => {
                    let multiplier = 0

                    record.liability_purchase_qty === null 
                        ? multiplier = 1 
                        : multiplier = record.liability_purchase_qty

                    totalLiabilityAmount += multiplier * record.liability_current_value
                })
                setHasLiabilityData(true)
                setLiabilityTotal(Math.round(totalLiabilityAmount * 100) / 100)
            })
    }

    return (
        <div className="liability-wrapper">
            <div className="liability-value">
                {hasLiabilityData ? <h3 className="liability-amount">${liabilityTotal}</h3> : <Spin indicator={antIcon} />}
                <ArrowDownwardIcon className="liability-icon"/>
            </div>
        </div>
    )
}
