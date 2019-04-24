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


    var dbRef = firebase.database().ref('reports/'+ a);
    if (start == null && end == null && a != "--" || start == "" && end == "" && a != "--") {
        dbRef.on('value', function (snap) {
            snap.forEach(snap => {
               var key = snap.key;
               var dbRef1 = firebase.database().ref('reports/' + a + "/" + key);

               dbRef1.on('value', function (snapsh) {
                   snapsh.forEach(snapsh => {

                   
                var childs = snapsh.val();

                var Category = snapsh.child("Category").val();
                var date = snapsh.child("Date").val();
                var locationName = snapsh.child("Location").val();
                var status = snapsh.child("Status").val();
                var markerColor;
                if (status == "Pending") {
                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                }
                if (status == "Completed") {

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
                //
            })
        })
            });

        });

    } else {
        dbRef.on('value', function (snapshot) {
            snapshot.forEach(snap => {
               var key = snap.key;
               var dbRef1 = firebase.database().ref('reports/' + a + "/" + key);

               dbRef1.orderByChild("Date").startAt(start).endAt(end).on('value', function (snapsh) {
                   snapsh.forEach(snapsh => {

                var barangayss = snapsh.child("Barangay").val();
                var barangey = a.value;
                var childs = snapsh.val();

                var Category = snapsh.child("Category").val();
                var date = snapsh.child("Date").val();
                var locationName = snapsh.child("Location").val();
                var status = snapsh.child("Status").val();
                var markerColor;
                if (status == "Pending") {
                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                }
                if (status == "Completed") {

                    markerColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                }
                if (status == "Ongoing") {

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
            })
        })
            });

        });
    }

}