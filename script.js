var userSelectElement = document.getElementById("fromCurrency");
var exchangeSelectElement = document.getElementById("toCurrency");

var userFlagElement = document.getElementById("userFlag")
var exchangeFlagElement = document.getElementById("exchangeFlag")

var userCountry = ""
var exchangeCountry = ""

var userFlagUrl = `https://flagsapi.com/${userCountry}/flat/64.png`;
var exchangeFlagUrl = `https://flagsapi.com/${exchangeCountry}/flat/64.png`;

const countryList = {"IN":"INR","US":"USD","AU":"AUD","RU":"RUB"}
const exchangeSiteUrl = "https://open.er-api.com/v6/latest/USD"

var userCurrencyElement = document.getElementById("userCurrencyValue")
var exchangedCurrencyElement = document.getElementById("exchangedCurrencyValue")

// curr1 -> USD
// USD -> curr2
var exchangeRates

const fetchUSD = async () =>{
    let conversions = await fetch(exchangeSiteUrl)
    let conversionsProcessed = await conversions.json()
    exchangeRates = conversionsProcessed.rates
    console.log(exchangeRates);
}
fetchUSD()

const currencyToUSD = (currency, formatOfCurrency) =>{
    // 1USD -> 83INR
    // 163INR == 163/83USD -> 2USD
    let usdPerUnit = exchangeRates[formatOfCurrency]
    return currency/usdPerUnit
}

const USDToCurrency = (usd, format) =>{
    let usdPerUnit = exchangeRates[format]
    return usd*usdPerUnit
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function exchangeCurrency() {

    //EXCHANGE CURRENCY
    var userCurrency = document.getElementById("userCurrency").value
    var userCurrencyFormat = userSelectElement.value;

    var exchangeCurrency = 0
    var exchangeCurrencyFormat = exchangeSelectElement.value;

    userCurrencyElement.innerHTML = userCurrency
    let userCurrencyInUSD = currencyToUSD(userCurrency,userCurrencyFormat)
   
    exchangeCurrency = USDToCurrency(userCurrencyInUSD,exchangeCurrencyFormat)
    exchangedCurrencyElement.innerHTML = exchangeCurrency
}

function setFlags() {

    var userCurrencyFormat = userSelectElement.value;
    var exchangeCurrencyFormat = exchangeSelectElement.value;
    
    userCountry = getKeyByValue(countryList,userCurrencyFormat)
    exchangeCountry = getKeyByValue(countryList,exchangeCurrencyFormat)

    userFlagUrl = `https://flagsapi.com/${userCountry}/flat/64.png`;
    exchangeFlagUrl = `https://flagsapi.com/${exchangeCountry}/flat/64.png`;

    userFlagElement.src = userFlagUrl
    exchangeFlagElement.src = exchangeFlagUrl
}