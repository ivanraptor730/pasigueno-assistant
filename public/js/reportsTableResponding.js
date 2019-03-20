function reportsTableResponding() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(brgy+"_Responding");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_responding").html("");
              snap.forEach(snap => {var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status");
                var Anonymous = snap.child("Anonymous").val();
               
                var lang = snap.child("Longitude").val();
                var lat = snap.child("Latitude").val();
                var userID1234;

                if(Anonymous == "true"){
                  userID1234 = "Anonymous";
                }
                if(Anonymous=="false"){
                   userID1234 = snap.child("UserID").val();
                }
                $("#tbody_responding").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>"+
                "<button class='openmodal myBtn'>View</button>" +
                "<div class='modal myModal'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<h2>" + category + "</h2>" +
                "<span class='close'>&times;</span>" +
                "</div>" + 
                "<p><b>Report ID: </b>" + key + "</p>" +
                "<p><b>User ID: </b>" + userID1234 + " </p>" +
                "<p><b>Report Date: </b>" + date + " </p>" +
                "<p><b>Location: </b>" + location + " </p>" +
                "<p><b>Report Details: </b>" + report + " </p>" +
                "<p><b>Report Status: </b>" + status + " </p>" +
                "<b>Actions:</b> <button id='responded2'><i class='fas fa-check'></i> Mark as responded</button> <button id='markSpam'><i class='fas fa-flag'></i> Mark Spam</button>" +
                "<button id='img' onclick=window.open('" + photoURL + "')><i class='fas fa-camera'></i> View Report Image FullScreen</button>"+
                "<button id='openMap' class='openmodal myBtn1'> View Map</button>" +
                "</div>" +
                "</div>"+
                "<div class='modal myModal'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<h2>Map</h2>" +
                "<span class='close'>&times;</span>" +
                "</div>" +
                "<div class='map-canvas' id='map-canvas' name='map-canvas' style='width:1025px; height:500px;'>"+
                "</div>"+
                "</div>"+ 
                "</div>"+
                "</tr></td>"
                );
              })
            } else {
              $("#tbody_responding").empty();
              $("#tbody_responding").append("<td id='nullRecords' colspan='6'>No Responding-to Reports.</td>");
            }
          });
        });
      });
    }
  });
}
////

var category1 = document.getElementById("categoryResponding");
function onChangeResponding(){
  var categorys = category1.value;
  if(categorys=="--"){
window.onload = reportsTableResponding();
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
              $("#tbody_responding").html("");
              snap.forEach(snap => {var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status");
                var Anonymous = snap.child("Anonymous").val();
               
                var lang = snap.child("Longitude").val();
                var lat = snap.child("Latitude").val();
                var userID1234;

                if(Anonymous == "true"){
                  userID1234 = "Anonymous";
                }
                if(Anonymous=="false"){
                   userID1234 = snap.child("UserID").val();
                }
                if(status=="Responding"){
                $("#tbody_responding").append("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>"+
                "<button class='openmodal myBtn'>View</button>" +
                "<div class='modal myModal'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<h2>" + category + "</h2>" +
                "<span class='close'>&times;</span>" +
                "</div>" + 
                "<p><b>Report ID: </b>" + key + "</p>" +
                "<p><b>User ID: </b>" + userID1234 + " </p>" +
                "<p><b>Report Date: </b>" + date + " </p>" +
                "<p><b>Location: </b>" + location + " </p>" +
                "<p><b>Report Details: </b>" + report + " </p>" +
                "<p><b>Report Status: </b>" + status + " </p>" +
                "<b>Actions:</b> <button id='responded2'><i class='fas fa-check'></i> Mark as Responded</button> <button id='markSpam'><i class='fas fa-flag'></i> Mark Spam</button>" +
                "<button id='img' onclick=window.open('" + photoURL + "')><i class='fas fa-camera'></i> View Report Image FullScreen</button>"+
                "<button id='openMap' class='openmodal myBtn1'> View Map</button>" +
                "</div>" +
                "</div>"+
                "<div class='modal myModal'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<h2>Map</h2>" +
                "<span class='close'>&times;</span>" +
                "</div>" +
                "<div class='map-canvas' id='map-canvas' name='map-canvas' style='width:1025px; height:500px;'>"+
                "</div>"+
                "</div>"+ 
                "</div>"+
                "</tr></td>"
                );
              }})
            }  else {
            $("#tbody_responding").empty();
            $("#tbody_responding").append("<td id='nullRecords' colspan='6'>No Respondings-to Reports.</td>");
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
////
window.onload = reportsTableResponding();