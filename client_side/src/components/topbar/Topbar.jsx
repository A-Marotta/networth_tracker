import React from 'react'
import Menu from "./Menu"

import './topbar.css'

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbar-left">
                <Menu />
            </div>

            <div className="topbar-centre">
                <h3 className="topbar-title">Networth Tracker</h3>
            </div>

            <div className="topbar-right"></div>
        </div>
    )
}

export default Topbar
