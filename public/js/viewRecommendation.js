
window.onload =function viewFeedBacks() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
 
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("recommendations").orderByChild("Barangay").equalTo(brgy);
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_recommendation").empty();
              snap.forEach(snap => {
                var key = snap.key;
                var Barangay = snap.child("Barangay").val();
                var Fullname = snap.child("Fullname").val();
                var UserID = snap.child("UserID").val();
                var Recommendation = snap.child("Recommendation").val();
               
                $("#tbody_recommendation").append("<tr><td class='ky' hidden>" + key + "</td><td>" + UserID +
                "</td><td>" + Fullname + "</td><td>" + 
                "<button class='openmodal myBtn'>View</button>" +
                "<div class='modal myModal'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<h2>" + "Recommendation" + "</h2>" +
                "<span class='close'>&times;</span>" +
                "</div>" +
                "<p><b>User ID: </b>" + UserID + "</p>" +
                "<p><b>Full name: </b>" + Fullname + "</p>" +
                "<p><b>Recommendation: </b>" + Recommendation + "</p>" +
                "</div>" +
                "</div></td></tr>")
                
              })
            } else {
              $("#tbody_recommendation").empty();
              $("#tbody_recommendation").append("<td id='nullRecords'colspan=3>No Recommendations.</td>");
            }
          });
        });
      });
    }
  });
}

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
    }
    , 1000);
