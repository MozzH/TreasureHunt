//setting new cookies by getting the name,the time should expire and the value
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//returns the value of the cookie
function getCookie(cname)
{
  var name = cname + "=";
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
