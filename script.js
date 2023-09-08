const dropList = document.querySelectorAll("form select")
const getButton = document.querySelector("form button")

apiKey = "31c660cc9f3cb23008f4f42f"
let rotated = false
const exchangeIcon = document.querySelector(".icon")



fromCurrency = document.querySelector(".from select")
toCurrency = document.querySelector(".to select")

for (let i =0; i< dropList.length; i++) {
    for (let currency_code in country_code) {
        optionTag = `<option class="opt" value="${currency_code}">${currency_code}</option>`
        dropList[i].insertAdjacentHTML("beforeend", optionTag)

        if(i == "0" && currency_code == "USD") {
            dropList[i].lastChild.selected = true
        }else if(i == "1" && currency_code == "NGN") {
            dropList[i].lastChild.selected = true
        }
    }
}

fromCurrency.addEventListener('change', function() {
    loadFlag(this);
});

toCurrency.addEventListener('change', function() {
    loadFlag(this); 
});

function loadFlag(element) {
    for (let code in country_code) {

        if(code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/w320/${country_code[code].toLowerCase()}.png`
        }
    }
}


//for the table
const tableHeader = document.querySelector(".wrapper .tableHeader")
const table1 = document.querySelector("table .tb1")
const table5 = document.querySelector("table .tb5")
const table10 = document.querySelector("table .tb10")
const table20 = document.querySelector("table .tb20")
const table50 = document.querySelector("table .tb50")
const table100 = document.querySelector("table .tb100")
const table250 = document.querySelector("table .tb250")
const table500 = document.querySelector("table .tb500")
const table1000 = document.querySelector("table .tb1000")




exchangeIcon.addEventListener('click', ()=> {
    rotated = !rotated
    if(rotated) {
        exchangeIcon.classList.add('rotated')
    }else {
        exchangeIcon.classList.remove('rotated')
    }

    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
})

getButton.addEventListener('click', e=> {
    // Prevents the default form submission behavior
    e.preventDefault()
    getExchangeRate()
    
})


const amount = document.querySelector(".amount input")


function getExchangeRate() {
    const fromCurrencyCode = fromCurrency.value;
    const toCurrencyCode = toCurrency.value;

    tableHeader.innerText = `convert ${fromCurrencyCode} to ${toCurrencyCode}`

    
    exchangeRateText = document.querySelector(".exchange-rate")
    updateText = document.querySelector(".updateText")
    let amountVal = amount.value
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1"
        amountVal = 1
    }

    table1.innerText = (1 * amountVal).toFixed(2)
    table5.innerText = (5 * amountVal).toFixed(2)
    table10.innerText = (10 * amountVal).toFixed(2)
    table20.innerText = (20 * amountVal).toFixed(2)
    table50.innerText = (50 * amountVal).toFixed(2)
    table100.innerText = (100 * amountVal).toFixed(2)
    table250.innerText = (250 * amountVal).toFixed(2)
    table500.innerText = (500 * amountVal).toFixed(2)
    table1000.innerText = (1000 * amountVal).toFixed(2)


    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url)
    .then(response => response.json())
    .then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let exchangeFigure = (exchangeRate * amountVal).toFixed(2)
        exchangeRateText.innerText = exchangeFigure 
        updateText.innerText = `Exchange rate ${fromCurrencyCode}/${toCurrencyCode} ${exchangeFigure} updated few minutes ago`
    }).catch(()=> {
        exchangeRateText.innerText= "Something went wrong"
    })
}