const limitSize = 1;
const index = 0;
let img;
let file;
let editor;
async function start() {
  const config = getCookie("config");
  if (config === null) {
    window.location.href = "/login";
  } else {
    await init(JSON.parse(config));
    await getData()
  }
}
async function getData() {
  const data = await read("/");
  img = data.posts[index].image;
  file = data.posts[index].file;
  $("#title").val(data.posts[index].title);
  $("#desciption").val(data.posts[index].desciption);
  $("#demoImg").attr("src", img);
  $("#content").html(data.posts[index].content);
  $("#demoFile").attr("href", file);
  ClassicEditor.create(document.querySelector("#content"), {
    cloudServices: {
      tokenUrl:
        "https://73674.cke-cs.com/token/dev/29def106affd394b3dcacde90cbe753ea4970b44b1eb5c9a3c24eea97896",
      uploadUrl: "https://73674.cke-cs.com/easyimage/upload/",
    },
    language: "vi",
  }).then((newEditor) => {
    editor = newEditor;
  });
}
function submitData() {
  const post = {
    posts: [{
      title: $("#title").val(),
      desciption: $("#desciption").val(),
      image: img,
      content: editor.getData(),
      file: file

    }]
  };
  set("/", post);
  toastr.success("Cập nhập thành công");
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