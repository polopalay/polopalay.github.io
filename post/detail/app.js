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
        setSrc(data[data.length - 1]);
        fillDataToListPost(data);
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
        fillDataToListPost(listRs);
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
    $("#linkToList").hide();
    $("#linkToSlide").hide();
    $("#userManager").attr("data-target", "#modelLogin");
}
function setLogout() {
    $("#userManager").text("Đăng xuất");
    $("#userManager").attr("data-target", "");
    $("#linkToList").show();
    $("#linkToSlide").show();
    $("#userManager").click(function () {
        database.logout();
        setLogin();
    });
}
function setSrc(data) {
    $("#title").text(data.title);
    $("#image").attr("src", data.image);
    $("#date").text(data.date);
    $("#description").text(data.description);
    $("#content").html(data.content);
    $("#file").attr("href", data.file.filesrc);
    $("#file").attr("download", data.file.filename);
}
function fillDataToListPost(data) {
    $("#otherPost").empty();
    $("#pagination").empty();
    $('#pagination').pagination({
        pageSize: 5,
        dataSource: data,
        className: 'paginationjs-theme-blue paginationjs-small',
        callback: function (dt) {
            $("#otherPost").empty();
            dt.forEach(element => {
                $("#otherPost").append($("<a>", {
                    class: "mb-1",
                    text: element.title,
                    href: "#",
                    click: function () {
                        setSrc(element);
                    }
                }))
            });
        }
    });
}
$("#linkToList").hide();
$("#linkToSlide").hide();
getData();