
function CurrencyExchangeRate(ccy, base_ccy, buy, sale) {
    let _ccy = ccy;
    let _base_ccy = base_ccy;
    let _buy = buy;
    let _sale = sale;

    this.toString = function () {
        let strInfo = _ccy + "/" + _base_ccy + ": " + _buy + " - " + _sale;
        return strInfo;
    };
}

function Informer(parUrl) {

    let http = require('http');
    let https = require('https');
    let _url = parUrl;

    this.pipeOnPort3000 = function()
    {
        http.createServer((request, response) => {

            https.get(url, (res) => {
                if (res.statusCode != 200) {
                    throw new Error("Responce status code is " + String(res.statusCode));
                }
                res.setEncoding('utf8');
                res.pipe(response);
            });

        }).listen(3000);
    }   

    this.showInConsole = function () {

        https.get(url, (res) => {
            if (res.statusCode != 200) {
                throw new Error("Responce status code is " + String(res.statusCode));
            }
            res.setEncoding('utf8');
            res.on('data', function (body) {
                let obj = JSON.parse(body);
                for (let i = 0; i < obj.length; i++) {
                    let currencyExchangeRate = new CurrencyExchangeRate(obj[i].ccy, obj[i].base_ccy, obj[i].buy, + obj[i].sale);
                    console.log(currencyExchangeRate.toString());
                }
            });    
        });
    }   
}

let url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';

let informer = new Informer(url);
informer.pipeOnPort3000();
informer.showInConsole();