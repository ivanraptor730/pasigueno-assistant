function secQuestion() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          emailaddress = (snapshot.val() && snapshot.val().EmailAddress) || 'Unknown'; //fetch name
          barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown'; //fetch barangay?
          userid = (snapshot.val() && snapshot.val().UserID) || 'Unknown';
          question = (snapshot.val() && snapshot.val().Question) || 'Unknown';
          address = (snapshot.val() && snapshot.val().Address) || 'Unknown';
          fullname = (snapshot.val() && snapshot.val().FullName) || 'Unknown';
          var rootRef = firebase.database().ref('question/' + barangay)
          rootRef.on("value", snaps => {
            if (snaps.exists()) {
              var answer1 = snaps.child("Name of Barangay Chairman").val();
              var answer2 = snaps.child("Name one of Barangay Kagawad").val();

              document.getElementById('answer1').value = answer1;
              document.getElementById('answer2').value = answer2;

            }
          })

        });
      });
    }

  });

}

window.onload = secQuestion();

function securityQuestionUpdate() {

  var answer1 = document.getElementById('answer1').value;
  var answer2 = document.getElementById('answer2').value;


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          emailaddress = (snapshot.val() && snapshot.val().EmailAddress) || 'Unknown'; //fetch name
          barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown'; //fetch barangay?
          userid = (snapshot.val() && snapshot.val().UserID) || 'Unknown';
          question = (snapshot.val() && snapshot.val().Question) || 'Unknown';
          address = (snapshot.val() && snapshot.val().Address) || 'Unknown';
          fullname = (snapshot.val() && snapshot.val().FullName) || 'Unknown';
          var r = confirm("Do you want to update the security question?");
          if (r == true) {
            firebase.database().ref("question/" + barangay).update({
              "Name of Barangay Chairman": answer1,
              "Name one of Barangay Kagawad": answer2

            });
          }

        });
      });
    }

  });

}