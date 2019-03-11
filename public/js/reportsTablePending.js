/* Fetch Reports JavaScript (firebase dependent) */
//barangay-status
//firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(barangay+"_"+Pending);

function reportsTablePending() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(barangay+"_Pending");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_pending").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status")
                $("#tbody_pending").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
                  "<button class='openmodal myBtn'>View</button>" +
                  "<div class='modal myModal'>" +
                  "<div class='modal-content'>" +
                  "<div class='modal-header'>" +
                  "<h2>" + category + "</h2>" +
                  "<span class='close'>&times;</span>" +
                  "</div>" +
                  "<p><b>Report ID: </b>" + key + "</p>" +
                  "<p><b>Report Date: </b>" + date + " </p>" +
                  "<p><b>Location: </b>" + location + " </p>" +
                  "<p><b>Report Details: </b>" + report + " </p>" +
                  "<p><b>Report Status: </b>" + status + " </p>" +
                  "<b>Actions:</b> <button id='respond'><i class='fas fa-check'></i> Respond to this report</button> <button id='markSpam'><i class='fas fa-flag'></i> Mark Spam</button>" +
                  "<button id='img' onclick=window.open('" + photoURL + "')><i class='fas fa-camera'></i> View Report Image FullScreen</button>" +
                  "</div>" +
                  "</div></td></tr>")
              })
            } else {
              $("#tbody_pending").empty();
              $("#tbody_pending").append("<td id='nullRecords'colspan=6>No Pending Reports.</td>");
            }
          });
        });
      });
    }
  });
}

window.onload = reportsTablePending();