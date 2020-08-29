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
    const user = await database.auth.currentUser;
    if (user == null) {
        setLogin();
    } else {
        setLogout();
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
    $("#userManager").text("Login");
    $("#linkToList").hide();
    $("#linkToSlide").hide();
    $("#userManager").attr("data-target", "#modelLogin");
}
function setLogout() {
    $("#userManager").text("Logout");
    $("#userManager").attr("data-target", "");
    $("#linkToList").show();
    $("#linkToSlide").show();
    $("#userManager").click(function () {
        database.logout();
        setLogin();
    });
}
$("#linkToList").hide();
$("#linkToSlide").hide();
getData();