function start(url) {
  $.ajax({ url: url, method: "GET" }).done(function (data) {
    init(data)
  });
}
async function checkLogin() {
  let config = null;
  const data = await read("/user");
  await data.forEach(element => {
    if ($("#account").val() == element.account && $("#password").val() == element.password) {
      config = element.config;
    }
  });
  if (config == null) {
    toastr.error("Đăng nhập thất bại");
  } else {
    setCookie("config", JSON.stringify(config), 60)
    window.location.href = "/post/upsert";
  }
}
start("/dist/firebase.json")
