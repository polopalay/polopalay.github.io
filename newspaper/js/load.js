function loadHeaderAndFooter() {
  $(function () {
    $("#header").load("./component/header.html");
  });
  $(function () {
    $("#footer").load("./component/footer.html");
  });
}

function addElement(list, index) {
  const date = new Date(list[index].date);
  const aDate =
    monthsSort[date.getMonth() - 1] +
    " " +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  let description = list[index].content;
  description = description.split("<br/>")[0];
  description =
    description.length <= 120
      ? description
      : description.substring(0, 120) + "...";

  const all = $("<div></div>", {
    class: "col-md-6 mb-4",
  });
  const flexBox = $("<div></div>", {
    class: "row no-gutters border shadow-sm",
  });
  const left = $("<div></div>", {
    class: "col p-4 d-flex flex-column",
  });
  const right = $("<div></div>", {
    class: "d-block pr-5",
  });
  const h3 = $("<h3></h3>", {
    class: "mb-0",
    text: list[index].title,
  });
  const pDate = $("<p></p>", {
    class: "mb-1 text-muted",
    text: aDate,
  });
  const pDes = $("<p></p>", {
    class: "mb-auto",
    text: description,
  });
  const a = $("<a></a>", {
    class: "text-primary",
    href: "https://polopalay.github.io/newspaper?id=" + list[index].id,
    text: "Continue reading",
  });
  const img = $("<img></img>", {
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
    const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    return results != null ? results[1] : null;
  };
  return $.urlParam(sParam);
}
