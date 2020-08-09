class Database {
  constructor (config, authentication) {
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.auth = firebase.auth();
    if (authentication) {
      this.auth.onAuthStateChanged(function (user) {
        if (user === null) {
          window.location.href = "/";
        }
      });
    }
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
      result = { rs: true, mss: "Đăng nhập thành công" };
    }).catch(function (error) {
      result = { rs: false, mss: error.message };;
    });
    return result;
  }
  async logout() {
    this.auth.signOut();
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
