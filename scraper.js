const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')
var file = 'data.json'
var i = 1, arr =[] , site_link;

var interval= setInterval(function(){
    console.log(site_link);
    i++;
    site_link = "https://www.list.am/category/23/" + i;
    scrapeIt( site_link , {
    cars: {
        listItem: ".h",
        data: {
            image: {
                selector: 'img',
                attr: "src"
            },
            title: "div.l",
            price: ".l2 .l",
            url: {
                closest: "a",
                attr: "href"
            }
        }

    }

}, (err, page) => {
        arr.push(page)
    })
    
    if(i==50){
            console.log(arr);
            jsonfile.writeFile(file, arr, { spaces: 2 }, function (err) {
                console.error(err)
            })          
            clearInterval(interval);
        }


},10);