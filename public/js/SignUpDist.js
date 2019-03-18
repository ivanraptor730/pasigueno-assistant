var fullname = document.getElementById("fullname");
var barangay = document.getElementById("barangay");
var username = document.getElementById("username");
var address = document.getElementById("address");
var password = document.getElementById("password");

var password1 = document.getElementById("password1");
var userType = document.getElementById("userType");
var submit = document.getElementById("submit");
 
function submitClick() {
    
    if(password.value != password1.value) {
        alert("Passwords Don't Match");
      } else {

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
            FullName: fullnames,
            Barangay: barangays,
            EmailAddress: usernames,
            UserType: userTypes,
            UserID: uid,
            Status: status
        });
        
    
    }, function (error) {
        
    });
    

}
}    