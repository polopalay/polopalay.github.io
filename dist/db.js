class Database {
  constructor (config) {
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.auth = firebase.auth();
  }
  async read(url) {
    const ref = this.db.ref(url);
    let result;
    await ref.once("value").then(function (data) {
      result = data.val();
    });
    return result;
  }
  async set(url, data) {
    this.db.ref(url).set(data);
  }
  async update(url, data) {
    this.db.ref(url).update(data);
  }
  async remove(url) {
    this.db.ref(url).remove();
  }
  async login(username, password) {
    let result;
    await this.auth.signInWithEmailAndPassword(username, password).then(function () {
      result = "Đăng nhập thành công";
    }).catch(function (error) {
      result = error.message;
    });
    return result;
  }
  async logout() {
    auth.signOut();
  }
  async deleteList(url, index) {
    let count = 0;
    const data = await this.read(url);
    const list = await data.map(element => { element.index = count; count++; return element }).filter(item => item.index !== index);
    await this.set(url, list);
  }
  async addList(url, index) {
    let count = 0;
    const data = await this.read(url);
    const list = await data.map(element => { element.index = count; count++; return element }).filter(item => item.index !== index);
    await this.set(url, list);
  }
}
