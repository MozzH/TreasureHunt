<!DOCTYPE html>
<html>
<head>
<script>
    <!-- we are setting new cookies by gettig the name the time should expire and the value -->
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
</script>
</head>
</html>
