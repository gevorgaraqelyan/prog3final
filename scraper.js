const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')
var file = 'db.json'
var i = 1, arr = {"cars":[]}, site_link;

var interval = setInterval(function () {
    i++;
    site_link = "https://www.list.am/category/23/" + i;
    console.log(site_link);
    scrapeIt(site_link, {
        cars: {
            listItem: ".h",
            data: {
                image: {
                    selector: 'img',
                    attr: "src"
                },
                title: "div.l",
                url: {
                    closest: "a",
                    attr: "href"
                },
                year: {
                    selector: "div.l",
                    convert: function (x) {
                        var re = / (\d*) թ/;
                        
                        if (re.test(x)) {
                            var found = x.match(re);
                            
                            return found[1];
                        } else {
                            return "";
                        }
                    },
                },
                price: {
                    selector: ".l2 .l",
                    convert: function (x) {
                        // var re = /$(\d*\,?\d*)/;
                        var re = x.split("$");
                        if(re.length == 2){
                            re = re[1].split(",");
                            re = re[0]+re[1];
                        }
                        else{
                            re = re[0].split(" ");
                            re = re[0].split(",");
                            re = re[0]+ re[1]
                        }
                        console.log(re);
                        return re;
                        
                    },
                },
                    
                
            }

        }

    }, (err, page) => {
        arr.cars.push(...page.cars)
    })

    if (i == 30) {
        console.log(arr);
        jsonfile.writeFile(file, arr, { spaces: 2 }, function (err) {
            console.error(err)
        })
        clearInterval(interval);
    }


}, 100);