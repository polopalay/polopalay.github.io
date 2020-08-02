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
async function start() {
  await init(config);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user !== null) {
      window.location.href = "/post/list";
    }
  });
}
async function checkLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function () {
    toastr.success("Đăng nhập thành công");
  }).catch(function (error) {
    toastr.error(error.message);
    console.log(error.message);
  });
  // const username = $("#account").val();
  // const password = $("#password").val();
  // firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
  //   toastr.success("Đăng nhập thành công");
  // }).catch(function (error) {
  //   toastr.error(error.message);
  // });
}
start();
