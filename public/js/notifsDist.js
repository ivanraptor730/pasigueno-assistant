function reports() {
    var reportsRef = firebase.database().ref("reports");
    reportsRef.on('child_changed', function (snapshot) {
        document.getElementById('rep-counter').innerHTML = "!";
        console.log(snapshot.val());
    })
}