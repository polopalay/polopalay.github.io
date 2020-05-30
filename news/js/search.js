let key;
let current = 1;
function readKey() {
  const value = GetURLParameter("key");
  return value;
}

function writeKey(event) {
  event.preventDefault();
  window.location.href = "/news/search?key=" + escape($("#search").val());
}

function searchArticle() {
  key = readKey() == null ? null : unescape(readKey());
  if (key == null) {
    window.location.href = "https://polopalay.github.io/news";
    key = "a";
  }
  $("#searched-container").empty();
  $.getJSON("/news/data/news.json", function (result) {
    const list = result.filter((item) => {
      return item.title.toUpperCase().includes(key.toUpperCase());
    });

    if (list.length == 0) {
      const error = $("<div></div>", {
        class: "alert alert-danger",
        text: "Can't find article with title contain: " + key,
      });
      $("#searched-container").append(error);
    }
    const numberPageInSite = 8;
    for (let i = 0; i < list.length && i < numberPageInSite; i++) {
      addElement(list, i + (current - 1) * numberPageInSite);
    }
    pagination(list.length / numberPageInSite);
  });
}

function pagination(numberPage) {
  const begin = 1;
  const end = numberPage;

  $("#pagination").empty();
  for (let i = begin; i <= end; i++) {
    if (current == i) {
      addButton(i, "page-item active");
    } else {
      addButton(i, "page-item ");
    }
  }
}

function addButton(index, type) {
  const li = $("<li></li>", {
    class: type,
  });
  const btn = $("<button></button>", {
    class: "page-link",
    text: index,
    click: (event) => {
      current = $(event.target).text();
      searchArticle();
    },
  });
  li.append(btn);
  $("#pagination").append(li);
}
