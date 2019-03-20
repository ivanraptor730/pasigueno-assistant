function reports() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('users').orderByChild('UserID').equalTo(userId);
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    var brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';

                    var reportsRef = firebase.database().ref("reports").orderByChild("Barangay").equalTo(brgy); //fetch chat list from barangay
                    reportsRef.on('child_changed', function (snapshot) {
                        document.getElementById('rep-counter').innerHTML = "!";
                        console.log(snapshot.val());
                    })
                })
            });
        }
    })
}




function messages() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('users').orderByChild('UserID').equalTo(userId);
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    var brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    var chatterRef = firebase.database().ref("messages/" + brgy).limitToLast(1); //fetch chat list from barangay
                    chatterRef.on('value', function (snapshot) {
                        var seen = snapshot.child("isSeen").val(); //TOdO
                        document.getElementById('msg-counter').innerHTML = "!";
                        console.log(snapshot.val());
                    })
                })
            });
        }
    })
}


function requests() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('users').orderByChild('UserID').equalTo(userId);
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    var brgy = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';

                    var requestsRef = firebase.database().ref("request/forms").orderByChild("Barangay").equalTo(brgy); //fetch chat list from barangay
                    requestsRef.on('child_changed', function (snapshot) {
                        document.getElementById('req-counter').innerHTML = "!";
                        console.log(snapshot.val());
                    })

                    var requestsRef = firebase.database().ref("request/services").orderByChild("Barangay").equalTo(brgy); //fetch chat list from barangay
                    requestsRef.on('child_changed', function (snapshot) {
                        document.getElementById('req-counter').innerHTML = "!";
                        console.log(snapshot.val());
                    });
                })
            })
        }
    })

}



window.onload = messages();
reports();
requests();