function reportsTableResponded() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(barangay+"_Responded");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_responded").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                $("#tbody_responded").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td>");
              })
            } else {
              $("#tbody_responded").empty();
              $("#tbody_responded").append("<td id='nullRecords' colspan='6'>No Responded Reports.</td>");
            }
          });
        });
      });
    }
  });
}
///

var category1 = document.getElementById("categoryResponded");
function onChangeResponded(){
  var categorys = category1.value;
  if(categorys=="--"){
    
window.onload = reportsTableResponded();
  }
 else{
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
    
     
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var bgy = brgy + "_" + categorys;
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Category").equalTo(bgy);
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_responded").empty();
              snap.forEach(snap => {
                
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status")
              if(status=="Responded"){
                $("#tbody_responded").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td>");

              }
              })
            } else {
              $("#tbody_responded").empty();
              $("#tbody_responded").append("<td id='nullRecords' colspan='6'>No  Responded Reports.</td>");
            }
          });
        });
      });
    }
  });
}
}
////
window.onload = reportsTableResponded();
