function initMap() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);

            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];

                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var lat, lang;
                    if (brgy == "Santolan") {
                        lat = 14.613532482443457;
                        lang = 121.08753972969293;
                    } else if (brgy == "Pinagbuhatan") {
                        lat = 14.5497;
                        lang = 121.0977;
                    } else if (brgy == "Maybunga") {
                        lat = 14.5763;
                        lang = 121.0850;
                    } else if (brgy == "Manggahan") {

                        lat = 14.6019;
                        lang = 121.0937;
                    } else if (brgy == "Dela Paz") {
                        lat = 14.6154;
                        lang = 121.0994;
                    } else if (brgy == "Rosario") {
                        lat = 14.5885;
                        lang = 121.0891;
                    } else if (brgy == "San Miguel") {
                        lat = 14.5672;
                        lang = 121.0923;
                    } else if (brgy == "Sta. Lucia" || brgy == "Sta.Lucia") {
                        lat = 14.5840;
                        lang = 121.1012;
                    }
                    var map = new google.maps.Map(document.getElementById("map"), {
                        zoom: 15,
                        center: new google.maps.LatLng(lat, lang),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                    var startDate = document.getElementById("startDate").value;
                    var endDate = document.getElementById("endDate").value;

                    var a = document.getElementById("category").value;
                    var reportIDs = document.getElementById("reportID").value;

                    var dbRef = firebase.database().ref('reports');

                    if (startDate != "" && endDate != "" && a == "--" || startDate != null && endDate != null && a == "--") {

                        dbRef.orderByChild("Date").startAt(startDate).endAt(endDate).on('value', function (snapshot) {
                            snapshot.forEach(snap => {
                                var barangayss = snap.child("Barangay").val();
                                var barangey = a.value;
                                var childs = snap.val();

                                var Category = snap.child("Category").val();
                                var date = snap.child("Date").val();
                                var locationName = snap.child("Location").val();
                                var status = snap.child("Status").val();
                                var markerColor;
                                if (status == "Pending") {
                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                                }
                                if (status == "Responded") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                                }
                                if (status == "Responding") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                                }
                                if (status != "Spam" && barangayss == brgy) {
                                    var infowindow = new google.maps.InfoWindow();
                                    var marker = new google.maps.Marker({
                                        position: {
                                            lat: parseFloat(childs.Latitude),
                                            lng: parseFloat(childs.Longitude)
                                        },
                                        icon: markerColor,
                                        map: map
                                    });
                                    google.maps.event.addListener(marker, 'click', function () {
                                        infowindow.setContent('<div><strong>Category:' + Category + '</strong><br>' +
                                            'Date: ' + date + '<br>' +
                                            'Location: ' + locationName + '<br>' +
                                            'Status: ' + status + '<br>' + '</div>');
                                        infowindow.open(map, this);
                                    });
                                }
                            });

                        });
                    }

                    if (startDate != "" && endDate != "" && a != "--" || startDate != null && endDate != null && a != "--") {

                        dbRef.orderByChild("Date").startAt(startDate).endAt(endDate).on('value', function (snapshot) {
                            snapshot.forEach(snap => {
                                var barangayss = snap.child("Barangay").val();
                                var barangey = a.value;
                                var childs = snap.val();

                                var Category = snap.child("Category").val();
                                var date = snap.child("Date").val();
                                var locationName = snap.child("Location").val();
                                var status = snap.child("Status").val();
                                var markerColor;
                                if (status == "Pending") {
                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                                }
                                if (status == "Responded") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                                }
                                if (status == "Responding") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                                }
                                if (status != "Spam" && barangayss == brgy && a == Category) {
                                    var infowindow = new google.maps.InfoWindow();
                                    var marker = new google.maps.Marker({
                                        position: {
                                            lat: parseFloat(childs.Latitude),
                                            lng: parseFloat(childs.Longitude)
                                        },
                                        icon: markerColor,
                                        map: map
                                    });
                                    google.maps.event.addListener(marker, 'click', function () {
                                        infowindow.setContent('<div><strong>Category:' + Category + '</strong><br>' +
                                            'Date: ' + date + '<br>' +
                                            'Location: ' + locationName + '<br>' +
                                            'Status: ' + status + '<br>' + '</div>');
                                        infowindow.open(map, this);
                                    });
                                }
                            });

                        });
                    }
                    if (a != "--") {

                        dbRef.orderByChild('Category').equalTo(a).on('value', function (snapshot) {
                            snapshot.forEach(snap => {

                                var childs = snap.val();

                                var Barangay2 = snap.child("Barangay").val();
                                var Category = snap.child("Category").val();
                                var date = snap.child("Date").val();
                                var locationName = snap.child("Location").val();
                                var status = snap.child("Status").val();
                                var markerColor;
                                if (status == "Pending") {
                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                                }
                                if (status == "Responded") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                                }
                                if (status == "Responding") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                                }
                                if (brgy == Barangay2 && status != "Spam") {
                                    var infowindow = new google.maps.InfoWindow();
                                    var marker = new google.maps.Marker({
                                        position: {
                                            lat: parseFloat(childs.Latitude),
                                            lng: parseFloat(childs.Longitude)
                                        },
                                        icon: markerColor,
                                        map: map
                                    });
                                    google.maps.event.addListener(marker, 'click', function () {
                                        infowindow.setContent('<div><strong>Category:' + Category + '</strong><br>' +
                                            'Date: ' + date + '<br>' +
                                            'Location: ' + locationName + '<br>' +
                                            'Status: ' + status + '<br>' + '</div>');
                                        infowindow.open(map, this);
                                    });
                                }
                            });
                        });

                    }
                    if (reportIDs != "") {
                        dbRef.on('value', function (snapshot) {
                            snapshot.forEach(snap => {
                                var key = snap.key;
                                var childs = snap.val();

                                var Barangay2 = snap.child("Barangay").val();
                                var Category = snap.child("Category").val();
                                var date = snap.child("Date").val();
                                var locationName = snap.child("Location").val();
                                var status = snap.child("Status").val();
                                var markerColor;
                                if (status == "Pending") {
                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                                }
                                if (status == "Responded") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                                }
                                if (status == "Responding") {

                                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                                }
                                if (Barangay2 == brgy) {
                                    if (key == reportIDs) {


                                        var infowindow = new google.maps.InfoWindow();
                                        var marker = new google.maps.Marker({
                                            position: {
                                                lat: parseFloat(childs.Latitude),
                                                lng: parseFloat(childs.Longitude)
                                            },
                                            icon: markerColor,
                                            map: map
                                        });
                                        google.maps.event.addListener(marker, 'click', function () {
                                            infowindow.setContent('<div><strong>Category:' + Category + '</strong><br>' +
                                                'Date: ' + date + '<br>' +
                                                'Location: ' + locationName + '<br>' +
                                                'Status: ' + status + '<br>' + '</div>');
                                            infowindow.open(map, this);
                                        });
                                    }
                                }
                            });
                        });

                    }
                });
            });
        }

    });
}
$('#category').change(function () {
    if ($(this).val() != "--") {
        $('#reportID').prop("disabled", true);

        document.getElementById("reportID").value = "Disabled!";
    } else {
        $('#reportID').prop("disabled", false);

        document.getElementById("reportID").value = "";
    }
});
$('#startDate').change(function () {
    if ($(this).val() != "") {
        $('#reportID').prop("disabled", true);
        document.getElementById("reportID").value = "Disabled!";
    } else {
        $('#reportID').prop("disabled", false);

        document.getElementById("reportID").value = "";
    }
});
$('#endDate').change(function () {
    if ($(this).val() != "") {
        $('#reportID').prop("disabled", true);
        document.getElementById("reportID").value = "Disabled!";
    } else {
        $('#reportID').prop("disabled", false);

        document.getElementById("reportID").value = "";
    }
});