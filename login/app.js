async function checkLogin() {
  const data = await read("/user");
  if (
    $("#account").val() == data.account &&
    $("#password").val() == data.password
  ) {
    toastr.success("Đăng nhập thành công");
  } else {
    toastr.error("Đăng nhập thất bại");
  }
}
