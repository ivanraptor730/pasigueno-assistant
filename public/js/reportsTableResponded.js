function reportsTableResponded() {
  var rootRef = firebase.database().ref("reports").orderByChild("Status").equalTo("Responded");
  rootRef.on("value", snap => {
    if(snap.exists()){
    $("#tbody_responded").html("");
    snap.forEach(snap => {
      var key = snap.key;
      var category = snap.child("Category").val();
      var date = snap.child("Date").val();
      var location = snap.child("Location").val();
      var report = snap.child("Report").val();
      $("#tbody_responded").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td>")
    })
  }
  else{
    $("#tbody_responded").append("<td id='nullRecords'colspan=7>No Pending Reports.</td>")

  }
  });
}

window.onload = reportsTableResponded();
