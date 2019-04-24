function setBarangay() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    document.getElementById('barangay').value = barangay; //Sets the username in the Webpage.
                });
            });
        }
    });
}
window.onload = setBarangay();


function submitClick() {
    var fullname = document.getElementById("fullname");
    var barangay = document.getElementById("barangay");
    var usernames = document.getElementById("username").value.trim();
    var username = usernames + "@gmail.com";
    var address = document.getElementById("address");
    var password = document.getElementById("password").value;
    var userType = document.getElementById("userType");
    var question = document.getElementById("question");
    var answer = document.getElementById("answer");

    otherApp.auth().createUserWithEmailAndPassword(username, password).then(function (userCreds) {
        var uid = userCreds.user.uid;
        var fullnames = fullname.value;
        var barangays = barangay.value;
        var status = "Approved";
        var questions = question.value;
        var answers = answer.value;
        var addresss = address.value;
        var userTypes = userType.value;
        var rootRef = firebase.database().ref();
        var storesRef = rootRef.child('users');
        var newStoreRef = storesRef.push();
        newStoreRef.set({
            Address: addresss,
            FullName: fullnames,
            Barangay: barangays,
            EmailAddress: username,
            UserType: userTypes,
            UserID: uid,
            Status: status,
            Question: questions,
            Answer: answers
        });
        otherApp.auth().signOut();
        $('#fullname').val("");
        $('#username').val("");
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
