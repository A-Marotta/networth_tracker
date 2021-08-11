const yahooStockPrices = require('yahoo-stock-prices')

function asx_ticker_data(ticker) {
    return yahooStockPrices.getCurrentData(`${ticker.toUpperCase()}.AX`)
}

async function asx_data_manipulation(asset) {
    const ticker_object = await asx_ticker_data(asset.asset_ticker)  
    asset.asset_ticker_data = ticker_object
    asset.asset_current_value = (ticker_object.price * asset.asset_purchase_qty).toFixed(2)

    return asset
}

module.exports = {
    asx_ticker_data: asx_ticker_data,
    asx_data_manipulation: asx_data_manipulation
}

