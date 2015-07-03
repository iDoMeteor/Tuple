/************************************************************************/
function Cookie_setCookie(expires, path) 
{
  // Default Setting is on month
  if (expires == null)
  {
    var today = new Date()
    expires = new Date()
    expires.setTime(today.getTime() + 1000*60*60*24*31)
  }

  // Construct String
  startingPlace = 2;
  for(var i = startingPlace ; i < arguments.length; i++)
  {
    var cookieString = arguments[i++] + "=";
    cookieString += escape(arguments[i]);
	  cookieString += "; expires=" + expires.toGMTString();
	  if (path != null)
	  {
	    cookieString += "; path=" + path;
	  }
		//alert("Setting cookie = '" + cookieString + "'");
	  document.cookie = cookieString;
  }
}

/************************************************************************/

function Cookie_getCookieValue(value) 
{
  var search = value + "=";
	//alert("Cookie = '" + document.cookie + "'");
  if (document.cookie.length > 0) // if there are any cookies
  { 
    offset = document.cookie.indexOf(search) 
    if (offset != -1) // if cookie exists
    {  
      offset += search.length; 
      // set index of beginning of value
      end = document.cookie.indexOf(";", offset) ;
      // set index of end of cookie value
      if (end == -1) 
      {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(offset, end))
    }
  }
  return null;
}
/************************************************************************/
/************************************************************************/