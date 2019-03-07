//Firebase Configuration File

var app_firebase = {};
(function(){
    var config = {
        apiKey: "AIzaSyDXS11uOZGDmHYuN3J8BJxOG_9vanNakqA",
        authDomain: "pasigueno-assist-1532249634197.firebaseapp.com",
        databaseURL: "https://pasigueno-assist-1532249634197.firebaseio.com",
        projectId: "pasigueno-assist-1532249634197",
        storageBucket: "pasigueno-assist-1532249634197.appspot.com",
        messagingSenderId: "394982410129"
      };
      firebase.initializeApp(config);

      app_firebase = firebase;
})()