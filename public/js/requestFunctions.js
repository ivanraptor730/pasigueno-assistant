$(function () { //Respond to forms
    $("#table_body").delegate("tr #takeActionApproved", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Do you want to approved on Report ID " + $id + "?");
        if (r == true) {
            
    firebase.auth().onAuthStateChanged(function (user) {
        
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var users = firebase.database().ref('users');
            var ref = users.orderByChild('UserID').equalTo(userId);
        
            ref.once('value', function (snapshot) {
                var parentKey = Object.keys(snapshot.val())[0];
                
                return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                    
                    barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                    
            firebase.database().ref("request/forms/" + $id).update({
                Status: "Approved",
                Barangay_Status: barangay +"_Approved",
            });
            alert('Updated Report Status of ID ' + $id);
                });
            });
        }
    });
        } 
    });
    $("#table_body").delegate("tr #Declined", "click", function (e) {
        var $row = $(this).closest("tr");
        var $id = $row.find(".ky").text();

        var r = confirm("Do you want to Declined on Report ID " + $id + "?");
        if (r == true) {  
             firebase.auth().onAuthStateChanged(function (user) {
        
            if (user) {
                var userId = firebase.auth().currentUser.uid;
                var users = firebase.database().ref('users');
                var ref = users.orderByChild('UserID').equalTo(userId);
            
                ref.once('value', function (snapshot) {
                    var parentKey = Object.keys(snapshot.val())[0];
                    
                    return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                        
                        barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                        
                firebase.database().ref("request/forms/" + $id).update({
                    Status: "Declined",
                    Barangay_Status: barangay +"_Declined",
                });
                alert('Updated Report Status of ID ' + $id);
                    });
                });
            }
        });
        }
    });
//Respond to services
        $("#table_body1").delegate("tr #takeActionApproved1", "click", function (e) {
            var $row = $(this).closest("tr");
            var $id = $row.find(".ky").text();
    
            var r = confirm("Do you want to approved on Report ID " + $id + "?");
            if (r == true) {
                
        firebase.auth().onAuthStateChanged(function (user) {
            
            if (user) {
                var userId = firebase.auth().currentUser.uid;
                var users = firebase.database().ref('users');
                var ref = users.orderByChild('UserID').equalTo(userId);
            
                ref.once('value', function (snapshot) {
                    var parentKey = Object.keys(snapshot.val())[0];
                    
                    return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                        
                        barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                        
                firebase.database().ref("request/services/" + $id).update({
                    Status: "Approved",
                    Barangay_Status: barangay +"_Approved",
                });
                alert('Updated Report Status of ID ' + $id);
                    });
                });
            }
        });
            } 
        });
        $("#table_body1").delegate("tr #Declined1", "click", function (e) {
            var $row = $(this).closest("tr");
            var $id = $row.find(".ky").text();
    
            var r = confirm("Do you want to Declined on Report ID " + $id + "?");
            if (r == true) {   firebase.auth().onAuthStateChanged(function (user) {
            
                if (user) {
                    var userId = firebase.auth().currentUser.uid;
                    var users = firebase.database().ref('users');
                    var ref = users.orderByChild('UserID').equalTo(userId);
                
                    ref.once('value', function (snapshot) {
                        var parentKey = Object.keys(snapshot.val())[0];
                        
                        return firebase.database().ref('users/' + parentKey).once('value').then(function (snapshot) {
                            
                            barangay = (snapshot.val() && snapshot.val().Barangay) || 'Unknown';
                            
                    firebase.database().ref("request/services/" + $id).update({
                        Status: "Declined",
                        Barangay_Status: barangay +"_Declined",
                    });
                    alert('Updated Report Status of ID ' + $id);
                        });
                    });
                }
            });
            }
        });
    
        
      
});