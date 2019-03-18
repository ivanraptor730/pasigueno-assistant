

function initialize() {

  $("#tbody_pending").delegate("tr #openMap", "click", function (e) {
    alert("gumagana")
    var $row = $(this).closest("tr");
    var $id = $row.find(".ky").text();
    
    var lat = $row.find(".lat").text();
    var lang = $row.find(".lang").text();
    alert(lat+"|"+lang);
    var location = new google.maps.LatLng( parseFloat(lat), parseFloat(lang));
    var mapProperty= {
      center: location,
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapProperty);
    var marker = new google.maps.Marker({
      position: {
          lat: parseFloat(lat),
          lng: parseFloat(lang)
      },
      map: map
  });
  });
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAF9jb6--NfLfSn3SCresxshyhfwKMi_34&callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;  