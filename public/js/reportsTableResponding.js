function reportsTableResponding() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(barangay+"_Responding");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_responding").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                $("#tbody_responding").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td>");
              })
            } else {
              $("#tbody_responding").empty();
              $("#tbody_responding").append("<td id='nullRecords' colspan='6'>No Responding-to Reports.</td>");
            }
          });
        });
      });
    }
  });
}

window.onload = reportsTableResponding();