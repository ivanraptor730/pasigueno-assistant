/* Redirect File for determining usertype and barangay */
//ToDo: ADD BARANGAY REDIRECT
function userWindow() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          usertype = (snapshot.val() && snapshot.val().UserType);

          if (usertype == "Admin") {
            window.location.replace('adminbgy/index.html');
            console.log('usertype is admin. redirecting to adminbgy/home');
          } else if (usertype == "District") {
            window.location.replace('admindist/index.html');
            console.log('usertype is district admin. redirecting to admindist/home');
          } else {
            window.location.replace("index.html"); //redirect
            console.log('user redirected, invalid access.');
          }
        });
      });
    } else {
      window.location.replace("index.html"); //redirect
      console.log('user redirected, invalid access.');
    }

  });
}
window.onload = userWindow();