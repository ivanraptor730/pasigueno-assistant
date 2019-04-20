function viewAnnouncements() {
    var rootRef = firebase.database().ref("newsfeed").orderByChild("Category").equalTo("District");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#pnl-body").html("");
            snap.forEach(snap => {
                var date = snap.child("DatePosted").val();
                var description = snap.child("Description").val();
                var title = snap.child("Title").val().replace(/\n/g," ");;
                $("#pnl-body").append("<section class='post-heading'>" +
                    "<div class='row'>" +
                    "<div class='col-md-11'>" +
                    "  <div class='media'>" +
                    "    <div class='media-left'>" +
                    "        <img class='media-object photo-profile'" +
                    "          src='https://ptetutorials.com/images/user-profile.png' width='40' height='40' alt='..'</div>" +
                    "    <div class='media-body'>" +
                    "      <h4 class='anchor-username'>" + title + "</h4>" +
                    "      <p class='anchor-time'>" + date + "</h4>" +
                    "    </div>" +
                    "  </div>" +
                    "</div>" +
                    "</div>" +
                    "</section>" +
                    "<section class='post-body'>" +
                    "<p>" + description + "</p></section>" +
                    "<hr>");

            })
        } else {
            $("#pnl-body").empty();
            $("#pnl-body").prepend("<p>No District Announcements.</p>");
        }
    });
}

window.onload = viewAnnouncements();