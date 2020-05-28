let monthsLong;
let monthsSort;

var firebaseConfig = {
  apiKey: "AIzaSyCSlBwUN3ZgzkY7MQWBs_T7bLfxuNCgGEs",
  authDomain: "polopalay-c15d8.firebaseapp.com",
  databaseURL: "https://polopalay-c15d8.firebaseio.com",
  projectId: "polopalay-c15d8",
  storageBucket: "polopalay-c15d8.appspot.com",
  messagingSenderId: "880102425751",
  appId: "1:880102425751:web:5b9bed08711a5b2bd815d2",
  measurementId: "G-ZRRDS6D9C5",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function readMonths() {
  $.getJSON("./data/months.json", function (result) {
    monthsLong = result.monthsLong;
    monthsSort = result.monthsSort;
  });
}

function readNews() {
  const id = GetURLParameter("id");
  $.getJSON(
    "https://firebasestorage.googleapis.com/v0/b/polopalay-c15d8.appspot.com/o/news.json?alt=media&token=525f6e4b-9064-4c26-beba-fa28494c69c4",
    function (result) {
      var article = result.find((item) => {
        return item.id == id;
      });
      article = article == undefined ? result[0] : article;
      const date = new Date(article.date);
      const month = monthsLong[date.getMonth() - 1];
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
    }
  );
}

function readMostNews() {
  $.getJSON("./data/news.json", function (result) {
    let mostNew = result[0].content;
    mostNew =
      mostNew.length <= 200 ? mostNew : mostNew.substring(0, 200) + "...";
    for (let i = 0; (i < 4) & (i < result.length); i++) {
      addElement(result, i);
    }
  });
}
