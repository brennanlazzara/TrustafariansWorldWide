$(document).ready(function () {

    let departDest = $('#dDest');
    let arriveDest = $('#aDest');
    let departDate = $('#dDate');
    let arriveDate = $('#aDate');

    let destCity;

    let airports = [{
            city: 'Austin-Bergstrom (AUS)',
            scanner_code: 'AUS'
        },
        {
            city: 'Dallas (JFK)',
            scanner_code: 'JFK'
        },
        {
            city: 'Los Angeles (LAX)',
            scanner_code: 'LAX'
        },
        {
            city: 'Atlanta (ATL)',
            scanner_code: 'ATL'
        },
        {
            city: 'Chicago (ORD)',
            scanner_code: 'ORD'
        },
        {
            city: 'Dallas (DFW)',
            scanner_code: 'DFW'
        },
        {
            city: 'Denver (DEN)',
            scanner_code: 'DEN'
        },
        {
            city: 'San Francisco (SFO)',
            scanner_code: 'JFK'
        },
        {
            city: 'Las Vegas (LAS)',
            scanner_code: 'AUS'
        },
        {
            city: 'Seattle (SEA)',
            scanner_code: 'AUS'
        },
    ];
    $("#search").on("click", function () {

        $('#calendar').hide();
        $(".ui-helper-hidden-accessible").hide()
        let departDest = $('#dDest').val();
        let arriveDest = $('#aDest').val();
        let departDate = $('#dDate').val();
        let arriveDate = $('#aDate').val();


        // Flight Skyscanner API
        var flights = {
            "async": true,
            "crossDomain": true,
            "url": `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${departDest}/${arriveDest}/${departDate}?inboundpartialdate=${arriveDate}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "0370f76c20msh20d28916440452ap120f23jsnac184da220ba"
            }
        }
        $.ajax(flights).done(function (response) {

            destCity = response.Places[1].CityName;

            $("#resultsTable").append(
                $("<tr></tr>").append(
                    $("<th></th>").text('Departure Date '),
                    $("<th></th>").text('MinPrice '),
                    $("<th></th>").text('Direct '),
                    $("<th></th>").text('Airline '),
                    $("<th></th>").text('Departure '),
                    $("<th></th>").text('Destination '),
                    $("<th></th>").text("")
                )
            );



            for (let i = 0; i < response.Quotes.length; i++) {
                let carrierId = response.Quotes[i].OutboundLeg.CarrierIds[0];
                let carrierName = '';

                let j = response.Carriers;
                for (x of j) {
                    if (x.CarrierId === carrierId) {
                        carrierName = x.Name;
                    }
                }

                $("#resultsTable").append(
                    $(`<tr></tr>`).append(
                        $(`<td class=departDate${i}></td>`).append(moment(response.Quotes[i].OutboundLeg.DepartureDate).format("MMMM Do YYYY, h:mm:ss a")),
                        $(`<td class=minPrice${i}></td>`).append(response.Quotes[i].MinPrice),
                        $(`<td class=direct${i}></td>`).append(response.Quotes[i].Direct),
                        $(`<td class=carrierName${i}></td>`).append(carrierName),
                        $(`<td class=departName${i}></td>`).append(response.Places[0].Name),
                        $(`<td class=arriveName${i}></td>`).append(response.Places[1].Name),
                        $(`<td></td>`).html(`<button class=resultSearch id=${i}>Search</button>`)
                    )
                );
            }

            $(".resultSearch").on("click", function (e) {
                $('#resultsDisplay').hide();

                const API_KEY = 'ef520636f39c506ecb6d5946a35d006b';
                const units = '&units=imperial';
                const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
                let queryURL = `${currentWeatherURL}${destCity}&appid=${API_KEY}${units}`
                
                $('#yourFlightResult').empty();

                let direct = $(`.direct${this.id}`).text();

                    if (!direct) {
                        direct = 'False';
                    }

                $('#yourFlightResult').show();
                $('#yourFlightResult').append(
                    $('<ul>Your Flight Summary:</ul>').append(
                        $('<li></li>').append('Date: ' + $(`.departDate${this.id}`).text()),
                        $('<li></li>').append('Price: $' + $(`.minPrice${this.id}`).text()),
                        $('<li></li>').append('Direct: ' + direct),
                        $('<li></li>').append('Airline: ' + $(`.carrierName${this.id}`).text()),
                        $('<li></li>').append('Departure City: ' + $(`.departName${this.id}`).text()),
                        $('<li></li>').append('Destination City: ' + $(`.arriveName${this.id}`).text())
                    )
                );

                // Get current weather from API
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).then(response => {

                    let windGust = response.wind.gust;

                    if (!windGust) {
                        windGust = 0;
                    }

                    $('#yourCurrentWeather').empty();

                    $('#yourCurrentWeather').show();
                    $('#yourCurrentWeather').append(
                        $('<ul>Your Current Weather at Destination:</ul>').append(
                            $('<li></li>').append('City: ' + response.name),
                            $('<li></li>').append('Current Temperature: ' + response.main.temp + '°F'),
                            $('<li></li>').append('Feels Like: ' + response.main.feels_like + '°F'),
                            $('<li></li>').append('Pressure: ' + response.main.pressure + 'Pa'),
                            $('<li></li>').append('Humidity: ' + response.main.humidity),
                            $('<li></li>').append('Wind Speed: ' + response.wind.speed),
                            $('<li></li>').append('Wind Gust: ' + windGust)
                        )
                    );
                });

            });

        });


    });


    $('#dDest, #aDest').autocomplete({
        source: function (request, response) {
            response($.map(airports, function (value, key) {
                request.term = request.term.toLowerCase();
                if (value.city.toLowerCase().includes(request.term) || value.scanner_code.toLowerCase().includes(request.term)) {
                    return {
                        label: value.city,
                        value: value.scanner_code
                    }
                }
            }));
        }
    });
});