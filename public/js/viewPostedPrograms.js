
window.onload =function viewPostedPrograms() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = firebase.auth().currentUser.uid;
        var users = firebase.database().ref('users');
        var ref = users.orderByChild('UserID').equalTo(userId);
   
        ref.once('value', function (snapshot) {
          var parentKey = Object.keys(snapshot.val())[0];
  
          return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
            brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
            var rootRef = firebase.database().ref("newsfeed");
            rootRef.on("value", snap => {
              if (snap.exists()) {
                $("#tbody_programs").html("");
                snap.forEach(snap => {
                  var key = snap.key;
                  var Barangay = snap.child("Barangay").val();
                  var Category = snap.child("Category").val();
                  var Description = snap.child("Description").val();
                  var PhotoURL = snap.child("PhotoURL").val();
                  var Title = snap.child("Title").val();
                  var When = snap.child("When").val();
                  var Where = snap.child("Where").val();
                  
                 if(Barangay==brgy){
                  $("#tbody_programs").append("<tr><td class='ky' hidden>" + key + "</td><td>" + Title + "</td><td>" + Where +
                  "</td><td>" + When + "</td><td>" + Category+
                  "</td><td>" + Description + "</td><td>" + 
                  "<button class='openmodal myBtn'>View</button>" +
                  "<div class='modal myModal'>" +
                  "<div class='modal-content'>" +
                  "<div class='modal-header'>" +
                  "<h2>" + Title + "</h2>" +
                  "<span class='close'>&times;</span>" +
                  "</div>" +
                  "<p><b>Type of activity: </b>" + Category + "</p>" +
                  "<p><b>Date of activity: </b>" + When + "</p>" +
                  "<p><b>Place of activity: </b>" + Where + "</p>" +
                  "<p><b>Description: </b>" + Description + " </p>" +
                  "<button id='img' onclick=window.open('" + PhotoURL + "')><i class='fas fa-camera'></i> View Image</button>"+
                  "</div>" +
                  "</div></td></tr>")
                 }
                
                })
              } else {
                $("#tbody_programs").empty();
                $("#tbody_programs").append("<td id='nullRecords'colspan=5>No Feedbacks.</td>");
              }
            });
          });
        });
      }
    });
  }
  
  window.setInterval(
      function () {
        var modals = document.getElementsByClassName('modal');
        // Get the button that opens the modal
        var btns = document.getElementsByClassName("openmodal");
        var spans = document.getElementsByClassName("close");
        for (let i = 0; i < btns.length; i++) {
          btns[i].onclick = function () {
            modals[i].style.display = "block";
          }
        }
        for (let i = 0; i < spans.length; i++) {
          spans[i].onclick = function () {
            modals[i].style.display = "none";
          }
        }
      }
      , 1000);
  