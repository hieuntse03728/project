demo ={
    initChart1: function (data) {
        //console.log(Object.keys(data)[0]);
        var size = Object.keys(data).length;
        var array =[];
        for ( i = 0; i < size   ; i++){
            array[i]={'legendText':Object.keys(data)[i],
                'y':Object.values(data)[i]
            };
        }
        CanvasJS.addColorSet("greenShades",
            [//colorSet Array

                "#68B3C8",
                "#F3BB45",
                "#EB5E28",
                "#7AC29A",
                "#7A9E9F",
                "#2BBBAD"
            ]);
        var chart = new CanvasJS.Chart("chartContainer1",
            {
                colorSet: "greenShades",
                animationEnabled: true,
                legend:{
                    maxWidth: 350,
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    fontSize: 15,
                    fontFamily: "Helvetica"
                },
                theme: "theme2",
                data: [
                    {
                        type: "pie",
                        indexLabel: false,
                        startAngle:-90,
                        showInLegend: true,
                        toolTipContent: "{legendText} - #percent %",
                        dataPoints: array
                    }
                ]
            });
        chart.render();
    },

    initChart2: function (data) {
        //console.log(Object.keys(data)[1]);
        var size = Object.keys(data).length;
        var array =[];
        for ( i = 0; i < size   ; i++){
            array[i]={'legendText':Object.keys(data)[i],
                      'y':Object.values(data)[i]
            };
        }
        CanvasJS.addColorSet("greenShades",
            [//colorSet Array

                "#68B3C8",
                "#F3BB45",
                "#EB5E28",
                "#7AC29A",
                "#7A9E9F",
                "#2BBBAD"
            ]);
        var chart = new CanvasJS.Chart("chartContainer2",
            {
                colorSet: "greenShades",
                animationEnabled: true,
                legend:{
                    maxWidth: 350,
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    fontSize: 15,
                    fontFamily: "Helvetica"
                },
                theme: "theme2",
                data: [
                    {
                        type: "pie",
                        indexLabel: false,
                        startAngle:-90,
                        showInLegend: true,
                        toolTipContent: "{legendText} - #percent %",
                        dataPoints: array
                    }
                ]
            });
        chart.render();
    },

    initChart3: function (data) {
        //console.log(Object.keys(data)[1]);
        var size = Object.keys(data).length;
        var array =[];
        for ( i = 0; i < size   ; i++){
            array[i]={'legendText':Object.keys(data)[i],
                'y':Object.values(data)[i]
            };
        }
        CanvasJS.addColorSet("greenShades",
            [//colorSet Array

                "#68B3C8",
                "#F3BB45",
                "#EB5E28",
                "#7AC29A",
                "#7A9E9F",
                "#2BBBAD"
            ]);
        var chart = new CanvasJS.Chart("chartContainer3",
            {
                colorSet: "greenShades",
                animationEnabled: true,
                legend:{
                    maxWidth: 350,
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    fontSize: 15,
                    fontFamily: "Helvetica"
                },
                theme: "theme2",
                data: [
                    {
                        type: "pie",
                        indexLabel: false,
                        startAngle:-90,
                        showInLegend: true,
                        toolTipContent: "{legendText} - #percent %",
                        dataPoints: array
                    }
                ]
            });
        chart.render();
    }
}