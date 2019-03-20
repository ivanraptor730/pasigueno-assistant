var brgy;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = firebase.auth().currentUser.uid;
        var users = firebase.database().ref('users');
        var ref = users.orderByChild('UserID').equalTo(userId);
        ref.once('value', function (snapshot) {
            var parentKey = Object.keys(snapshot.val())[0];
            return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
            })
        })

    }
})

function messages() {
    var chatterRef = firebase.database().ref("messages/" + brgy); //fetch chat list from barangay
    chatterRef.on('child_changed', function (snapshot) {
        document.getElementById('msg-counter').innerHTML = "!";
        console.log(snapshot.val());
    });
}


function reports() {
    var reportsRef = firebase.database().ref("reports").orderByChild("Barangay").equalTo(brgy); //fetch chat list from barangay
    reportsRef.on('child_changed', function (snapshot) {
        document.getElementById('rep-counter').innerHTML = "!";
        console.log(snapshot.val());
    })
}

function requests() {
    var requestsRef = firebase.database().ref("reports/forms").orderByChild("Barangay").equalTo(brgy); //fetch chat list from barangay
    requestsRef.on('child_changed', function (snapshot) {
        document.getElementById('req-counter').innerHTML = "!";
        console.log(snapshot.val());
    })

    var requestsRef = firebase.database().ref("reports/services").orderByChild("Barangay").equalTo(brgy); //fetch chat list from barangay
    requestsRef.on('child_changed', function (snapshot) {
        document.getElementById('req-counter').innerHTML = "!";
        console.log(snapshot.val());
    })
}

window.onload = messages(); reports(); requests();