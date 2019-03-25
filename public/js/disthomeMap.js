function initMap() {
    var lat = 14.576377,
        lang = 121.085110;

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12.9,
        center: new google.maps.LatLng(lat, lang),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var start = document.getElementById("startDate").value;
    var end = document.getElementById("endDate").value;
    var a = document.getElementById("barangay").value;


    var dbRef = firebase.database().ref('reports');
    if (start == null && end == null && a != "--" || start == "" && end == "" && a != "--") {
        dbRef.orderByChild('Barangay').equalTo(a).on('value', function (snapshot) {
            snapshot.forEach(snap => {

                var childs = snap.val();

                var Category = snap.child("Category").val();
                var date = snap.child("Date").val();
                var locationName = snap.child("Location").val();
                var status = snap.child("Status").val();
                var markerColor;
                if (status == "Pending") {
                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                }
                if (status == "Resolved") {

                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                }
                if (status == "Ongoing") {

                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
                }
                if (status != "Spam") {
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

    } else {
        dbRef.orderByChild("Date").startAt(start).endAt(end).on('value', function (snapshot) {
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
                if (status != "Spam" && barangayss == a) {
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

}


window.onload = initMap();