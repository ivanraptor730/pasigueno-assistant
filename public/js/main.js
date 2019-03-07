var mainApp = {};
(function(){
    var logtout = function(){
        firebase.auth().signOut().then(function(){
            console.log('Redirecting');
            window.location.replace("../login.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("User logged in");
        } else {
          console.log("No user is signed in, redirecting");
          window.location.replace("../login.html");
        }
      });
}
    
init();

mainApp.logout = logtout;
})();