/* Fetch Reports JavaScript (firebase dependent) */
//barangay-status
//firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(barangay+"_"+Pending);

function reportsTablePending() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
 
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(brgy+"_Pending");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_pending").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status");
                var Anonymous = snap.child("Anonymous").val();
                var message = snap.child("Response").val();
               
                var lang = snap.child("Longitude").val();
                var lat = snap.child("Latitude").val();
                var userID1234;

                if(Anonymous == "true"){
                  userID1234 = "Anonymous";
                }
                if(Anonymous=="false"){
                   userID1234 = snap.child("UserID").val();
                }
                $("#tbody_pending").prepend("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
                "<button class='openmodals' onclick='openMap()'>View</button>" +
                "<div class='modals myModal'>" +
                "<div class='modals-content'>" +
                "<div class='modals-header'>" +
                "<h2 id='category095'>" + category + "</h2>" +
                "<span class='closes'>&times;</span>" +
                "</div>" +
                "<p><b>Report ID: </b>" + key + "</p>" +
                "<p><b>User ID: </b>" + userID1234 + " </p>" +
                "<p><b>Report Date: </b>" + date + " </p>" +
                "<p><b>Location: </b>" + location + " </p>" +
                "<p><b>Report Details: </b>" + report + " </p>" +
                "<p><b>Report Status: </b>" + status + " </p>" +
                "<b>Actions:</b><br> <button id='respond'><i class='fas fa-check'></i> Respond to this report</button> <button id='markSpam'><i class='fas fa-flag'></i> Mark Spam</button>" +
                "<button id='img' onclick=window.open('" + photoURL + "')><i class='fas fa-camera'></i> View Report Image FullScreen</button>" +
                "</div>" +
                "</div>"+
                "</div>"+"</td></tr>")
                   
              })
            } else {
              $("#tbody_pending").empty();
              $("#tbody_pending").prepend("<td id='nullRecords'colspan=6>No Pending Reports.</td>");
            }
          });
        });
      });
    }
  });
}
var category1 = document.getElementById("categoryPending");
function onChangePending(){
  var categorys = category1.value;
  if(categorys=="--"){
    
window.onload = reportsTablePending();
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
              $("#tbody_pending").empty();
              snap.forEach(snap => {
               
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status");
                var Anonymous = snap.child("Anonymous");
                var userIDs = snap.child("UserID");;
                var Anonymous = snap.child("Anonymous").val();
               var Longitude = snap.child("Longitude").val();
               var message = snap.child("Response").val();
                var userID1234;

                if(Anonymous == "true"){
                  userID1234 = "Anonymous";
                }
                if(Anonymous=="false"){
                   userID1234 = snap.child("UserID").val();
                }
 

              if(status=="Pending"){
                $("#tbody_pending").prepend("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
                "<button class='openmodals' onclick='openMap()'>View</button>" +
                "<div class='modals myModal'>" +
                "<div class='modals-content'>" +
                "<div class='modals-header'>" +
                "<h2 id='category095'>" + category + "</h2>" +
                "<span class='closes'>&times;</span>" +
                "</div>" +
                "<p><b>Report ID: </b>" + key + "</p>" +
                "<p><b>User ID: </b>" + userID1234 + " </p>" +
                "<p><b>Report Date: </b>" + date + " </p>" +
                "<p><b>Location: </b>" + location + " </p>" +
                "<p><b>Report Details: </b>" + report + " </p>" +
                "<p><b>Report Status: </b>" + status + " </p>" +
                "<b>Actions:</b><br> <button id='respond'><i class='fas fa-check'></i> Respond to this report</button> <button id='markSpam'><i class='fas fa-flag'></i> Mark Spam</button>" +
                "<button id='img' onclick=window.open('" + photoURL + "')><i class='fas fa-camera'></i> View Report Image FullScreen</button>" +
                "</div>" +
                "</div>"+
                "</div>"+"</td></tr>")
                  
              }
              })
            } else {
              $("#tbody_pending").empty();
              $("#tbody_pending").prepend("<td id='nullRecords'colspan=6>No Pending Reports.</td>");
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
window.onload = reportsTablePending();


