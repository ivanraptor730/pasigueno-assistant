function requestFormsTableApproved() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/forms").orderByChild("Barangay_Status").equalTo(barangay + "_Approved");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_body").html("");
                            snap.forEach(snap => {
                                var key = snap.key;
                                var Forms = snap.child("Form").val();
                                var Dates = snap.child("Date").val();
                                var dateOfBirth = snap.child("Birthdate").val();
                                var FullName = snap.child("Fullname").val();
                                var Purpose = snap.child("Purpose").val();
                                var UserID = snap.child("UserID").val();
                                var Barangay = snap.child("Barangay").val();
                                var BirthDate = snap.child("Birthplace").val();
                                $("#table_body").append("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td>" + FullName + "</td><td>" + Purpose + "</td>")
                            })
                        } else {
                            $("#table_body").empty();
                            $("#table_body").append("<td id='nullRecords'colspan=7>No Approved Forms Requests.</td>")
                        }
                    });
                });
            });
        }
    });
}

function requestUtilsTableApproved() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var rootRef = firebase.database().ref("request/services").orderByChild("Barangay_Status").equalTo(barangay + "_Approved");
                    rootRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#table_body1").html("");
                            snap.forEach(snap => {
                                var key = snap.key;
                                var Category = snap.child("Category").val();
                                var Dates = snap.child("Date").val();
                                var Location = snap.child("Location").val();
                                var startTime = snap.child("StartTime").val();
                                var startDate = snap.child("StartDate").val();
                                var returnDate = snap.child("ReturnDate").val();
                                var returnTime = snap.child("ReturnTime").val();
                                $("#table_body1").append("<tr><td class='ky'>" + key + "</td><td>" + Category + "</td><td>" + Dates +
                                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                                    returnDate + " " + returnTime + "</td><td>" + "<button>View</button>" + "</td></tr>")
                            })
                        } else {
                            $("#table_body1").empty();
                            $("#table_body1").append("<td id='nullRecords'colspan=7>No Approved Services Requests.</td>")
                        }
                    });
                });
            });
        }
    });
}

window.onload = requestFormsTableApproved(); 
requestUtilsTableApproved();
