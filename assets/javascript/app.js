$( document ).ready(function(){
    var firebaseConfig = {
    apiKey: "AIzaSyDQhfxKV9XDyoyfZGEPcjO1mWywHx1mXgE",
    authDomain: "train-scheduler-2840a.firebaseapp.com",
    databaseURL: "https://train-scheduler-2840a.firebaseio.com",
    projectId: "train-scheduler-2840a",
    storageBucket: "train-scheduler-2840a.appspot.com",
    messagingSenderId: "1091944176490",
    appId: "1:1091944176490:web:1b40bc972a383b54dfa313",
    measurementId: "G-5QJZG0TBQ5"
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
        console.log(childSnapshot.val());
        var train = childSnapshot.val().trainName;
        var desti = childSnapshot.val().destination;
        var time = childSnapshot.val().trainTime;
        var frequ = childSnapshot.val().frequency;

        var currentTime = moment();
        var convertedTime = moment(time, "HH:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(convertedTime), "minutes");
        var remainder = timeDiff % frequ;
        var arrivalInMinutes = frequ - remainder;

        var nextTrain = moment().add(arrivalInMinutes, "minutes");
        var arrival = moment(nextTrain).format("HH.mm");

        $('#itemize').append("<tr><td>" + train + "</td><td>" + desti + "</td><td>" + frequ + "</td><td>" + arrival + "</td><td>" + arrivalInMinutes + "<td>");


    });
}); 