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
                    alert(barangay);
                });
            });

        }
    });
}
window.onload = setBarangay();

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
        console.log(error);
    });
}