document.getElementById('message').addEventListener('input', function () {
  var max = 300;
  var total = 300;
  var text = this.value,
    count = text.trim().replace(/\s+/g, '').split('').length;
  total = max - count;
  document.getElementById('wordCount').textContent = total;
});