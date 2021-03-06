function reports() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    myName = (snapshot.val() && snapshot.val().FullName) || 'Unknown';

                    var chatterRef = firebase.database().ref("reports/" + brgy); //fetch chat list from barangay
                    chatterRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#people").html("");
                            snap.forEach(snap => {
                                var key = snap.key; //Usernames (PK)
                                var citizenList = firebase.database().ref("reports/" + brgy + "/" + key); //populates chat list from that barangay (names)
                                citizenList.on("value", snapsh => {
                                    if (snapsh.exists()) { //populate chat entries for users
                                        snapsh.forEach(snapsh => {
                                            username = snapsh.child("uid").val();
                                        });
                                        $("#people").prepend("<div class='chat_list' id='" + key + "'>" + //populate people tab
                                            "<div class='chat_people'>" +
                                            "<div class='chat_img'><img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'></div>" +
                                            "<div class='chat_ib'>" +
                                            "<h4 class='unread_username'>" + key + "</h4>" +
                                            "</div></div></div>");

                                        $('div.chat_list').on('click', function () { //populate chatbox and determine clicked user
                                            var $cl = $(this).closest('div.chat_list');
                                            $chtName = $cl.attr('id');
                                            window.$chtName1 = $cl.attr('id');
                                            $('div.chat_list').removeClass('active_chat');
                                            $($cl).addClass("active_chat");
                                            var thread = firebase.database().ref("reports/" + brgy + "/" + $chtName).orderByChild("Barangay_Status").equalTo(brgy + "_Pending") //populates chat list from that barangay (names)
                                            thread.on("value", snaps => {
                                                if (snaps.exists()) { //populate chat entries for users
                                                    $(".msg_history").empty();
                                                    $("#tbody_pending").empty();
                                                    snaps.forEach(snaps => {
                                                        var ky = snaps.key;
                                                        var category = snaps.child("Category").val();
                                                        var date = snaps.child("Date").val();
                                                        var location = snaps.child("Location").val();
                                                        var report = snaps.child("Report").val();
                                                        var status = snaps.child("Status").val();
                                                        var photoURL = snaps.child("PhotoURL").val();

                                                        $("#tbody_pending").prepend("<tr><td id='ky'>" + ky + "</td><td>" + date + "</td><td>" + category + "</td><td>" + location + "</td><td>" + report + "</td><td>" +
                                                            "<button class='openmodals' onclick='openMap()'>View</button>" +
                                                            "<div class='modals myModal'>" +
                                                            "<div class='modals-content'>" +
                                                            "<div class='modals-header'>" +
                                                            "<h2 id='category095'>" + category + "</h2>" +
                                                            "<span class='closes'>&times;</span>" +
                                                            "</div><br><br><br>" +
                                                            "<p><b>Report ID: </b>" + ky + "</p>" +
                                                            "<p><b>Report Date: </b>" + date + " </p>" +
                                                            "<p><b>Location: </b>" + location + " </p>" +
                                                            "<p><b>Report Details: </b>" + report + " </p>" +
                                                            "<p><b>Report Status: </b>" + status + " </p>" +
                                                            "<b>Actions:</b><br> <button id='respond'><i class='fas fa-check'></i> Respond to this report</button> <button id='markSpam'><i class='fas fa-flag'></i> Mark Spam</button>" +
                                                            "<button id='img' onclick=window.open('" + photoURL + "')><i class='fas fa-camera'></i> View Report Image FullScreen</button>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>" + "</td></tr>");
                                                    });
                                                }
                                            });

                                        })
                                    } else {
                                        $("#tbody_pending").empty();
                                        $("#tbody_pending").append("<td id='nullRecords'colspan=6>No Reports.</td>")
                                    }

                                })

                            });
                        } else {
                            $("#people").empty();
                            $("#people").append("No Citizens... Yet.");
                        }
                    });
                    var thread = firebase.database().ref("reports/" + brgy); //populates chat list from that barangay (names)
                    thread.on('child_changed', function (snapshot) {
                        document.getElementById('rep-counter').innerHTML = "!";
                        console.log(snapshot.val());
                    });
                });
            });
        }
    });


}

function updateScroll() {
    var element = document.getElementById("msg_container");
    element.scrollTop = element.scrollHeight;
}

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
window.onload = reports();