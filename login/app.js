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
const database = new Database(config);
database.auth.onAuthStateChanged(function (user) {
  if (user !== null) {
    window.location.href = "/post/list";
  }
});
function loginWithAccount(event) {
  event.preventDefault();
  const username = $("#account").val();
  const password = $("#password").val();
  database.auth.signInWithEmailAndPassword(username, password).then(function () {
    toastr.success("Đăng nhập thành công");
  }).catch(function (error) {
    toastr.error(error.message);
  });
}

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  database.auth.signInWithPopup(provider).then(function () {
    toastr.success("Đăng nhập thành công");
  }).catch(function (error) {
    toastr.error(error.message);
    console.log(error.message);
  });
}
