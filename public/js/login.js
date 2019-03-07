(function(){
  $('#login').on('click', function (e) {
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
          alert('Login Successful! Welcome'); //ToDo Trigger progress bar here
          window.location.replace('redirect.html');
        })
        .catch(function(error) {
          console.log("Login Failed!", error);
          alert("Login Failed");
        });
    }
  });
})()