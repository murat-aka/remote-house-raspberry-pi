$(function () {
    $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    
        var chart;
        $('#container1').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
				
					load: function(){


                        var series = this.series[0];
                        setInterval(function() {
						
						
						
						
						    getLocation();
  
  var units = false;

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
      console.log(location);
      
      $('.location')
        .append(location.city + ", ")
        .append(location.region);

      var units = "imperial"//getUnits(location.country);
      
      
      getWeather(location.loc, units);

      //return weather;

    }, "jsonp");

  }

  function getWeather(loc, units) {
    lat = loc.split(",")[0].toString();
    lon = loc.split(",")[1].toString();
    
    //lat = 51.5186161;
    //lon = -0.1493243;

    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units +'&APPID=bc93a8c6f91688738e890232a6c24ced';

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
      var windDir = convertWindDirection(weather.wind.deg);
      var temperature = weather.main.temp;
      var unitLabel;

      //label based in imperial vs metric units
      if (units === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }

      temperature = parseFloat((temperature).toFixed(1));
	  
	     var x = (new Date()).getTime(), // current time
                                y = temperature //Math.random();
                            series.addPoint([x, y], true, true);


    }, "jsonp");

  };

  function convertWindDirection(dir) {
    var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var eightPoint = Math.floor(dir / 45);
    return rose[eightPoint];
  }

  function getUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
      var units = 'metric';
    } else {
      units = 'imperial';
    }

    console.log(country, units);
    return units;
  }
                         
                        }, 3000);


						
  
  }
					
				    /*    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }*/
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
			credits: {
			enabled: false
			},
            series: [{
                name: 'Random data',
				color: '#FF0000',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
    
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            }]
        });
    });
    
});