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
    var username = document.getElementById("username").value.trim();
    var address = document.getElementById("address");
    var password = document.getElementById("password").value;
    var userType = document.getElementById("userType");

    if (password.value != password1.value) {
        alert("Passwords Don't Match");
    } else {
        otherApp.auth().createUserWithEmailAndPassword(username, password).then(function (userCreds) {
            var uid = userCreds.user.uid;
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
                Username: username,
                UserType: userTypes,
                UserID: uid,
                Status: status
            });
            otherApp.auth().signOut();
            console.log(userTypes + " account id " + uid + " created.");
        }, function (error) {
            console.log(error);
            otherApp.auth().signOut();
        });
    }
}

$('#userType').change(function () {
    if ($(this).val() != "User") {
        $('#question').prop("disabled", true);


        document.getElementById('question').innerHTML = "Security Question:<select name='question' id='question' required><option value='---'>---</option><option value='Maiden name of mother'>Maiden name of mother</option><option value='Favorite food'>Favorite food</option><option value='Favorite number'>Favorite number</option><option value='Name of dog'>Name of dog</option><option value='Favorite sport'>Favorite sport</option><option value='Name of brother'>Name of brother</option><option value='Name of sister'>Name of sister</option><option value='Name of father'>Name of father</option> </select>";
    } else {

        $('#question').prop("disabled", false);
    }
});