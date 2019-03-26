function submitClick() {
    var fullname = document.getElementById("fullname");
    var barangay = document.getElementById("barangay");
    var username = document.getElementById("userName");
    var address = document.getElementById("address");
    var password = document.getElementById("password");

    var question = document.getElementById("question");
    var answer = document.getElementById("answer");
    var userType = document.getElementById("userType");
    var submit = document.getElementById("submit");
    var usernames = username.value;
    var passwords = password.value;
    otherApp.auth().createUserWithEmailAndPassword(usernames, passwords).then(function (userCreds) {
        var uid = userCreds.user.uid;
        var fullnames = fullname.value;
        var barangays = barangay.value;
        var questions = question.value;
        var answers = answer.value;
        var status = "Active";
        var addresss = address.value;
        var userTypes = userType.value;
        var rootRef = firebase.database().ref();
        var storesRef = rootRef.child('users');
        var newStoreRef = storesRef.push();

        newStoreRef.set({
            Address: addresss,
            FullName: fullnames,
            Barangay: barangays,
            EmailAddress: usernames,
            UserType: userTypes,
            UserID: uid,
            Status: status,
            Question: questions,
            Answer: answers
        });
        otherApp.auth().signOut();
        $('#fullname').val("");
        $('#userName').val("");
        $('#address').val("");
        $('#password').val("");
        $('#answer').val("");
        alert(userTypes + " account id " + uid + " created.");
        console.log(userTypes + " account id " + uid + " created.");

    }, function (error) {
        console.log(error);
        otherApp.auth().signOut();
    });


}