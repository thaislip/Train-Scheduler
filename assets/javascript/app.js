$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBDO3crLHAkl-Mx3DiUfQXATgarPvrGU5E",
        authDomain: "train-scheduler-26007.firebaseapp.com",
        databaseURL: "https://train-scheduler-26007.firebaseio.com",
        projectId: "train-scheduler-26007",
        storageBucket: "train-scheduler-26007.appspot.com",
        messagingSenderId: "663007289169",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = 0;

    $('#add-train').on("click", function(event){
        event.preventDefault();
        trainName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        trainTime = $('#first-train-time').val().trim();
        frequency = $('#frequency').val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

    database.ref().on("child_added", function(childSnapshot){
        var train = childSnapshot.val().trainName;
        var desti = childSnapshot.val().destination;
        var time = childSnapshot.val().trainTime;
        var frequ = childSnapshot.val().frequency;

        var currentTime = moment().format("HH:mm");
        var convertedTime = moment(time, "HH:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(convertedTime), "minutes");
        var remainder = timeDiff % frequ;
        var arrivalInMinutes = frequ - remainder;

        var nextTrain = moment().add(arrivalInMinutes, "minutes");
        var arrival = moment(nextTrain).format("HH.mm");

        $('#itemize').append("<tr><td>" + train + "</td><td>" + desti + "</td><td>" + frequ + "</td><td>" + arrival + "</td><td>" + arrivalInMinutes + "<td>");


    });
});