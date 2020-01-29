$(document).ready(function () {
     
    let departDest = $('#dDest');
    let arriveDest = $('#aDest');
    let departDate = $('#dDate');
    let arriveDate = $('#aDate');


   $("#search").on("click", function(){

    let departDest = $('#dDest').val();
    let arriveDest = $('#aDest').val();
    let departDate = $('#dDate').val();
    let arriveDate = $('#aDate').val();

//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${departDest}/${arriveDest}/${departDate}?inboundpartialdate=${arriveDate}`,
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
//             "x-rapidapi-key": "0370f76c20msh20d28916440452ap120f23jsnac184da220ba"
//         }
//     }

// $.ajax(settings).done(function(response){
//     console.log(response);
// }
// )

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/ORD-sky/2020-02-01?inboundpartialdate=2020-02-03",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "0370f76c20msh20d28916440452ap120f23jsnac184da220ba"
	}
}
$.ajax(settings).done(function (response) {
	console.log(response);
});


   });

});



// INPUT INVALID //
//       if (departDest.val() == "") {
//           alert('You need to input text');
//       }
//       if (arriveDest.val() == "") {
//         alert('You need to input text');
//     }
//     if (departDate.val() == "") {
//         alert('You need to input text');
//     }
//     if (arriveDate.val() == "") {
//       alert('You need to input text');
//   }