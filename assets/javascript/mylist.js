
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAa2e06559RcONKCLGQdBhHXGwO8aTvOmk",
    authDomain: "mylist-unbored.firebaseapp.com",
    databaseURL: "https://mylist-unbored.firebaseio.com",
    storageBucket: "mylist-unbored.appspot.com",
    messagingSenderId: "982374264486"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
  var database = firebase.database();


$('#add-show').on('click', function(event) {


var show = $('#name').val().trim();
var channel = $('#channel').val().trim();
var date = $('#date').val().trim();
var day = $('#day').val().trim();
var timing = $('#timing').val().trim();
var alert = $('#alert').val().trim();
var alert1 = $('#alert1').val().trim();


var ObjShow = {

    name: showname,
    channel: showchannel,
    date: airdate,
    day: airday,
    timing: airtiming,
    minalert: alert,
    minalert1: alert1,
}

    event.preventDefault();
 //adding the objTrain to the dataBase   
database.ref().push(ObjShow);
});

database.ref().on('child_added',function(snapshot){

console.log(snapshot.val());
////////////////////////////////////
// First Time (pushed back 1 year to make sure it comes before current time)================
var startTime = moment(childSnapshot.val().airtiming, "hh:mm").subtract(1, "years");

//Difference between the times
var diffTime = moment().diff(moment(startTime), "minutes");

//Time apart remainder
var tRemainder = diffTime - childSnapshot.val().frequency;


var time = moment.duration("00:30:00");=============
alert = moment("'snapshot.val().timing' hh:mm:ss");
date.subtract(time);
$('#alert').text(date.format())

var time = moment.duration("00:30:00");============
var startalert = moment("'snapshot.val().timing' hh:mm:ss");
startalert = startalert.subtract(1, "00:30:00");
startalert = startalert.format("hh:mm:ss");
$('#alert').text(startalert.format())


var time = moment.duration("00:30:00");============
var startalert = moment();
startalert = startalert.subtract(1, "00:30:00");
startalert = startalert.format("hh:mm:ss");
//////////////////////////////////////////
$("#myFavouritesForm").append(`<tr>
             <td> ${snapshot.val().showname}</td>
             <td> ${snapshot.val().showchannel}</td> 
             <td> ${snapshot.val().airdate}</td>
             <td> ${snapshot.val().airday}</td>
             <td> ${snapshot.val().airtiming} </td>
             <td> ${snapshot.val().alert}</td>
             <td> ${snapshot.val().alert1}</td>
                </tr>`);


})

