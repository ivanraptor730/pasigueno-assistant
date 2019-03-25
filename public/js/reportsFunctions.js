var dateToday = formatDate(new Date());
var timeToday = formatAMPM(new Date());

$(function () { //Respond to Reports
  $("#tbody_pending").delegate("tr #respond", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

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

              var message = prompt("Enter your response to the user: ");
              var category095 = document.getElementsByTagName('h2')[0].innerHTML;

              firebase.database().ref("reports/" + $id).update({
                Category_Status: category095 + "_Responding",
                message: message,
                Status: "Responding",
                Barangay_Status: barangay + "_Responding" //!!!! TODO: FETCH BARANGAY HERE (SA LAHAT NG FUNCTIONS)
              });
              alert('Updated Report Status of ID ' + $id);
              console.log('Updated Report Status of ID ' + $id);
            });
          });
        }
      });
    }
  });
});

$(function () { //Respond to Reports
  $("#tbody_responding").delegate("tr #responded", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();
    var r = confirm("Do you want to respond on Report ID " + $id + "?");
    if (r == true) {
      /////
      firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          var userId = firebase.auth().currentUser.uid;
          var users = firebase.database().ref('users');
          var ref = users.orderByChild('UserID').equalTo(userId);

          ref.once('value', function (snapshot) {
            var parentKey = Object.keys(snapshot.val())[0];

            return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {

              barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
              var message = prompt("Enter your response to the user: ");
              var category095 = document.getElementsByTagName('h2')[0].innerHTML;

              firebase.database().ref("reports/" + $id).update({
                Category_Status: category095 + "_Responded", ///binago ni jm responded na ngayon hindi resolved
                message: message,
                Status: "Responded", ///binago ni jm
                Barangay_Status: barangay + "_Responded"
              });
              alert('Updated Report Status of ID ' + $id);
            });
          });
        }
      });
    }
  });
});

$(function () { //Mark Reports as Spam
  $("#dataTable").delegate("tr #markSpam", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

    var r = confirm("Do you want to dismiss Report ID " + $id + " as SPAM?");
    if (r == true) { ///
      firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          var userId = firebase.auth().currentUser.uid;
          var users = firebase.database().ref('users');
          var ref = users.orderByChild('UserID').equalTo(userId);

          ref.once('value', function (snapshot) {
            var parentKey = Object.keys(snapshot.val())[0];

            return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {

              barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';

              var message = prompt("Enter your response to the user: ");
              var category095 = document.getElementsByTagName('h2')[0].innerHTML;
              firebase.database().ref("reports/" + $id).update({
                Category_Status: category095 + "_Spam", ///binago ni jm responded na ngayon hindi resolved
                message: message,
                Status: "Spam",
                Barangay_Status: barangay + "_Spam"
              });
              alert('Report ' + $id + ' marked as Spam.');
            });
          });
        }
      });

      ////
    }
  });
});


$(function () {
  $("#dataTable").delegate("tr #responded2", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

    var r = confirm("Do you want to mark Report ID " + $id + " as Resolved?");
    if (r == true) { ///
      firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
          var userId = firebase.auth().currentUser.uid;
          var users = firebase.database().ref('users');
          var ref = users.orderByChild('UserID').equalTo(userId);

          ref.once('value', function (snapshot) {
            var parentKey = Object.keys(snapshot.val())[0];
            var message = prompt("Enter your response to the user: ");
            return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {

              barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';

              firebase.database().ref("reports/" + $id).update({
                Status: "Resolved",
                message: message,
                Barangay_Status: barangay + "_Responded"
              });
              alert('Report ' + $id + ' marked as Resolved.');
            });
          });
        }
      });

      ////
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