        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var checkbox = document.getElementById("slider");
                var checkbox2 = document.getElementById("slider2");
                var key = "2";
                var userId = firebase.auth().currentUser.uid;
                var users = firebase.database().ref('users');
                var ref = users.orderByChild('UserID').equalTo(userId);

                ref.once('value', function (snapshot) {
                    var parentKey = Object.keys(snapshot.val())[0];

                    return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                        barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';


                        checkbox.addEventListener('change', function () {
                            if (checkbox.checked) {

                                firebase.database().ref("requestStatus/" + barangay + "/" + key).update({
                                    StatusHall: "Enabled"

                                });
                            } else {
                                firebase.database().ref("requestStatus/" + barangay + "/" + key).update({
                                    StatusHall: "Disabled"
                                });
                            }
                        });
                        checkbox2.addEventListener('change', function () {
                            if (checkbox2.checked) {

                                firebase.database().ref("requestStatus/" + barangay + "/" + key).update({
                                    StatusTent: "Enabled"

                                });
                            } else {
                                firebase.database().ref("requestStatus/" + barangay + "/" + key).update({
                                    StatusTent: "Disabled"
                                });
                            }
                        });
                    })
                })
            }
        });