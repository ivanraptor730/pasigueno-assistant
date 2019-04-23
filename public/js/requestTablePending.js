function requestFormsTablePending() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/forms").orderByChild("Barangay_Status").equalTo(barangay + "_Pending");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_body").empty();
                            snap.forEach(snap => {
                                var key = snap.key;
                                var Forms = snap.child("Form").val();
                                var Dates = snap.child("Date").val();
                                var dateOfBirth = snap.child("Birthdate").val();
                                var FullName = snap.child("Fullname").val();
                                var Purpose = snap.child("Purpose").val();
                                var UserID = snap.child("UserID").val();
                                var Barangay = snap.child("Barangay").val();
                                var BirthDate = snap.child("Birthplace").val();
                                
                                var status = snap.child("Status").val();
                               
                                $("#table_body").append("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td>" + FullName + "</td><td>" + Purpose + "</td><td>" +
                                    "<button class='openmodals myBtn'>View</button>" +
                                    "<div class='modals myModal'>" +
                                    "<div class='modals-content'>" +
                                    "<div class='modals-header'>" +
                                    "<h2>" + Forms + "</h2>" +
                                    "<span class='closes'>&times;</span>" +
                                    "</div>" +
                                    "<p><b>Request ID: </b>" + key + "</p>" +
                                    "<p><b>Barangay: </b>" + Barangay + " </p>" +
                                    "<p><b>Full name: </b>" + FullName + " </p>" +
                                    "<p><b>Date Of Birth: </b>" + dateOfBirth + " </p>" +
                                    "<p><b>Place Of Birth: </b>" + BirthDate + " </p>" +
                                    "<p><b>Purpose: </b>" + Purpose + " </p>" +
                                    "<p><b>Status: </b>" + status + " </p>" +
                                    "<b>Actions:</b><br> <button id='takeActionApproved'>Approve</button><br> <button id='Declined'>Decline</button>" +
                                    "</div>" +
                                    "</div></td></tr>")
                                
                            })
                        } else {
                            $("#table_body").empty();
                            $("#table_body").append("<td id='nullRecords'colspan=7>No Pending Forms.</td>")
                        }
                    });
                });
            });
        }
    });
}
 
var category1 = document.getElementById("formsPending");
function onChangeFormsPending(){
  var categorys = category1.value;
  if(categorys=="--"){
    
window.onload = requestFormsTablePending();
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
          var rootRef = firebase.database().ref("request/forms").orderByChild("Barangay_Form").equalTo(bgy);
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#table_body").empty();
              snap.forEach(snap => {
                var key = snap.key;
                var Forms = snap.child("Form").val();
                var Dates = snap.child("Date").val();
                var dateOfBirth = snap.child("Birthdate").val();
                var FullName = snap.child("Fullname").val();
                var Purpose = snap.child("Purpose").val();
                var UserID = snap.child("UserID").val();
                var Barangay = snap.child("Barangay").val();
                var BirthDate = snap.child("Birthplace").val();
                
                var status = snap.child("Status").val();
                               
                if(status=="Pending"){
                $("#table_body").append("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td>" + FullName + "</td><td>" + Purpose + "</td><td>" +
                    "<button class='openmodals myBtn'>View</button>" +
                    "<div class='modals myModal'>" +
                    "<div class='modals-content'>" +
                    "<div class='modals-header'>" +
                    "<h2>" + Forms + "</h2>" +
                    "<span class='closes'>&times;</span>" +
                    "</div>" +
                    "<p><b>Request ID: </b>" + key + "</p>" +
                    "<p><b>Barangay: </b>" + Barangay + " </p>" +
                    "<p><b>Full name: </b>" + FullName + " </p>" +
                    "<p><b>Date Of Birth: </b>" + dateOfBirth + " </p>" +
                    "<p><b>Place Of Birth: </b>" + BirthDate + " </p>" +
                    "<p><b>Purpose: </b>" + Purpose + " </p>" +
                    "<p><b>Status: </b>" + status + " </p>" +
                    "<b>Actions:</b><br> <button id='takeActionApproved'>Approve</button><button id='takeActionDeclined'>Decline</button>" +
                    "</div>" +
                    "</div></td></tr>")
                }
              })
            } else {
              $("#table_body").empty();
              $("#table_body").append("<td id='nullRecords'colspan=6>No Pending Forms.</td>");
            }
          });
        });
      });
    }
  });
}
}
////////
function requestUtilsTablePending() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/services").orderByChild("Barangay_Status").equalTo(barangay + "_Pending");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_body1").html("");
                            snap.forEach(snap => {
                                var key = snap.key;
                                var Category = snap.child("ServiceType").val();
                                var Dates = snap.child("RequestDate").val();
                                var Location = snap.child("Address").val();
                                var startTime = snap.child("StartTime").val();
                                var startDate = snap.child("StartDate").val();
                                var returnDate = snap.child("EndDate").val();
                                var returnTime = snap.child("EndTime").val();
                                
                                var status = snap.child("Status").val();
                                var Barangay = snap.child("Barangay").val();
                                $("#table_body1").append("<tr><td class='ky'>" + key + "</td><td>" + Category + "</td><td>" + Dates +
                                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                                    returnDate + " " + returnTime + "</td><td>" + 
                                    "<button class='openmodals myBtn'>View</button>" +
                                    "<div class='modals myModal'>" +
                                    "<div class='modals-content'>" +
                                    "<div class='modals-header'>" +
                                    "<h2>" + Category + "</h2>" +
                                    "<span class='closes'>&times;</span>" +
                                    "</div>" +
                                    "<p><b>Request ID: </b>" + key + "</p>" +
                                    "<p><b>Barangay: </b>" + Barangay + " </p>" +
                                    "<p><b>Date: </b>" + Dates + " </p>" +
                                    "<p><b>Borrowed Date: </b>" + startDate + " </p>" +
                                    "<p><b>Borrowed Time: </b>" + startTime + " </p>" +
                                    "<p><b>Return Date: </b>" + returnDate + " </p>" +
                                    "<p><b>Return Time: </b>" + returnTime + " </p>" +
                                    "<p><b>Status: </b>" + status + " </p>" +
                                    "<b>Actions:</b><br> <button id='takeActionApproved'>Approve</button><button id='takeActionDeclined'>Decline</button>" +
                                    "</div>" +
                                    "</div></td></tr>")
                            })
                        } else {
                            $("#table_body1").empty();
                            $("#table_body1").append("<td id='nullRecords'colspan=7>No Pending Services Requests.</td>")
                        }
                    });
                });
            });
        }
    });
}
 
var category2 = document.getElementById("utilsPending");
function onChangeFormsUtilsPending(){
  var categorys = category2.value;
  if(categorys=="--"){
    
window.onload = requestUtilsTablePending();
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
          alert(bgy);
          var rootRef = firebase.database().ref("request/services").orderByChild("Barangay_ServiceType").equalTo(bgy);
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#table_body1").empty();
              snap.forEach(snap => {
                var key = snap.key;
                var Category = snap.child("ServiceType").val();
                var Dates = snap.child("RequestDate").val();
                var Location = snap.child("Address").val();
                var startTime = snap.child("StartTime").val();
                var startDate = snap.child("StartDate").val();
                var returnDate = snap.child("EndDate").val();
                var returnTime = snap.child("EndTime").val();
                var status = snap.child("Status").val();
            
                var Barangay = snap.child("Barangay").val();
                if(status == "Pending"){
                  
              $("#table_body1").empty();
                  $("#table_body1").append("<tr><td class='ky'>" + key + "</td><td>" + Category + "</td><td>" + Dates +
                "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                returnDate + " " + returnTime + "</td><td>" + 
                "<button class='openmodals myBtn'>View</button>" +
                "<div class='modals myModal'>" +
                "<div class='modals-content'>" +
                "<div class='modals-header'>" +
                "<h2>" + Category + "</h2>" +
                "<span class='closes'>&times;</span>" +
                "</div>" +
                "<p><b>Request ID: </b>" + key + "</p>" +
                "<p><b>Barangay: </b>" + Barangay + " </p>" +
                "<p><b>Date: </b>" + Dates + " </p>" +
                "<p><b>Borrowed Date: </b>" + startDate + " </p>" +
                "<p><b>Borrowed Time: </b>" + startTime + " </p>" +
                "<p><b>Return Date: </b>" + returnDate + " </p>" +
                "<p><b>Return Time: </b>" + returnTime + " </p>" +
                "<p><b>Status: </b>" + status + " </p>" +
                "<b>Actions:</b><br> <button id='takeActionApproved'>Approve</button><br> <button id='takeActionDeclined'>Decline</button>" +
                "</div>" +
                "</div></td></tr>")
                }else {
                  $("#table_body1").empty();
                  $("#table_body1").append("<td id='nullRecords'colspan=7>No Pending Services Requests.</td>");
                }
                  })
                }else {
              $("#table_body1").empty();
              $("#table_body1").append("<td id='nullRecords'colspan=7>No Pending Services Requests.</td>");
            }
           
          });
        });
      });
    }
  });
}
}
////////
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
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
window.onload = requestFormsTablePending();
requestUtilsTablePending();