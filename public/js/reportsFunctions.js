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
                    
      firebase.database().ref("reports/" + $id).update({
        Status: "Responding",
        Barangay_Status: barangay+"_Responding" //!!!! TODO: FETCH BARANGAY HERE (SA LAHAT NG FUNCTIONS)
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
                    
                    firebase.database().ref("reports/" + $id).update({
                      Status: "Resolved",
                      Barangay_Status: barangay+"_Responded"
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
    if (r == true) {///
      firebase.auth().onAuthStateChanged(function (user) {
            
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);
        
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    
      firebase.database().ref("reports/" + $id).update({
        Status: "Spam",
        Barangay_Status: barangay+"_Spam"
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

    var r = confirm("Do you want to dismiss Report ID " + $id + " as SPAM?");
    if (r == true) {///
      firebase.auth().onAuthStateChanged(function (user) {
            
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);
        
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    
      firebase.database().ref("reports/" + $id).update({
        Status: "Resolved",
        Barangay_Status: barangay+"_Responded"
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