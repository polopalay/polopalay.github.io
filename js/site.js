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
    const data = await database.read("/posts/data/0");
    $("#title").text(data.title);
    $("#image").attr("src", data.image);
    $("#date").text(data.date);
    $("#description").text(data.description);
    $("#content").html(data.content);
    $("#userManager").empty();
    var user = await database.auth.currentUser;
    if (user == null) {
        $("#userManager").append($("<a>", {
            class: "nav-link",
            css: { "cursor": "pointer" },
            "data-toggle": "modal",
            "data-target": "#modelLogin",
            text: "Đăng nhập"
        }));
    } else {
        $("#userManager").append($("<a>", {
            class: "nav-link",
            css: { "cursor": "pointer" },
            text: "Đăng xuất",
            click: function () {
                $("#userManager").empty();
                database.logout();
                $("#userManager").append($("<a>", {
                    class: "nav-link",
                    css: { "cursor": "pointer" },
                    "data-toggle": "modal",
                    "data-target": "#modelLogin",
                    text: "Đăng nhập"
                }));
            }
        }));
    }
}
async function login(event) {
    event.preventDefault();
    const result = await database.login($('#account').val(), $('#password').val());
    console.log(result);
    if (result.rs) {
        window.location.href = "/post/list";
    } else {
        $("#error").html(result.mss);
    }
}
getData();