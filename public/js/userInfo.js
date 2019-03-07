/* Redirect File for determining userinfo */
function userInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var users = firebase.database().ref('users');
      var ref = users.orderByChild('UserID').equalTo(userId);

      ref.once('value', function (snapshot) {
        var parentKey = Object.keys(snapshot.val())[0];

        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
          username = (snapshot.val() && snapshot.val().FullName) || 'Unknown'; //fetch name
          barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown'; //fetch barangay?
  
        document.getElementById('userName').innerHTML = username; //Sets the username in the Webpage. 
        });
      });
    } else {
      window.location.replace("../login.html"); //redirect
      console.log('user redirected, invalid access.');
    }

  });
}
window.onload = userInfo();