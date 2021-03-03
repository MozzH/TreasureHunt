//getting the position of the user
function getLocation()
{
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else 
  { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//showing the postition of the user
function showPosition(position) 
{
  //showing the location of the user on the console for debugging issues
  console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}

getLocation();
