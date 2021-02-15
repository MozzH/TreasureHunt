function getGeolocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getGeolocation);
    }
    if(!navigator.geolocation)
    {
        alert("Your Location couldn't be fetched");
    }
}