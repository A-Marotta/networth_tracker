import React from 'react'
import Assets from "../assets/Assets"
import Liabilities from "../liabilities/Liabilities"

import './mainContent.css'

export default function MainContent() {
    return (
        <div className="main-wrapper">
            <Assets />
            <Liabilities /> 
        </div>
    )
}
