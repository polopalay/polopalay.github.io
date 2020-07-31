function GetURLParameter(sParam) {
  $.urlParam = function (name) {
    const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    return results != null ? results[1] : null;
  };
  return $.urlParam(sParam);
}

function softDescription(description) {
  if (description == null) {
    return "";
  } else {
    return description.length > 150
      ? description.substring(0, 150) + "..."
      : description;
  }
}

function dateDMY(value) {
  let date = new Date(value);
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}
