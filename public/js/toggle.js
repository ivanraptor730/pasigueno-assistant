   
         window.onload = function LOADPAGE(){
            firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var key="";
                var userId = firebase.auth().currentUser.uid;
                var users = firebase.database().ref('users');
                var ref = users.orderByChild('UserID').equalTo(userId);
    
                ref.once('value', function (snapshot) {
                    var parentKey = Object.keys(snapshot.val())[0];
    
                    return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                        barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                        var rootRef = firebase.database().ref("requestStatus/"+barangay);
                        rootRef.on("value", snap => {
                            if (snap.exists()) {
                                snap.forEach(snap => {
                                    var StatusHall = snap.child("StatusHall").val();
                                    var StatusTent = snap.child("StatusTent").val();
    
                                   if(StatusHall == "Disabled"){
                                    document.getElementById("slider").checked = false;
                                   }
                                   if(StatusHall == "Enabled"){
                                    document.getElementById("slider").checked = true;
                                   }
                                   if(StatusTent == "Enabled"){
                                    document.getElementById("slider2").checked = true;
                                   }
                                   if(StatusTent == "Disabled"){
                                    document.getElementById("slider2").checked = false;
                                   }
                                })
                            }
                        });
                    })
                })
            }
        })
         
                    }