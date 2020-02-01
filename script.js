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
                    $("<tr id=flightResults></tr>").append(
                        $("<td class=departDate></td>").append(moment(response.Quotes[i].OutboundLeg.DepartureDate).format("MMMM Do YYYY, h:mm:ss a")),
                        $("<td class=minPrice></td>").append(response.Quotes[i].MinPrice),
                        $("<td class=direct></td>").append(response.Quotes[i].Direct),
                        $("<td class=carrierName></td>").append(carrierName),
                        $("<td class=departName></td>").append(response.Places[0].Name),
                        $("<td class=arriveName></td>").append(response.Places[1].Name),
                        $(`<td></td>`).html('<button class=resultSearch>Search</button>')
                    )
                );
            }
            
            $(".resultSearch").on("click", function (){
                alert('Hello');
            });

        });


    });

    
});


