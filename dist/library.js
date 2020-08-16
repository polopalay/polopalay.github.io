function getURLParameter(sParam) {
  $.urlParam = function (name) {
    const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    return results != null ? results[1] : null;
  };
  return $.urlParam(sParam);
}

function softDescription(description, length) {
  if (description == null) {
    return "";
  } else {
    return description.length > length
      ? description.substring(0, length) + "..."
      : description;
  }
}

function dateDMY(value) {
  let date = new Date(value);
  return (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()) + "/" + (date.getMonth() < 10 ? ("0" + date.getMonth()) : date.getMonth()) + "/" + date.getFullYear();
}

function setCookie(name, value, minutes) {
  let expires = "";
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const listCookie = document.cookie.split(";");
  for (let i = 0; i < listCookie.length; i++) {
    let c = listCookie[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name) {
  if (getCookie(name) != null) {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    document.cookie = name + "=; Path=/; Expires=" + date.toUTCString();
  }
}

