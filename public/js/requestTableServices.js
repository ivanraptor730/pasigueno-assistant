function requestServicesPending() {
    var rootRef = firebase.database().ref("request/services").orderByChild("Status").equalTo("Pending");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#table_body").html("");
            snap.forEach(snap => {
                var Category = snap.child("Category").val();
                var Dates = snap.child("Date").val();
                var Location = snap.child("Location").val();
                var startTime = snap.child("StartTime").val();
                var startDate = snap.child("StartDate").val();
                var returnDate = snap.child("ReturnDate").val();
                var returnTime = snap.child("ReturnTime").val();
                $("#table_body").prepend("<tr><td>" + Category + "</td><td>" + Dates +
                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                    returnDate + " " + returnTime + "</td><td>" + "<button>View</button>" + "</td></tr>")
            })
        } else {
            $("#table_body").prepend("<td id='nullRecords'colspan=7>No Pending Services.</td>")
        }
    });

}

function requestServicesApproved() {
    var rootRef = firebase.database().ref("request/services").orderByChild("Status").equalTo("Approved");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#table_body1").html("");
            snap.forEach(snap => {
                var Category = snap.child("Category").val();
                var Dates = snap.child("Date").val();
                var Location = snap.child("Location").val();
                var startTime = snap.child("StartTime").val();
                var startDate = snap.child("StartDate").val();
                var returnDate = snap.child("ReturnDate").val();
                var returnTime = snap.child("ReturnTime").val();
                $("#table_body1").prepend("<tr><td>" + Category + "</td><td>" + Dates +
                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                    returnDate + " " + returnTime + "</td></tr>") //Add Action kung naibalik na yung item or hindi
            })
        } else {
            $("#table_body1").prepend("<td id='nullRecords'colspan=7>No Approved Services.</td>")
        }
    });
}

function requestServicesDenied() {
    var rootRef = firebase.database().ref("request/services").orderByChild("Status").equalTo("Declined");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#table_body2").html("");
            snap.forEach(snap => {
                var Category = snap.child("Category").val();
                var Dates = snap.child("Date").val();
                var Location = snap.child("Location").val();
                var startTime = snap.child("StartTime").val();
                var startDate = snap.child("StartDate").val();
                var returnDate = snap.child("ReturnDate").val();
                var returnTime = snap.child("ReturnTime").val();
                $("#table_body2").prepend("<tr><td>" + Category + "</td><td>" + Dates +
                    "</td><td>" + Location + "</td><td>" + startDate + " " + startTime + "</td><td>" +
                    returnDate + " " + returnTime + "</td></tr>")
            })
        } else {
            $("#table_body2").prepend("<td id='nullRecords'colspan=7>No Denied Services.</td>")
        }
    });

}

window.onload = requestServicesPending();
requestServicesApproved();
requestServicesDenied();