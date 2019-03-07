(function(){
  $('#login').on('click', function (e) {
    $(".spinner-wrapper").show();
    e.preventDefault();
    if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };

      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          auth = authData;
          document.getElementById("error-desc").innerHTML = "";
          $(".spinner-wrapper").hide();
          window.location.replace('redirect.html');
        })
        .catch(function(error) {
          var errorCode = error.code;
          if(errorCode == 'auth/invalid-email'){
            document.getElementById("error-desc").innerHTML = "Invalid Email Format! Try Again.";
            $(".spinner-wrapper").hide();
          }
          else if(errorCode == 'auth/user-not-found'){
            document.getElementById("error-desc").innerHTML = "That email is not associated with any admin account. Try Again.";
            $(".spinner-wrapper").hide();
          }
          else if(errorCode == 'auth/wrong-password'){
            document.getElementById("error-desc").innerHTML = "Wrong Password! Try Again.";
            $(".spinner-wrapper").hide();
          }
          console.log("Login Failed!" + errorCode);
        });
    }
  });
})()