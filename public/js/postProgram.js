var what = document.getElementById("what");
var when = document.getElementById("when");
var where = document.getElementById("where");
var message = document.getElementById("message");
var category = document.getElementById("category");
var submit = document.getElementById("submit");
var fileButton = document.getElementById("fileButton");
var selectedFile;
$("#file").on('change',function(event){
selectedFile =  event.target.files[0];
});
function postProgram() {
  var filename;
  if(filename==""){
    filename="";
  }
  if(filename!=""){
    filename=selectedFile.name;
  }
  var storageRef = firebase.storage().ref('/Announcements/' + filename)
  var uploadTask = storageRef.put(selectedFile);
 // var fileRef =  storage().chld(filename);
  var whats = what.value;
  var whens = when.value;
  var wheres = where.value;
  var descriptions = message.value;
  var categorys = category.value;
  var dateToday = date(); 
  if(dateToday < whens){
    alert("The date of the activity is invalid");
  }else{
  var rootRef = firebase.database().ref();
  var storesRef = rootRef.child('newsfeed');
  var newStoreRef = storesRef.push();
    

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var uid = firebase.auth().currentUser.uid;
      var rootRefs = firebase.database().ref();
      var storesRefs = rootRefs.child('users');
      uploadTask.on('state_changed',function(snapshot){

          },
          function(error){
            window.alert("Invalid File");
          },
          function(){ 
            var storageRef = firebase.storage().ref('/Announcements/' + filename);
storageRef.getDownloadURL().then(function(url) {
  storesRefs.on("child_added", snap => {
    if (uid == snap.val().UserID) {
    
     
      var barangay = snap.val().Barangay;
      newStoreRef.set({
        Title: whats,
        When: whens,
        Where: wheres,
        DatePosted: dateToday,
        Description: descriptions,
        Category: categorys,
        Barangay: barangay,
        PhotoURL: url
      });
      alert('Successfully Posted!');
      window.location.reload();
    }
  });
});
     
    });
    } else {
      alert('Error!');
    }
  });
}
}

function date(){
  
  var currentDate = new Date();
var date = currentDate.getDate();
var month = currentDate.getMonth(); 
var year = currentDate.getFullYear();

var monthDateYear  = pad(year) + "-" + pad(month+1) + "-" +pad(date) ;
return monthDateYear;
}
function pad(n) {
  return n<10 ? '0'+n : n;
}