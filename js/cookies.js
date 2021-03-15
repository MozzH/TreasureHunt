/* naming functions:
*   e.g. setCookie
*   verb + Cookie
*   set + Cookie
*/
//cookies
const playerName_cookie;
const session_cookie;

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

function checkCookie(cookieName)
{
  var username=getCookie(cookieName);
  if (username == "")
  {
    return false;
    user = prompt("Please enter your name:", "");
  }
  else
  {
    return true;
  }
}

function deleteCookie(cookieName)
{
  let cookieValue = "";
  var date = new Date();
  var time = date.getTime()

  date.setTime(time);

  //find a way to delete stuff
  document.cookieName = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}
