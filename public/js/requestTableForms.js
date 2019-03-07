function requestFormsTablePending() {
    var rootRef = firebase.database().ref("request/forms").orderByChild("Status").equalTo("Pending");
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
                $("#table_body").append("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td>" + FullName + "</td><td>" + Purpose + "</td><td>" +
                    "<button class='openmodal myBtn'>View</button>" +
                    "<div class='modal myModal'>" +
                    "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                    "<h2>" + Forms + "</h2>" +
                    "<span class='close'>&times;</span>" +
                    "</div>" +
                    "<p><b>Request ID: </b>" + key + "</p>" +
                    "<p><b>Barangay: </b>" + Barangay + " </p>" +
                    "<p><b>Full name: </b>" + FullName + " </p>" +
                    "<p><b>Date Of Birth: </b>" + dateOfBirth + " </p>" +
                    "<p><b>Place Of Birth: </b>" + BirthDate + " </p>" +
                    "<p><b>Purpose: </b>" + Purpose + " </p>" +
                    "<b>Actions:</b> <button id='Approved'>Approve</button> <button id='Declined1'>Decline</button>" +
                    "</div>" +
                    "</div></td></tr>")
            })
        } else {
            $("#table_body").append("<td id='nullRecords'colspan=7>No Pending Forms.</td>")
        }
    });
}

function requestFormsTableApproved() {
    var rootRef = firebase.database().ref("request/forms").orderByChild("Status").equalTo("Approved");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#table_body1").html("");
            snap.forEach(snap => {
                var key = snap.key;
                var Forms = snap.child("Form").val();
                var FullName = snap.child("Fullname").val();
                var Purpose = snap.child("Purpose").val();
                var Barangay = snap.child("Barangay").val();
                $("#table_body1").append("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td>" + FullName + "</td><td>" + Purpose + "</td>");
            })
        } else {
            $("#table_body1").append("<td id='nullRecords'colspan=7>No Pending Forms.</td>")
        }
    });
}

function requestFormsTableDeclined() {
    var rootRef = firebase.database().ref("request/forms").orderByChild("Status").equalTo("Declined");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#table_body2").html("");
            snap.forEach(snap => {
                var key = snap.key;
                var Forms = snap.child("Form").val();
                var FullName = snap.child("Fullname").val();
                var Purpose = snap.child("Purpose").val();
                var Barangay = snap.child("Barangay").val();
                $("#table_body2").append("<tr><td class='ky'>" + key + "</td><td>" + Forms + "</td><td>" + Barangay + "</td><td>" + FullName + "</td><td>" + Purpose + "</td>")
            })
        } else {
                $("#table_body2").append("<td id='nullRecords'colspan=7>No Declined Forms.</td>")
        }
    });
}

window.onload = requestFormsTableApproved();
requestFormsTableDeclined();
requestFormsTablePending();