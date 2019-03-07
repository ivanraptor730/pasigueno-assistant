function onChange() {
    var x = document.getElementById("leave").value;
    var rootRef = firebase.database().ref();
    if (x == "--") {
      var rootRef = firebase.database().ref().child("reports");
      rootRef.on("value", snap => {
        $("#table_body").html("");
        snap.forEach(snap => {
          var key = snap.key;
          var category = snap.child("Category").val();
          var date = snap.child("Date").val();
          var location = snap.child("Location").val();
          var report = snap.child("Report").val();
          var status = snap.child("Status").val();
          $("#table_body").append("<tr><td>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
            "<button class='openmodal myBtn'>View</button>" +
            "<div class='modal myModal'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<h2>" + category + "</h2>" +
            "<span class='close'>&times;</span>" +
            "</div>" +
            "<p><b>Report ID: </b>" + key + "</p>" +
            "<p><b>Report Date: </b>" + date + " </p>" +
            "<p><b>Location: </b>" + location + " </p>" +
            "<p><b>Report Details: </b>" + report + " </p>" +
            "<p><b>Report Status: </b>" + status + " </p>" +
            "<b>Actions:</b> <button id='takeAction' onclick='takeAction()'>Take Action</button> <button id='markSpam'>Mark Spam</button>" +
            "</div>" +
            "</div></td></tr>")
        })
      });
    } else {
      rootRef.child('reports').orderByChild('Category').equalTo(x).on("value", function (snap) {
        $("#table_body").html("");
        snap.forEach(snap => {
          for (i = 1; i < snap.length; i++) {
            var category = snap.child("Category").val();
            var date = snap.child("Date").val();
            var location = snap.child("Location").val();
            var report = snap.child("Report").val();
            var status = snap.child("Status").val();
            $("#table_body").append("<tr><td>" + key + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
              "<button class='openmodal myBtn'>View</button>" +
              "<div class='modal myModal'>" +
              "<div class='modal-content'>" +
              "<div class='modal-header'>" +
              "<h2>" + category + "</h2>" +
              "<span class='close'>&times;</span>" +
              "</div>" +
              "<p><b>Report ID: </b>" + key + "</p>" +
              "<p><b>Report Date: </b>" + date + " </p>" +
              "<p><b>Location: </b>" + location + " </p>" +
              "<p><b>Report Details: </b>" + report + " </p>" +
              "<p><b>Report Status: </b>" + status + " </p>" +
              "<b>Actions:</b> <button id='takeAction' onclick='takeAction()'>Take Action</button> <button id='markSpam'>Mark Spam</button>" +
              "</div>" +
              "</div></td></tr>")
          }
        })
      });
    }
  }