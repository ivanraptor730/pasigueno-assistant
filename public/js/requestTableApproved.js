function requestFormsTableApproved() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/forms").orderByChild("Barangay_Status").equalTo(barangay + "_Approved");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_body").html("");
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
                                $("#table_body").prepend("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td id='usky'>" + FullName + "</td><td>" + Purpose + "</td>")
                            })
                        } else {
                            $("#table_body").empty();
                            $("#table_body").prepend("<td id='nullRecords'colspan=7>No Approved Forms Requests.</td>")
                        }
                    });
                });
            });
        }
    });
}

var category1 = document.getElementById("formApproved");
function onChangeFormApproved(){    
  var categorys = category1.value;
  if(categorys=="--"){
    
window.onload = requestFormsTableApproved();
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
                if(status=="Approved"){
                $("#table_body").prepend("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td id='usky'>" + FullName + "</td><td>" + Purpose + "</td>")
                }
            })
            } else {
              $("#table_body").empty();
              $("#table_body").prepend("<td id='nullRecords'colspan=6>No Approved Form Request.</td>");
            }
          });
        });
      });
    }
  });
}
}
function requestUtilsTableApproved() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/services").orderByChild("Barangay_Status").equalTo(barangay + "_Approved");
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
                                $("#table_body1").prepend("<tr><td class='ky'>" + key + "</td><td>" + Category + "</td><td>" + Dates +
                                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                                    returnDate + " " + returnTime + "</td></tr>")
                            })
                        } else {
                            $("#table_body1").empty();
                            $("#table_body1").prepend("<td id='nullRecords'colspan=7>No Approved Services Requests.</td>")
                        }
                    });
                });
            });
        }
    });
}
var category2 = document.getElementById("utilApproved");
function onChangeFormsUtilsApproved(){
  var categorys = category2.value;
  if(categorys=="--"){
    
window.onload = requestUtilsTableApproved();
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
                if(status=="Approved"){
                  
              $("#table_body1").empty();
                $("#table_body1").prepend("<tr><td class='ky'>" + key + "</td><td>" + Category + "</td><td>" + Dates +
                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                    returnDate + " " + returnTime + "</td></tr>")
                }else {
                  $("#table_body1").empty();
                  $("#table_body1").prepend("<td id='nullRecords'colspan=7>No Approved Services Requests.</td>");
                }
            })
            } else {
              $("#table_body1").empty();
              $("#table_body1").prepend("<td id='nullRecords'colspan=7>No Approved Services Requests.</td>");
            }
          });
        });
      });
    }
  });
}
}

window.onload = requestFormsTableApproved(); 
requestUtilsTableApproved();
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