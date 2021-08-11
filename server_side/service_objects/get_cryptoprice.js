const price = require('crypto-price')

function crypto_ticker_data(ticker) {
    return price.getCryptoPrice('AUD', ticker)
}

async function crypto_data_manipulation(asset) {
    const ticker_data = await crypto_ticker_data(asset.asset_ticker)  
    asset.asset_ticker_data = ticker_data.price
    asset.asset_current_value = (ticker_data.price * asset.asset_purchase_qty).toFixed(2)

    return asset
}

module.exports = {
    crypto_ticker_data: crypto_ticker_data,
    crypto_data_manipulation: crypto_data_manipulation
}

