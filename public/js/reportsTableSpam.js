function reportsTableSpam() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);
      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
          var rootRef = firebase.database().ref("reports").orderByChild("Barangay_Status").equalTo(barangay+"_Spam");
          rootRef.on("value", snap => {
            if (snap.exists()) {
              $("#tbody_spam").html("");
              snap.forEach(snap => {
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                $("#tbody_spam").prepend("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td>");
              })
            } else {
              $("#tbody_spam").empty();
              $("#tbody_spam").prepend("<td id='nullRecords' colspan='6'>No Spam Reports.</td>");
            }
          });
        });
      });
    }
  });
}

///
var category1 = document.getElementById("categorySpam");
function onChangeSpam(){
  var categorys = category1.value;
  if(categorys=="--"){
    
window.onload = reportsTableSpam();
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
              $("#tbody_spam").empty();
              snap.forEach(snap => {
                
                var key = snap.key;
                var category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var location = snap.child("Location").val();
                var report = snap.child("Report").val();
                var status = snap.child("Status").val();
                var photoURL = snap.child("PhotoURL").val();
                var catstat = snap.child("Barangay_Status")
              if(status=="Spam"){
                $("#tbody_spam").prepend("<tr><td class='ky'>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td>");
              }
            })
            } else {
              $("#tbody_spam").empty();
              $("#tbody_spam").prepend("<td id='nullRecords' colspan='6'>No Spam Reports.</td>");
            }
          });
        });
      });
    }
  });
}
}

window.onload = reportsTableSpam();
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