//getting the position of the user; update every two minutes
function getLocation()
{
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else 
  { 
    alert("Geolocation is not supported by this browser.");
  }
  setTimeout(getLocation, 120000);
}

//showing the postition of the user
function showPosition(position) 
{
  //showing the location of the user on the console for debugging issues
  console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}

getLocation();
showPosition();