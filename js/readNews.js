var monthsLong;
var monthsSort;

function readMonths() {
  $.getJSON("./data/months.json", function (result) {
    monthsLong = result.monthsLong;
    monthsSort = result.monthsSort;
  });
}

function readNews() {
  var id = GetURLParameter("id");
  $.getJSON("./data/news.json", function (result) {
    var article = result.find((item) => {
      return item.id == id;
    });
    article = article == undefined ? result[0] : article;
    var date = new Date(article.date);
    var month = monthsLong[date.getMonth() - 1];
    $("#title").html(article.title);
    $("#img").attr("src", "./img/article/" + article.image);
    $("#content").html(article.content);
    $("#writer").text(
      month +
        " " +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        ", " +
        date.getFullYear() +
        " By " +
        article.author
    );
  });
}

function readMostNews() {
  $.getJSON("./data/news.json", function (result) {
    var mostNew = result[0].content;
    mostNew =
      mostNew.length <= 200 ? mostNew : mostNew.substring(0, 200) + "...";
    for (var i = 0; (i < 4) & (i < result.length); i++) {
      addElement(result, i);
    }
  });
}
