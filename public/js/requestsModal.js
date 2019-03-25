
window.setInterval(function () {
    var modals = document.getElementsByClassName('modals');
    // Get the button that opens the modal
    var btns = document.getElementsByClassName("openmodals");
    var spans = document.getElementsByClassName("closes");
    for (let i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        modals[i].style.display = "block";
      }
    }
    for (let i = 0; i < spans.length; i++) {
      spans[i].onclick = function () {
        modals[i].style.display = "none";
      }
    }
  }, 1000);