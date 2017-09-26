const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')
var file = 'data.json'
var i = 1, arr = {"cars":[]}, site_link;

var interval = setInterval(function () {
    i++;
    site_link = "https://www.list.am/category/23/" + i;
    scrapeIt(site_link, {
        cars: {
            listItem: ".h",
            data: {
                image: {
                    selector: 'img',
                    attr: "src"
                },
                title: "div.l",
                year: {
                    selector: "div.l",
                    convert: function(x){
                        var y = x.split(' ');
                        for(i=0;i<y.length;i++){
                            if( Number(y[1]) >=1800 && Number(y[1])<=2017){
                                console.log("iaudoiausdoiuaoduaoiduoiasudoiuasoduaosudoaisudopiasudoiuasopiduaopsiudpoiasudpoiausopdiuapoisduopiasudpoiuasopdiuaposiduopaisudpoiasupodiuaopsidu" + Number(y[i]));
                            }
                        }
                        //x = x.split('թ')[0]
                        return x;
                    }
                },
                price: ".l2 .l",
                url: {
                    closest: "a",
                    attr: "href"
                }
            }

        }

    }, (err, page) => {
        arr.cars.push(...page.cars)
    })

    if (i == 5) {
        console.log(arr);
        jsonfile.writeFile(file, arr, { spaces: 2 }, function (err) {
            console.error(err)
        })
        clearInterval(interval);
    }


}, 1000);