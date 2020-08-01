let editor;
let img;
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
}
async function readImg() {
  const filesSelected = $("#file")[0].files;
  if (filesSelected.length > 0) {
    img = await readFile(filesSelected[0]);
  }
}
