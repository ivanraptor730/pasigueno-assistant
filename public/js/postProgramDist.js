var what = document.getElementById("what");
var message = document.getElementById("message");
var submit = document.getElementById("submit");

function postProgramDist() {
  var whats = what.value;
  var descriptions = message.value;
  var categorys1 = "District";
  var dateToday = date();
  var timeToday = time();
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
          var Name = snap.val().FullName;
          newStoreRef.set({
            Title: whats,
            PostedBy: Name,
            DatePosted: dateToday,
            TimePosted: timeToday,
            Description: descriptions,
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
}

function time() {

  var timetoday = new Date(new Date().getTime()).toLocaleTimeString();
  return timetoday;
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