$(function () { //Respond to Reports
  $("#tbody_pending").delegate("tr #respond", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

    var r = confirm("Do you want to respond on Report ID " + $id + "?");
    if (r == true) {
      firebase.database().ref("reports/" + $id).update({
        Status: "Responding"
      });
      alert('Updated Report Status of ID ' + $id);
      console.log('Updated Report Status of ID ' + $id);
    }
  });
});

$(function () { //Respond to Reports
  $("#tbody_responding").delegate("tr #responded", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();
    var r = confirm("Do you want to respond on Report ID " + $id + "?");
    if (r == true) {
      firebase.database().ref("reports/" + $id).update({
        Status: "Responded"
      });
      alert('Updated Report Status of ID ' + $id);
      console.log('Updated Report Status of ID ' + $id);
    }
  });
});

$(function () { //Mark Reports as Spam
  $("#dataTable").delegate("tr #markSpam", "click", function (e) {
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();

    var r = confirm("Do you want to dismiss Report ID " + $id + " as SPAM?");
    if (r == true) {
      firebase.database().ref("reports/" + $id).update({
        Status: "Spam"
      });
      alert('Report ' + $id + ' marked as Spam.');
      console.log('Updated Report Status of ID ' + $id);
    }
  });
});