function submitClick() {
    var fullname = document.getElementById("fullname");
    var barangay = document.getElementById("barangay");
    var username = document.getElementById("usernames");
    var address = document.getElementById("address");
    var password = document.getElementById("password");

    var password1 = document.getElementById("password1");
    var userType = document.getElementById("userType");
    var submit = document.getElementById("submit");

    if (password.value != password1.value) {
        alert("Passwords Don't Match");
    } else {

        var usernames = username.value;
        var passwords = password.value;
        otherApp.auth().createUserWithEmailAndPassword(usernames, passwords).then(function (userCreds) {
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
                FullName: fullnames,
                Barangay: barangays,
                EmailAddress: usernames,
                UserType: userTypes,
                UserID: uid,
                Status: status
            });


        }, function (error) {
            console.log(error);
        });


    }

    $('#userType').change(function () {
        if ($(this).val() != "Barangay Administrator") {
            $('#barangay').prop("disabled", true);


            document.getElementById('barangay').innerHTML = "Barangay:<select id='barangay'><option>---</option><option>Santolan</option><option>Pinagbuhatan</option><option>Manggahan</option><option>Maybunga</option><option>Sta. Lucia</option><option>Rosario</option><option>Dela Paz</option><option>San Miguel</option></select>";
        }
        if ($(this).val() != "District Admin") {

            $('#barangay').prop("disabled", false);
            document.getElementById('barangay').innerHTML = "Barangay:<select id='barangay'><option>---</option><option>Santolan</option><option>Pinagbuhatan</option><option>Manggahan</option><option>Maybunga</option><option>Sta. Lucia</option><option>Rosario</option><option>Dela Paz</option><option>San Miguel</option></select>";

        }
    });

}