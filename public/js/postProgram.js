var what = document.getElementById("what");
var when = document.getElementById("when");
var where = document.getElementById("where");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var message = document.getElementById("message");

var category1 = document.getElementById("category1");
var submit = document.getElementById("submit");
var fileButton = document.getElementById("fileButton");
var selectedFile;
$("#file").on('change', function (event) {
  selectedFile = event.target.files[0];
});

function postProgram() {

  var filename;
  if (document.getElementById("file").files.length == 0) {
    filename = "N/A";

    // var fileRef =  storage().chld(filename);
    var whats = what.value;
    var startTimes = startTime.value;
    var endTimes = endTime.value;
    var whens = when.value;
    var wheres = where.value;
    var descriptions = message.value;
    var categorys1 = category1.value;
    var dateToday = date();

    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('newsfeed');
    var newStoreRef = storesRef.push();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var uid = firebase.auth().currentUser.uid;
        var rootRefs = firebase.database().ref();
        var storesRefs = rootRefs.child('users');

        storesRefs.on("child_added", snap => {
          if (uid == snap.val().UserID) {
            var barangay = snap.val().Barangay;
            newStoreRef.set({
              Title: whats,
              When: whens,
              Where: wheres,
              DatePosted: dateToday,
              Description: descriptions,
              Barangay: barangay,
              PhotoURL: filename,
              StartTime: startTimes,
              EndTime: endTimes,
              Category: categorys1
            });
            alert('Successfully Posted!');
            window.location.reload();
          }
        });
      } else {
        alert('Error!');
      }
    });

  } else {

    filename = selectedFile.name;

    var storageRef = firebase.storage().ref('/Announcements/' + filename)
    var uploadTask = storageRef.put(selectedFile);
    // var fileRef =  storage().chld(filename);
    var whats = what.value;
    var startTimes = startTime.value;
    var endTimes = endTime.value;
    var whens = when.value;
    var wheres = where.value;
    var descriptions = message.value;
    var categorys1 = category1.value;
    var dateToday = date();

    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('newsfeed');
    var newStoreRef = storesRef.push();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var uid = firebase.auth().currentUser.uid;
        var rootRefs = firebase.database().ref();
        var storesRefs = rootRefs.child('users');
        uploadTask.on('state_changed', function (snapshot) {

          },
          function (error) {
            window.alert("Invalid File");
          },
          function () {
            var storageRef = firebase.storage().ref('/Announcements/' + filename);
            storageRef.getDownloadURL().then(function (url) {
              storesRefs.on("child_added", snap => {
                if (uid == snap.val().UserID) {


                  var barangay = snap.val().Barangay;
                  newStoreRef.set({
                    Title: whats,
                    When: whens,
                    Where: wheres,
                    DatePosted: dateToday,
                    Description: descriptions,
                    Barangay: barangay,
                    PhotoURL: url,
                    StartTime: startTimes,
                    EndTime: endTimes,
                    Category: categorys1
                  });
                  alert('Successfully Posted!');
                  window.location.reload();
                }
              });
            });

          });
      } else {
        alert('Error!');
      }
    });
  }
}



function date() {

  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  var monthDateYear = pad(year) + "-" + pad(month + 1) + "-" + pad(date);
  return monthDateYear;
}

function pad(n) {
  return n < 10 ? '0' + n : n;
}

$('#category1').change(function () {
  if ($(this).val() == "Advisory") {
    $('#startTime').prop("disabled", true);

    $('#endTime').prop("disabled", true);

    document.getElementById('message1').innerHTML = "<p>Time is disabled!!</p>";
    document.getElementById('message2').innerHTML = "<p>Time is disabled!!</p>";
  } else {
    $('#startTime').prop("disabled", false);
    $('#endTime').prop("disabled", false);

    document.getElementById('message1').innerHTML = "<p></p>";
    document.getElementById('message2').innerHTML = "<p></p>";
  }
});