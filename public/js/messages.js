function messages() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    username = (snapshot.val() && snapshot.val().FullName) || 'Unknown';
                    brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var chatterRef = firebase.database().ref("messages/" + brgy);
                    chatterRef.on("value", snap => {
                        if (snap.exists()) {
                            $("#tbody_messages").html("");
                            snap.forEach(snap => {
                                var key = snap.key; //Username
                                var messages = firebase.database().ref("messages/" + brgy).child(key); //populates chat list
                                messages.on("value", snapsh => {
                                    $("#tbody_messages").append("<tr><td class='ky'>" + key + "<td>" +
                                        "<button class='openmodal myBtn'>Chat</button>" +
                                        "<div class='modal myModal'>" +
                                        "<div class='modal-content'>" +
                                        "<div class='modal-header'>" +
                                        "<h2>" + key + "</h2>" +
                                        "<span class='close'>&times;</span>" +
                                        "</div>");
                                    if (snapsh.exists()) {
                                        snapsh.forEach(snapsh => {
                                            var div;
                                            var placeholderName;
                                            var message = snapsh.child("message").val();
                                            if (username != key) {
                                                placeholderName = username;
                                                div = "speech-bubble-reciever";
                                            }
                                            else if (username == key) {
                                                placeholderName = key;
                                                div = "speech-bubble-sender";
                                            }

                                            $(".modal-content").append("<div class='" + div + "'>" +
                                                "<b>" + placeholderName + ":</b> " + message + "</div><br>" +
                                                "</div>" +
                                                "</div></td></tr>");
                                        });
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