var key;
var num;
var current = 1;

function readKey() {
  var value = GetURLParameter("key");
  return value;
}

function writeKey(event) {
  event.preventDefault();
  window.location.href = "./search.html?key=" + escape($("#search").val());
}

function searchArticle() {
  key = readKey() == null ? null : unescape(readKey());
  if (key == null) {
    window.location.href = "./index.html";
  }
  $("#searched-container").empty();
  $.getJSON("./data/news.json", function (result) {
    var list = result.filter((item) => {
      return item.title.toUpperCase().includes(key.toUpperCase());
    });

    if (list.length == 0) {
      var error = $("<div></div>", {
        class: "alert alert-danger",
        text: "Can't find article with title contain: " + key,
      });
      $("#searched-container").append(error);
    }
    var numberPageInSite = 8;
    for (var i = 0; i < list.length && i < numberPageInSite; i++) {
      addElement(list, i + (current - 1) * numberPageInSite);
    }
    pagination(list.length / numberPageInSite);
  });
}

function pagination(numberPage) {
  var begin = 1;
  var end = numberPage;

  $("#pagination").empty();
  for (var i = begin; i <= end; i++) {
    if (current == i) {
      addButton(i, "page-item active");
    } else {
      addButton(i, "page-item ");
    }
  }
}
