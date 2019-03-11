$(function () { //Respond to services
    $("#table_body").delegate("tr #takeActionApproved", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Do you want to approved on Report ID " + $id + "?");
        if (r == true) {
            firebase.database().ref("request/services/" + $id).update({
                Status: "Approved",
                Barangay_Status: "Approved"
            });
            alert('Updated Report Status of ID ' + $id);
        }
    });
    $("#table_body").delegate("tr #Declined", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Do you want to Declined on Report ID " + $id + "?");
        if (r == true) {
            firebase.database().ref("request/services/" + $id).update({
                Status: "Declined"
            });
            alert('Updated Report Status of ID ' + $id);
        }
    });

    $("#table_body1").delegate("tr #Approved", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Do you want to approved on Report ID " + $id + "?");
        if (r == true) {
            firebase.database().ref("request/forms/" + $id).update({
                Status: "Approved"
            });
            alert('Updated Report Status of ID ' + $id);
        }
    });
    $("#table_body1").delegate("tr #Declined1", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Do you want to Declined on Report ID " + $id + "?");
        if (r == true) {
            firebase.database().ref("request/forms/" + $id).update({
                Status: "Declined"
            });
            alert('Updated Report Status of ID ' + $id);
        }
    });
});