
function requestUtilsTableReturned() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/services").orderByChild("Barangay_Status").equalTo(barangay + "_Returned");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_body13").html("");
                            snap.forEach(snap => {
                                var key = snap.key;
                                var Category = snap.child("ServiceType").val();
                                var Dates = snap.child("RequestDate").val();
                                var Location = snap.child("Address").val();
                                var startTime = snap.child("StartTime").val();
                                var startDate = snap.child("StartDate").val();
                                var returnDate = snap.child("EndDate").val();
                                var returnTime = snap.child("EndTime").val();
                                
                var Fullname = snap.child("Fullname").val();
                                var status = snap.child("Status").val();
                                var Barangay = snap.child("Barangay").val();
                                if(Category =="Tent"){
                                $("#table_body13").append("<tr><td class='ky'>" + key + "</td><td>" + Category + "</td><td>" + Dates +
                                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                                    returnDate + " " + returnTime + "</td><td>" + 
                                    "<button class='openmodals myBtn'>View</button>" +
                                    "<div class='modals myModal'>" +
                                    "<div class='modals-content'>" +
                                    "<div class='modals-header'>" +
                                    "<h2>" + Category + "</h2>" +
                                    "<span class='closes'>&times;</span>" +
                                    "</div><br><br><br><br>" +
                                    
                                    "<p><b>Request ID: </b>" + key + "</p>" +
                                    "<p><b>Full Name: </b>" + Fullname +
                                    "<b> Barangay: </b>" + Barangay +
                                    "<b> Date: </b>" + Dates + " </p>" +
                                    "<p><b>Borrowed Date: </b>" + startDate + " </p>" +
                                    "<p><b>Borrowed Time: </b>" + startTime + " </p>" +
                                    "<p><b>Return Date: </b>" + returnDate + " </p>" +
                                    "<p><b>Return Time: </b>" + returnTime + " </p>" +
                                    "<p><b>Status: </b>" + status + " </p>" +
                                   "</div>" +
                                    "</div></td></tr>")
                                }else {
                                  $("#table_body13").empty();
                                  $("#table_body13").append("<td id='nullRecords'colspan=7>No Pending Services Requests.</td>")
                              }
                            })
                        } else {
                            $("#table_body13").empty();
                            $("#table_body13").append("<td id='nullRecords'colspan=7>No Pending Services Requests.</td>")
                        }
                    });
                });
            });
        }
    });
}
 
////////
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
window.onload =
requestUtilsTableReturned();