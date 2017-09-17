const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')
var file = 'data.json'

scrapeIt("https://www.list.am/category/23/1", {
    // Fetch the articles
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
    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
        console.error(err)
    })
});