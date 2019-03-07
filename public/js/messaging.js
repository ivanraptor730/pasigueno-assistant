const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
    console.log('Notifications Allowed');
    return messaging.getToken();
})
.then(function(token){
    console.log(token);
})
.catch(function(err) {
    console.log('Notifications Denied');
})