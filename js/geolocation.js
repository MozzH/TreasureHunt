<!DOCTYPE html>
<html>
<body>

<p>geolocation.</p>

<script>
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
console.log("Latitude: " + position.coords.latitude + ", Longitude: " +
position.coords.longitude);
}

getLocation();
</script>

</body>
</html>
