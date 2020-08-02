async function init(data) {
  await firebase.initializeApp(data);
}
async function read(url) {
  const db = firebase.database();
  const ref = db.ref(url);
  let result;
  await ref.once("value").then(function (data) {
    result = data.val();
  });
  return result;
}
async function set(url, data) {
  const db = firebase.database();
  db.ref(url).set(data);
}
async function update(url, data) {
  const db = firebase.database();
  db.ref(url).update(data);
}
async function remove(url) {
  const db = firebase.database();
  db.ref(url).remove();
}