 
function onFeedbackChange(){  
    var brgy = document.getElementById("Berengey").value; 
    var rootRef = firebase.database().ref("newsfeed").orderByChild("Barangay").equalTo(brgy);
        rootRef.on("value", snap => {
          if (snap.exists()) {

            $("#tbody_feedbacks").html("");
            snap.forEach(snap => {

                var title = snap.child("Title").val();
                var datePosted = snap.child("DatePosted").val();
                
                $("#tbody_feedbacks").append("<tr><td class='ky'>" + title + "</td><td>" + datePosted + "</td></tr>")
            })
          }else{
              
            $("#tbody_feedbacks").html("");
            $("#tbody_feedbacks").append("<td id='nullRecords' colspan=2 class='text-center'><b>No Activity Found.</b></td>");
          }
        })
}