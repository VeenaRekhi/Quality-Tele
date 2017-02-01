var searchItem;
var today = new Date();
var queryURL = "https://api.tvmaze.com/schedule?country=US&date=" + today.toISOString().substring(0, 10);
var selection = "shows";
var showId;
var shows;
var episodes;
var tableHTML = "";
var airDate;
var airTime;
var runTime;
var season;
var summary;

populateGrid();


$(document).on("click", "#searchTV", "#TV-show", function(e) {
	searchItem = $('#search').val().trim();
	queryURL = "https://api.tvmaze.com/search/shows?q=" + searchItem;
	e.preventDefault();
	selection = "shows";
	populateGrid();
});


$(document).on("click", "#searchPE", function(e) {
	searchItem = $('#search').val().trim();
	queryURL = "https://api.tvmaze.com/search/people?q=" + searchItem;
	e.preventDefault();
	selection = "people";
	populateGrid();
 });



function populateGrid() {
var currentShow;
 // current picture/ show in the carousel.

//  Using method "get" the ajax function to get asynchronised response from TVMaze  api.
	alert(queryURL);
     $.ajax({
        url: queryURL,
        method: "GET",    
//        success: function(response) {     
     }).done(function(response) {  // Function "done" will help to callback/Load data from
     alert("Got the response from API"); 
      	console.log(response); // a server using an AJAX HTTP GET request
    	shows = response;
    	tableHTML = "";
    	for (var i = 0; i < 10; i++) {

      	    	if (selection == "shows") {
      	    		if (shows[i].show.image != null) {
      	    			currentShow = shows[i].show.image.medium;
			    		showId = shows[i].show.id;
      	    		}
      	    	}
      	    	if (selection == "people") {
      	    		if (shows[i].person.image != null) {
      	    			currentShow = shows[i].person.image.medium;	
			    		showId = shows[i].person.id;
      	    		}
      	    	}
      	    	$("#cr" + i).attr("src", currentShow); // Refering to the 10 elements (shows) from the carousel in HTML.
      	    	$("#cr" + i).attr("style", "height: 400px; width: 400px");

		queryURL = "https://api.tvmaze.com/shows/" + showId + "?embed=nextepisode";
    	 $.ajax({
        	url: queryURL,
	        method: "GET",    
//        success: function(response) {     
	     }).done(function(response) {  // Function "done" will help to callback/Load data from
	      	console.log(response); // a server using an AJAX HTTP GET request
	    	episodes = response;
	    	if ("_embedded" in episodes) {
	    		airDate = episodes._embedded.nextepisode.airdate;
	    		airTime = episodes._embedded.nextepisode.airtime;
	    		runTime = episodes._embedded.nextepisode.runtime;
	    		season = episodes._embedded.nextepisode.season;
	    		summary = episodes._embedded.nextepisode.summary;
	    	}
	    	else {
	    		airDate = "";
	    		airTime = "";
	    		runTime = "";
	    		season = "";
	    		summary = "";	    		
	    	}
	    	tableHTML += "<tr id='" + i + "'>";
	    	tableHTML += "<td>  " + airDate + "  </td>";
	    	tableHTML += "<td>  " + airTime + "  </td>";
	    	tableHTML += "<td>  " + episodes.name + "  </td>";
	    	tableHTML += "<td>  " + runTime + "  </td>";
	    	tableHTML += "<td>  " + season + "  </td>";
	    	tableHTML += "<td>  " + summary + "  </td>";
	    	tableHTML += "<td>  " + episodes.status + "  </td>";
	    	tableHTML += "<td>  " + episodes.webChannel + "  </td>";
			$("#episode > tbody").html(tableHTML);
		});

     		}
    
        });
    }




 //When the user clicks on the button, 
//toggle between hiding and showing the dropdown content 
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




