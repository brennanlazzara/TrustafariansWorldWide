$(document).ready(function () {

    let departDest = $('#dDest');
    let arriveDest = $('#aDest');
    let departDate = $('#dDate');
    let arriveDate = $('#aDate');

    $("#search").on("click", function () {

        $('#calendar').hide();

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
            var DIV = $('<div>');
            DIV.append(`<h3>MinPrice: ${JSON.stringify(response.Quotes[0].MinPrice)}</h3><h3>Direct: ${JSON.stringify(response.Quotes[0].Direct)}</h3><h3>CarrierIds: ${response.Quotes[0].OutboundLeg.CarrierIds}</h3><h3>Places ${JSON.stringify(response.Places[0].Name)}</h3><h3>Carriers ${JSON.stringify(response.Carriers[0].Name)}</h3>`);
            $('#resultsDisplay').append(DIV);

            $("#resultsTable").append(
                $("<tr></tr>").append(
                    $("<th></th>").text('Departure Date '),
                    $("<th></th>").text('MinPrice '),
                    $("<th></th>").text('Direct '),
                    $("<th></th>").text('Carrier Ids ')
                )
            );

            for (let i = 0; i < response.Quotes.length; i++) {
                $("#resultsTable").append(
                    $("<tr></tr>").append(
                        $("<td></td>").append(response.Quotes[i].OutboundLeg.DepartureDate),
                        $("<td></td>").append(response.Quotes[i].MinPrice),
                        $("<td></td>").append(response.Quotes[i].Direct),
                        $("<td></td>").append(response.Quotes[i].OutboundLeg.CarrierIds)
                    )
                );
            }

            // console.log(response.Quotes);
            // console.log(response.Places);
            // console.log(response.Carriers);
        });


    });


});


