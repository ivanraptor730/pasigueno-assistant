function reportsTableResponding() {
  var rootRef = firebase.database().ref("reports").orderByChild("Status").equalTo("Responding");
  rootRef.on("value", snap => {
    if(snap.exists()){
    $("#tbody_responding").html("");
    snap.forEach(snap => {
      var key = snap.key;
      var category = snap.child("Category").val();
      var date = snap.child("Date").val();
      var location = snap.child("Location").val();
      var report = snap.child("Report").val();
      $("#tbody_responding").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
        "<button id='responded'>Mark Responded</button>")
    })
  }
  else{
    $("#tbody_responding").append("<td id='nullRecords'colspan=7>No Reports Responding-to.</td>")

  }
  });
}

window.onload = reportsTableResponding();