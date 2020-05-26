function loadHeaderAndFooter() {
  $(function () {
    $("#header").load("./component/header.html");
  });
  $(function () {
    $("#footer").load("./component/footer.html");
  });
}

function addButton(index, type) {
  var li = $("<li></li>", {
    class: type,
  });
  var btn = $("<button></button>", {
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

function addElement(list, index) {
  var date = new Date(list[index].date);
  var aDate =
    monthsSort[date.getMonth() - 1] +
    " " +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  var description = list[index].content;
  description = description.split("<br/>")[0];
  description =
    description.length <= 120
      ? description
      : description.substring(0, 120) + "...";

  var all = $("<div></div>", {
    class: "col-md-6 mb-4",
  });
  var flexBox = $("<div></div>", {
    class: "row no-gutters border shadow-sm",
  });
  var left = $("<div></div>", {
    class: "col p-4 d-flex flex-column",
  });
  var right = $("<div></div>", {
    class: "d-block pr-5",
  });
  var h3 = $("<h3></h3>", {
    class: "mb-0",
    text: list[index].title,
  });
  var pDate = $("<p></p>", {
    class: "mb-1 text-muted",
    text: aDate,
  });
  var pDes = $("<p></p>", {
    class: "mb-auto",
    text: description,
  });
  var a = $("<a></a>", {
    class: "text-primary",
    href: "./index.html?id=" + list[index].id,
    text: "Continue reading",
  });
  var img = $("<img></img>", {
    class: "img-description rounded",
    src: "./img/article/" + list[index].image,
  });
  left.append(h3);
  left.append(pDate);
  left.append(pDes);
  left.append(a);
  left.append(a);
  right.append(img);
  flexBox.append(left);
  flexBox.append(right);
  all.append(flexBox);
  $("#searched-container").append(all);
}

function GetURLParameter(sParam) {
  $.urlParam = function (name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    return results != null ? results[1] : null;
  };
  return $.urlParam(sParam);
}
