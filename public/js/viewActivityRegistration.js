window.onload = function viewActivityRegistration() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("activityregistration");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_registration").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var Barangay = snap.child("Barangay").val();
                var AnnouncementDate = snap.child("AnnouncementDate").val();
                var AnnouncementDescription = snap.child("AnnouncementDescription").val();
                var AnnouncementID = snap.child("AnnouncementID").val();
                var AnnouncementPlace = snap.child("AnnouncementPlace").val();
                var AnnouncementTitle = snap.child("AnnouncementTitle").val();
                var UserID = snap.child("UserID").val();

                if (Barangay == brgy) {
                  $("#tbody_registration").append("<tr><td class='ky' >" + key + "</td><td>" + AnnouncementTitle + "</td><td>" + AnnouncementPlace +
                    "</td><td>" + AnnouncementDate + "</td><td>" + AnnouncementDescription + "</td><td>" +
                    "<button class='openmodal myBtn'>View</button>" +
                    "<div class='modal myModal'>" +
                    "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                    "<h2>" + AnnouncementTitle + "</h2>" +
                    "<span class='close'>&times;</span>" +
                    "</div>" +
                    "<p><b>Date of activity: </b>" + AnnouncementDate + "</p>" +
                    "<p><b>Place of activity: </b>" + AnnouncementPlace + "</p>" +
                    "<p><b>Description: </b>" + AnnouncementDescription + " </p>" +
                    "<p><b>User ID: </b>" + UserID + "</p>" +
                    "<button id='Approved'><i class='fas fa-check'></i> Approved</button>" +
                    "<button id='Declined'><i class='fas fa-flag'></i> Declined</button>" +
                    "</div>" +
                    "</div></td></tr>")
                }

              })
            } else {
              $("#tbody_registration").empty();
              $("#tbody_registration").append("<td id='nullRecords'colspan=6>No Registration Request.</td>");
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
  }, 1000);


$(function () { //Respond to registration
  $("#tbody_registration").delegate("tr #Approved", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

    var r = confirm("Do you want to respond on Report ID " + $id + "?");
    if (r == true) {
      firebase.database().ref("activityregistration/" + $id).update({
        Status: "Approved" //!!!! TODO: FETCH BARANGAY HERE (SA LAHAT NG FUNCTIONS)
      });
      alert('Updated Registration Request Status of ID ' + $id);
    }
  });
});
$(function () { //Respond to registration
  $("#tbody_registration").delegate("tr #Declined", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

    var r = confirm("Do you want to respond on Report ID " + $id + "?");
    if (r == true) {
      firebase.database().ref("activityregistration/" + $id).update({
        Status: "Declined" //!!!! TODO: FETCH BARANGAY HERE (SA LAHAT NG FUNCTIONS)
      });
      alert('Updated Registration Request Status of ID ' + $id);
    }
  });
});