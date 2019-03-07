var what = document.getElementById("what");
var when = document.getElementById("when");
var where = document.getElementById("where");
var message = document.getElementById("message");
var category = document.getElementById("category");
var submit = document.getElementById("submit");
var image = document.getElementById("fileToUpload");

function postProgram() {
  var whats = what.value;
  var whens = when.value;
  var wheres = where.value;
  var descriptions = message.value;
  var categorys = category.value;
  var images = image.value; //ToDo
  var rootRef = firebase.database().ref();
  var storesRef = rootRef.child('newsfeed');
  var newStoreRef = storesRef.push();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var uid = firebase.auth().currentUser.uid;
      var rootRefs = firebase.database().ref();
      var storesRefs = rootRefs.child('users');
      storesRefs.on("child_added", snap => {
        if (uid == snap.val().UserID) {
          var barangay = snap.val().Barangay;
          newStoreRef.set({
            What: whats,
            When: whens,
            Where: wheres,
            Description: descriptions,
            Category: categorys,
            Barangay: barangay
          });
          alert('Successfully Posted!');
        }
      });
    } else {
      alert('Error!');
    }
  });
}