const config = {
    "apiKey": "AIzaSyAIYQGiQcSjZBw9LQ9LcR1yh8uDWtsMfgs",
    "authDomain": "data-492da.firebaseapp.com",
    "databaseURL": "https://data-492da.firebaseio.com",
    "projectId": "data-492da",
    "storageBucket": "data-492da.appspot.com",
    "messagingSenderId": "381903672681",
    "appId": "1:381903672681:web:813cffbc63da30d11f99f8",
    "measurementId": "G-CD4W02BEZ7"
};
const database = new Database(config, false);
async function getData() {
    const data = await database.read("/posts/data");
    const user = await database.auth.currentUser;
    if (data.length > 0) {
        setSrc(data[0]);
        fillDataToListPost(data, 6);
    }
    if (user == null) {
        setLogin();
    } else {
        setLogout();
    }
}

async function search(event) {
    event.preventDefault();
    console.log($("#keyword").val());
    const data = await database.read("/posts/data");
    const listRs = data.filter(element => {
        return element.title.includes($("#keyword").val());
    });
    if (data.length > 0) {
        fillDataToListPost(listRs, 100000);
    }
}

async function login(event) {
    event.preventDefault();
    const result = await database.login($("#account").val(), $("#password").val());
    if (result.rs) {
        $("#error").html("");
        $("#modelLogin").modal("toggle");
        setLogout();
    } else {
        $("#error").html(result.mss);
    }
}

function setLogin() {
    $("#userManager").text("Đăng nhập");
    $("#userManager").attr("data-target", "#modelLogin");
}
function setLogout() {
    $("#userManager").text("Đăng xuất");
    $("#linkToList").text("Danh sách");
    $("#linkToList").attr("href", "/post/list");
    $("#userManager").click(function () {
        database.logout();
        $("#userManager").text("Đăng nhập");
        $("#linkToList").text("");
        $("#userManager").attr("data-target", "#modelLogin");
    });
}
function setSrc(data) {
    $("#title").text(data.title);
    $("#image").attr("src", data.image);
    $("#date").text(data.date);
    $("#description").text(data.description);
    $("#content").html(data.content);
}
function fillDataToListPost(data, limit) {
    $("#otherPost").empty();
    for (let i = 1; i < data.length && i < limit; i++) {
        $("#otherPost").append($("<a>", {
            text: data[i].title,
            href: "#",
            click: function () {
                setSrc(data[i]);
            }
        }))
    }
}
getData();