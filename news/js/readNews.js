function readNews() {
  const id = GetURLParameter("id");
  $.getJSON("/news/data/news.json", function (result) {
    var article = result.find((item) => {
      return item.id == id;
    });
    article = article == undefined ? result[0] : article;
    const date = new Date(article.date);
    const month = monthsLong[date.getMonth() - 1];
    $("#title").html(article.title);
    $("#img").attr("src", "/news/images/article/" + article.image);
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
  $.getJSON("/news/data/news.json", function (result) {
    let mostNew = result[0].content;
    mostNew =
      mostNew.length <= 200 ? mostNew : mostNew.substring(0, 200) + "...";
    for (let i = 0; (i < 4) & (i < result.length); i++) {
      addElement(result, i);
    }
  });
}
