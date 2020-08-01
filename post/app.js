const limitSize = 1;
let editor;
let img;
let file;
function load() {
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
load();

function submitData() {
  console.log(editor.getData());
  console.log(img);
  console.log(file);
}
function readImg(event) {
  const filesSelected = event.target.files;
  if (filesSelected.length > 0) {
    const fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      img = fileLoadedEvent.target.result;
    };
    if (filesSelected[0].size < 1024 * 1024 * limitSize) {
      fileReader.readAsDataURL(filesSelected[0]);
    } else {
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
    };
    if (filesSelected[0].size < 1024 * 1024 * limitSize) {
      fileReader.readAsDataURL(filesSelected[0]);
    } else {
      toastr.warning("File phải nhỏ hơn 1MB");
    }
  }
}
