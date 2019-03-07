var fullname = document.getElementById("fullname");
var barangay = document.getElementById("barangay");
var username = document.getElementById("username");
var address = document.getElementById("address");
var password = document.getElementById("password");
var userType = document.getElementById("userType");
var submit = document.getElementById("submit");

function submitClick() {
    var usernames = username.value;
    var passwords = password.value;
    firebase.auth().createUserWithEmailAndPassword(usernames, passwords).then(function (user) {
        var uid = firebase.auth().currentUser.uid;
        var fullnames = fullname.value;
        var barangays = barangay.value;
        var status = "Active";
        var addresss = address.value;
        var userTypes = userType.value;
        var rootRef = firebase.database().ref();
        var storesRef = rootRef.child('users');
        var newStoreRef = storesRef.push();
        newStoreRef.set({
            Address: addresss,
            Name: fullnames,
            Barangay: barangays,
            Username: usernames,
            UserType: userTypes,
            UserID: uid,
            Status: status
        });
    }, function (error) {
        alert(error);
    });
}