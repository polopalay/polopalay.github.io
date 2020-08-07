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
const limitSize = 1;
const database = new Database(config);
const index = getURLParameter("index");
let id;
let img = "/images/placeholder.png";
let file = "/images/placeholder.png";
let editor;
let senderPost;
async function start() {
  database.auth.onAuthStateChanged(function (user) {
    if (user === null) {
      window.location.href = "/login";
    } else {
      getData();
    }
  });
}

async function getData() {
  const data = await database.read("/posts/data");
  id = data.length;
  if (data[index] != null) {
    senderPost = data[index];
    img = data[index].image;
    file = data[index].file;
    $("#title").val(data[index].title);
    $("#description").val(data[index].description);
    $("#demoImg").attr("src", img);
    $("#content").text(data[index].content);
    $("#demoFile").attr("href", file);
  }
  ClassicEditor.create(document.querySelector("#content"), {
    cloudServices: {
      tokenUrl:
        "https://73674.cke-cs.com/token/dev/29def106affd394b3dcacde90cbe753ea4970b44b1eb5c9a3c24eea97896",
      uploadUrl: "https://73674.cke-cs.com/easyimage/upload/",
    },
    toolbar: ['heading', '|', 'bold', 'italic', 'link',
      '|', 'bulletedList', 'numberedList',
      '|', 'undo', 'redo',
      '|', 'insertTable', 'mediaEmbed'],
    language: "vi",
  }).then((newEditor) => {
    console.log(Array.from(newEditor.ui.componentFactory.names()));
    editor = newEditor;
  });
  // $("#content").from($("#content").ui.componentFactory.names());
}

function submitData() {
  const date = new Date();
  const post = {
    title: $("#title").val(),
    description: $("#description").val(),
    image: img,
    content: editor.getData(),
    file: file,
    date: date.toUTCString()
  };
  post.date = senderPost == null ? date.toUTCString() : senderPost.date;
  id = (index == null || index < 0 || index > id) ? id : index;
  senderPost = senderPost == null ? post : senderPost;
  database.set(`/posts/data/${id}`, post).then(function () {
    toastr.success("Cập nhập thành công");
  }).catch(function (error) {
    toastr.error(error.message);
  });
}

function readImg(event) {
  const filesSelected = event.target.files;
  if (filesSelected.length > 0) {
    const fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      img = fileLoadedEvent.target.result;
      $("#demoImg").attr("src", img);
    };
    if (filesSelected[0].size < 1024 * 1024 * limitSize) {
      fileReader.readAsDataURL(filesSelected[0]);
    } else {
      event.target.files = [];
      toastr.warning("File phải nhỏ hơn 1MB");
    }
  }
}

function readFile(event) {
  const filesSelected = event.target.files;
  if (filesSelected.length > 0) {
    const fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      file = fileLoadedEvent.target.result;
      $("#demoFile").attr("href", file);
    };
    if (filesSelected[0].size < 1024 * 1024 * limitSize) {
      fileReader.readAsDataURL(filesSelected[0]);
    } else {
      event.target.files = [];
      toastr.warning("File phải nhỏ hơn 1MB");
    }
  }
}

start();