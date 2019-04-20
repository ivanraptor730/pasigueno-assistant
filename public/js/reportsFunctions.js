var dateToday = formatDate(new Date());
var timeToday = formatAMPM(new Date());

$(function () { //Respond to Reports
  $("#tbody_pending").delegate("tr #respond", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find("#ky").text();
    var $chatname = $chtName;
    var r = confirm("Do you want to respond on Report ID " + $id + "?");
    if (r == true) {
      firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          var userId = firebase.auth().currentUser.uid;
          var users = firebase.database().ref('users');
          var ref = users.orderByChild('UserID').equalTo(userId);

          ref.once('value', function (snapshot) {
            var parentKey = Object.keys(snapshot.val())[0];

            return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {

              barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';

              //to do: if report onchange is "pending {"
              
              firebase.database().ref("reports/" + barangay + "/" + $chatname + "/" + $id).update({
                Category_Status: category095 + "_Responding",
                Status: "Responding",
                Barangay_Status: barangay + "_Responding"
              });
              
              firebase.database().ref("messages/" + barangay + "/" + $chatname).push({
                date: dateToday,
                time: timeToday,
                name: "Barangay " + brgy + " Admin",
                message: "We have successfully viewed your report, and we are now looking into it. We will update the status of your report once we have resolved it. Thank You!",
                uid: userId
            });
            //}else{}
              alert('Updated Report Status of ID ' + $id);
              console.log('Updated Report Status of ID ' + $id);
            });
          });
        }
      });
    }
  });
});

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}