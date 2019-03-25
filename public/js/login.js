(function(){
  $('#login').on('click', function (e) {
    $("#loginEmail").attr('readonly');
    $("#loginPassword").attr('readonly');
    document.getElementById("login").innerHTML="<i class='fa fa-spinner fa-spin'></i> Logging In...";
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
            $("#loginEmail").removeAttr('readonly');
            $("#loginPassword").removeAttr('readonly');
            document.getElementById("login").innerHTML="Log-in";
          }
          else if(errorCode == 'auth/user-not-found'){
            document.getElementById("error-desc").innerHTML = "That email is not associated with any administrator account. Try Again.";
            $("#loginEmail").removeAttr('readonly');
            $("#loginPassword").removeAttr('readonly');
            document.getElementById("login").innerHTML="Log-in";
          }
          else if(errorCode == 'auth/wrong-password'){
            document.getElementById("error-desc").innerHTML = "Wrong Password! Try Again.";
            $("#loginEmail").removeAttr('readonly');
            $("#loginPassword").removeAttr('readonly');
            document.getElementById("login").innerHTML="Log-in";
          }
          else if(errorCode == 'auth/too-many-requests'){
            document.getElementById("error-desc").innerHTML = "Too Many Failed Attempts. Try Again Later.";
            $("#loginEmail").removeAttr('readonly');
            $("#loginPassword").removeAttr('readonly');
            document.getElementById("login").innerHTML="Log-in";
          }
          console.log("Login Failed!" + errorCode);
        });
    }
  });
})()