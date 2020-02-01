$(document).ready(function () {

    let departDest = $('#dDest');
    let arriveDest = $('#aDest');
    let departDate = $('#dDate');
    let arriveDate = $('#aDate');
    let airports =
    [
        {
            city: “Austin-Bergstrom (AUS)“,
            scanner_code: “AUS”
        },
        {
            city: “Dallas (JFK)“,
            scanner_code: “JFK”
        }
    ];
//     var airports = [];
// {
//     city: “”
//     scanner_code: “”
// }
//     for (var count = 0; count < response.Places.length; count++) {
//         airportArray.push({
//             city: response.Places.city,
//             scanner_code: response.Places.code
//         });
//     }
    
    $("#search").on("click", function () {

        $('#calendar').hide();

        let departDest = $('#dDest').val();
        let arriveDest = $('#aDest').val();
        let departDate = $('#dDate').val();
        let arriveDate = $('#aDate').val();
   
//     var airports = [];
// {
//     city: “”
//     scanner_code: “”
// }
//     for (var count = 0; count < response.Places.length; count++) {
//         airportArray.push({
//             city: response.Places.city,
//             scanner_code: response.Places.code
//         });
//     }

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
                    if (x.CarrierId === carrierId ) {
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
            
            $(".resultSearch").on("click", function (e){
                console.log($(`.departDate${this.id}`).text());
                console.log($(`.minPrice${this.id}`).text());
                console.log($(`.direct${this.id}`).text());
                console.log($(`.carrierName${this.id}`).text());
                console.log($(`.departName${this.id}`).text());
                console.log($(`.arriveName${this.id}`).text());
            });

        });


    });


$(“#dDest, #aDest”).autocomplete({
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


