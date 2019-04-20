function viewPostedPrograms() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("newsfeed").orderByChild("Barangay").equalTo(brgy);
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_programs").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var Barangay = snap.child("Barangay").val();
                var Category = snap.child("Category").val();
                var Description = snap.child("Description").val();
                var PhotoURL = snap.child("PhotoURL").val();
                var Title = snap.child("Title").val();
                var When = snap.child("When").val();
                var Where = snap.child("Where").val();

                $("#tbody_programs").prepend("<tr><td class='ky' hidden>" + key + "</td><td>" + Title + "</td><td>" + Where +
                  "</td><td>" + When + "</td><td>" + Category +
                  "</td><td>" + Description + "</td><td>" +
                  "<button id='img2' onclick=window.open('" + PhotoURL + "')><i class='fas fa-camera'></i> View Image</button>");

              })
            } else {
              $("#tbody_programs").empty();
              $("#tbody_programs").prepend("<td id='nullRecords'colspan=5>No Feedbacks.</td>");
            }
          });
        });
      });
    }
  });
}

window.onload=viewPostedPrograms();

window.setInterval(
  function () {
    var modals = document.getElementsByClassName('modal');
    // Get the button that opens the modal
    var btns = document.getElementsByClassName("openmodal");
    var spans = document.getElementsByClassName("close");
    for (let i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        modals[i].style.display = "block";
      }
    }
    for (let i = 0; i < spans.length; i++) {
      spans[i].onclick = function () {
        modals[i].style.display = "none";
      }
    }
  }, 1000);