let editor;
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

function submit() {
  console.log(editor.getData());
}
function readFile() {
  const filesSelected = $("#file")[0].files;
  if (filesSelected.length > 0) {
    const fileToLoad = filesSelected[0];
    const fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      const srcData = fileLoadedEvent.target.result;
      $("#img").attr("src", srcData);
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}
