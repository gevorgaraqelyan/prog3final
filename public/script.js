google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawPieChart);


function drawTable() {
    $.ajax({
        url: "/cars",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('string', 'price');
            data.addColumn('string', 'year');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].price,
                    jsonData[i].year
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            //var formatter = new google.visualization.BarFormat({ width: 100 });
            //formatter.format(data, 3); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}
function drawColumnChart() {
    $.ajax({
        url: "/cars",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'year');
            data.addColumn('number', 'count');
            var uniqueCount = [];
            var count = {};
            for (var i = 0; i < jsonData.length; i++) {
                uniqueCount.push(jsonData[i].year);
            }
            uniqueCount.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
            console.log(count);
            for (var key in count) {
                if (count.hasOwnProperty(key) && key != "" && count[key]>4) {
                    data.addRow([
                        key,
                        count[key]

                    ]);
                }
            }



            var options = {
                title: 'Autos in list.am counts',
                hAxis: { title: 'Year of auto', titleTextStyle: { color: 'red' } },
                vAxis: {title: "Counts", titleTextStyle:{ color : 'red'}}
               
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
}
function drawPieChart() {

    $.ajax({
        url: "/cars",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('number', 'count');
            
            var uniqueCount = [];
            var count = {};
            var str;
            for (var i = 0; i < jsonData.length; i++) {
                str=jsonData[i].title.split(" ");
                str=str[0];
                uniqueCount.push(str);
                console.log(uniqueCount)
            }
            uniqueCount.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
            console.log(count);
            for (var key in count) {
                if (count.hasOwnProperty(key) && count[key]>10) {
                    data.addRow([
                        key,
                        count[key]

                    ]);
                }
            }

            var options = {};

            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });

}
$(window).resize(function () {
    drawTable();
    drawColumnChart();
    drawPieChart();
});

