$(function () { //Respond to forms
    $("#table_account").delegate("tr #accntApproved", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Are you sure you want to update the status of the user?");
        if (r == true) {
            
            firebase.database().ref("users/" + $id).update({
                Status: "Active"
            });
            alert('Thank you');
     
        } 
    });
    $("#table_account").delegate("tr #accntDeclined", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Are you sure you want to update the status of the user?");
        if (r == true) {
  
            firebase.database().ref("users/" + $id).update({
                Status: "Inactive"
            });
            alert('Thank you');
        } 
    });
});