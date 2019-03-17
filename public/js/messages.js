var username;
var message;
var date;
var div1;
var div2;
var $chtName;
var dateToday = formatDate(new Date());
var timeToday = formatAMPM(new Date());
var userId;
var myName;
var msg;

function messages() {
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
                    var chatterRef = firebase.database().ref("messages/" + brgy); //fetch chat list from barangay
                    chatterRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#people").html("");
                            snap.forEach(snap => {
                                var key = snap.key; //Usernames (PK)
                                var citizenList = firebase.database().ref("messages/" + brgy + "/" + key); //populates chat list from that barangay (names)
                                citizenList.on("value", snapsh => {
                                    if (snapsh.exists()) { //populate chat entries for users
                                        snapsh.forEach(snapsh => {
                                            username = snapsh.child("uid").val();
                                            message = snapsh.child("message").val();
                                            date = snapsh.child("date").val();
                                        });
                                        $("#people").append("<div class='chat_list' id='" + key + "'>" + //populate people tab
                                            "<div class='chat_people'>" +
                                            "<div class='chat_img'><img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'></div>" +
                                            "<div class='chat_ib'>" +
                                            "<h5><p id id='username'>" + key + "</p><span class='chat_date'>" + date + "</span></h5>" +
                                            "<p>" + message + "</p>" +
                                            "</div></div></div>");

                                        $('div.chat_list').on('click', function () { //populate chatbox and determine clicked user
                                            document.getElementById("message").readOnly = false;
                                            var $cl = $(this).closest('div.chat_list');
                                            $chtName = $cl.attr('id');
                                            $('div.chat_list').removeClass("active_chat");
                                            $($cl).addClass("active_chat");
                                            var thread = firebase.database().ref("messages/" + brgy + "/" + key); //populates chat list from that barangay (names)
                                            thread.on("value", snaps => {
                                                if (snaps.exists()) { //populate chat entries for users
                                                    $(".msg_history").empty();
                                                    snaps.forEach(snaps => {
                                                        username = snaps.child("name").val();
                                                        message = snaps.child("message").val();
                                                        date = snaps.child("date").val();
                                                        time = snaps.child("time").val();

                                                        if (username != key) { //sets the chat bubble type
                                                            div1 = "outgoing_msg";
                                                            div2 = "sent_msg";
                                                        } else {
                                                            div1 = "incoming_msg";
                                                            div2 = "recieved_msg";
                                                        }
                                                        $(".msg_history").append("<div class='" + div1 + "'>" +
                                                            "<div class='" + div2 + "'>" +
                                                            "<div class='received_withd_msg'>" +
                                                            "<p>" + message + "</p>" +
                                                            "<span class='time_date'> " + time + " | " + date + " </span>" +
                                                            "</div></div></div>");
                                                        updateScroll();
                                                    });
                                                }

                                            });

                                        })
                                    }

                                })
                            });
                        } else {
                            $("#tbody_messages").empty();
                            $("#tbody_messages").append("<td id='nullRecords'colspan=6>No Messages.</td>");
                        }
                    });
                });
            });
        }
    });
}
window.onload = messages();

function formatDate(date) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function updateScroll() {
    var element = document.getElementById("msg_container");
    element.scrollTop = element.scrollHeight;
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

$("#message").keyup(function(event) {
    msg = document.getElementById("message").value;
    if (event.keyCode === 13) {
        sendMessage();
        document.getElementById('message').value = '';
    }
});

function sendMessage() {
    msg = document.getElementById("message").value;
    firebase.database().ref("messages/" + brgy + "/" + $chtName).push({
        date: dateToday,
        time: timeToday,
        name: "Barangay " + brgy + " Admin",
        message: msg,
        uid: userId
    });
    document.getElementById('message').value = '';
    updateScroll();
}