function viewAnnouncements() {
    var rootRef = firebase.database().ref("newsfeed").orderByChild("Category").equalTo("District");
    rootRef.on("value", snap => {
        if (snap.exists()) {
            $("#pnl-body").html("");
            snap.forEach(snap => {
                var date = snap.child("DatePosted").val();
                var description = snap.child("Description").val();
                var title = snap.child("Title").val();
                var poster = snap.child("PostedBy").val();
                var time = snap.child("TimePosted").val();
                var datetime = date + " " + time;
                $("#pnl-body").prepend("<section class='post-heading'>" +
                    "<div class='row'>" +
                    "<div class='col-md-11'>" +
                    "  <div class='media'>" +
                    "    <div class='media-left'>" +
                    "        <img src='https://ptetutorials.com/images/user-profile.png' width='40' height='40' alt='..'> </div>" +
                    "    <div class='media-body'>" +
                    "      <h4 class='anchor-username'>" + poster + "</h4>" +
                    "      <p class='anchor-time'>" + datetime +  "</h4>" +
                    "    </div>" +
                    "  </div>" +
                    "</div>" +
                    "</div>" +
                    "</section>" +
                    "<section class='post-body'>" +
                    "<h5><b>" + title + "</b></h5>" +
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