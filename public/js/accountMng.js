function accountMng() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("users");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_account").empty();
                            snap.forEach(snap => {
                                var key = snap.key;
                                var Address = snap.child("Address").val();
                                var Dates = snap.child("Date").val();
                                var emailAdd = snap.child("EmailAddress").val();
                                var FullName = snap.child("FullName").val();
                                var Purpose = snap.child("Purpose").val();
                                var UserID = snap.child("UserID").val();
                                var Barangay = snap.child("Barangay").val();
                                var BirthDate = snap.child("Birthplace").val();
                                
                                var status = snap.child("Status").val();
                                var userType = snap.child("UserType").val();
                     var Answer;
                     var Question;
                                if(userType != "User"){
                                
                      Answer = " ";
                      Question = " ";
                                }else{
                       Answer = snap.child("Answer2").val();
                       Question = snap.child("Question2").val();
                                }
                               if(Barangay==barangay){
                                $("#table_account").append("<tr><td class='ky' >" + key +
                                "</td><td class='uid' hidden>" + UserID + "</td><td>" + FullName + "</td><td>" 
                                + emailAdd + "</td><td>" + Address + "</td><td>"+status+"</td><td>" +
                                   "<button class='openmodals myBtn'>View</button>" +
                                   "<div class='modals myModal'>" +
                                   "<div class='modals-content'>" +
                                   "<div class='modals-header'>" +
                                   "<h2>" + FullName + "</h2>" +
                                   "<span class='closes'>&times;</span>" +
                                   "</div>" +
                                   "<p><b>User ID: </b>" + UserID + "</p>" +
                                   "<p><b>Barangay: </b>" + Barangay + " </p>" +
                                   "<p><b>Full name: </b>" + FullName + " </p>" +
                                   "<p><b>Address: </b>" + Address + " </p>" +
                                   "<p><b>Username: </b>" + emailAdd + " </p>" +
                                   "<p><b>"+Question+"</b> " + Answer + " </p>" +
                                   "<p><b>Status: </b>" + status + " </p>" +
                                   "<b>Actions:</b> <button id='accntApproved'>Activate</button><button id='accntDeclined'>Decline</button><br>" +
                                   "</div>" +
                                   "</div></td></tr>")
                               }
                            })
                        } else {
                            $("#table_account").empty();
                            $("#table_account").append("<td id='nullRecords'colspan=7>No Account Request.</td>")
                        }
                    });
                });
            });
        }
    });
}
 
var category1 = document.getElementById("ManageAccount");
function onChangeManageAccount(){
  var categorys = category1.value;
  if(categorys=="--"){
    
window.onload = accountMng();
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
          var rootRef = firebase.database().ref("users").orderByChild("Status").equalTo(categorys);
          rootRef.on("value", snap => {
              if (snap.exists()) {
                  $("#table_account").empty();
                  snap.forEach(snap => {
                      var key = snap.key;
                      var Address = snap.child("Address").val();
                      var Dates = snap.child("Date").val();
                      var emailAdd = snap.child("EmailAddress").val();
                      var FullName = snap.child("FullName").val();
                      var Purpose = snap.child("Purpose").val();
                      var UserID = snap.child("UserID").val();
                      var Barangay = snap.child("Barangay").val();
                      var BirthDate = snap.child("Birthplace").val();
                      var status = snap.child("Status").val();
                      var Answer;
                     var Question;
                     
                     var userType = snap.child("UserType").val();
                                if(userType != "User"){
                                  
                      Answer = " ";
                      Question = " ";
                                }if(userType == "User"){
                       Answer = snap.child("Answer2").val();
                       Question = snap.child("Question2").val();
                                }
                      if(Barangay==barangay){
                        $("#table_account").append("<tr><td class='ky' >" + key +
                        "</td><td class='uid' hidden>" + UserID + "</td><td>" + FullName + "</td><td>" 
                        + emailAdd + "</td><td>" + Address + "</td><td>"+status+"</td><td>" +
                           "<button class='openmodal myBtn'>View</button>" +
                           "<div class='modals myModal'>" +
                           "<div class='modals-content'>" +
                           "<div class='modals-header'>" +
                           "<h2>" + FullName + "</h2>" +
                           "<span class='closes'>&times;</span>" +
                           "</div>" +
                           "<p><b>User ID: </b>" + UserID + "</p>" +
                           "<p><b>Barangay: </b>" + Barangay + " </p>" +
                           "<p><b>Full name: </b>" + FullName + " </p>" +
                           "<p><b>Address: </b>" + Address + " </p>" +
                           "<p><b>Username: </b>" + emailAdd + " </p>" +
                           "<p><b>"+Question+"</b> " + Answer + " </p>" +
                           "<p><b>Status: </b>" + status + " </p>" +
                           "<b>Actions:</b> <button id='accntApproved'>Activate</button><button id='accntDeclined'>Decline</button>" +
                           "</div>" +
                           "</div></td></tr>")
                      }
                  })
              } else {
                  $("#table_account").empty();
                  $("#table_account").append("<td id='nullRecords'colspan=7>No Account Request.</td>")
              }
          });
        });
      });
    }
  });
}
}

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
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
window.onload= accountMng();