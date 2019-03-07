function reportsTableSpam() {
  var rootRef = firebase.database().ref("reports").orderByChild("Status").equalTo("Spam");
  rootRef.on("value", snap => {
    if(snap.exists()){
    $("#tbody_spam").html("");
    snap.forEach(snap => {
      var key = snap.key;
      var category = snap.child("Category").val();
      var date = snap.child("Date").val();
      var location = snap.child("Location").val();
      var report = snap.child("Report").val();
      $("#tbody_spam").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report)
    })
  }
  else {
    $("#tbody_spam").append("<td id='nullRecords'colspan=6>No Spam Reports Tagged.</td>")
  }
  });
}

window.onload = reportsTableSpam();