/* Fetch Reports JavaScript (firebase dependent) */

function reportsTablePending() {
  var rootRef = firebase.database().ref("reports").orderByChild("Status").equalTo("Pending");
  rootRef.on("value", snap => {
    if(snap.exists()){
    $("#tbody_pending").html("");
    snap.forEach(snap => {
      var key = snap.key;
      var category = snap.child("Category").val();
      var date = snap.child("Date").val();
      var location = snap.child("Location").val();
      var report = snap.child("Report").val();
      var status = snap.child("Status").val();
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
        "<b>Actions:</b> <button id='respond'>Take Action</button> <button id='markSpam'>Mark Spam</button>" +
        "</div>" +
        "</div></td></tr>")
    })
  }
  else{
    $("#tbody_pending").append("<td id='nullRecords'colspan=7>No Pending Reports.</td>")
  }
  });
}

window.onload = reportsTablePending();

