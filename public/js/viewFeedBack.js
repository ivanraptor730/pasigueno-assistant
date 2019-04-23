
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
          var rootRef = firebase.database().ref("activityfeedback").orderByChild("Barangay").equalTo(brgy);
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_feedback").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var ActivityID = snap.child("ActivityID").val();
                var Barangay = snap.child("Barangay").val();
                var Feedback = snap.child("Feedback").val();
                var Fullname = snap.child("Fullname").val();
                var UserID = snap.child("UserID").val();
                var StarRating = snap.child("Rating").val();
                var AnnouncementCategory = snap.child("AnnouncementCategory").val();
                var AnnouncementDate = snap.child("AnnouncementDate").val();
                var AnnouncementDescription= snap.child("AnnouncementDescription").val();
                var AnnouncementTitle= snap.child("AnnouncementTitle").val();
                var AnnouncementPlace= snap.child("AnnouncementPlace").val();
                
                $("#tbody_feedback").prepend("<tr><td class='ky'>" + key + "</td><td>" + Fullname +
                "</td><td>" + AnnouncementCategory + "</td><td>" + AnnouncementTitle +
                "</td><td>" + AnnouncementDate + "</td>" + 
                "<td>" + StarRating + "</td><td>" + 
                "<button class='openmodals myBtn'>View</button>" +
                "<div class='modals myModal'>" +
                "<div class='modals-content'>" +
                "<div class='modals-header'>" +
                "<h2>" + AnnouncementTitle + "</h2>" +
                "<span class='close'>&times;</span>" +
                "</div>" +
                "<p><b>Activity ID: </b>" + ActivityID + "</p>" +
                "<p><b>Activity Date: </b>" + AnnouncementDate + "</p>" +
                "<p><b>Activity Place: </b>" + AnnouncementPlace + "</p>" +
                "<p><b>Type of Activity: </b>" + AnnouncementCategory + "</p>" +
                "<p><b>Activity Description: </b>" + AnnouncementDescription + "</p>" +
                "<p><b>Feedback ID: </b>" + key + "</p>" +
                "<p><b>Fullname: </b>" + Fullname + " </p>" +
                "<p><b>Rating : </b>" + StarRating + " </p>" +
                "<p><b>Message: </b>" + Feedback + " </p>" +
                "</div>" +
                "</div></td></tr>")
              })
            } else {
              $("#tbody_feedback").empty();
              $("#tbody_feedback").prepend("<td id='nullRecords'colspan=7>No Feedbacks.</td>");
            }
          });
        });
      });
    }
  });
}

window.setInterval(
    function () {
      var modals = document.getElementsByClassName('modals');
      // Get the button that opens the modal
      var btns = document.getElementsByClassName("openmodals");
      var spans = document.getElementsByClassName("closes");
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
