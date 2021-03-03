//setting new cookies by getting the name,the time should expire and the value
function setCookie(cookieName, cookieValue, expirationDays)
{
  var date = new Date();
  date.setTime(date.getTime() + (expirationDays*24*60*60*1000));
  var expires = "expires=" + date.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

//returns the value of the cookie
function getCookie(cookieName)
{
  var name = cookieName + "=";
  var ca = document.cookie.split(';');
    
  for(var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0) == ' ') 
    {
      c = c.substring(1);
    }
      
    if (c.indexOf(name) == 0) 
    {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
