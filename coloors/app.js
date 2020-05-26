//generate value
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
const popup = document.querySelector(".copy-container");
const adjustButton = document.querySelectorAll(".adjust");
const lockButton = document.querySelectorAll(".lock");
const closeAdjust = document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");
let initialColors;
let savedPalettes = [];

//add action to controls
generateBtn.addEventListener("click", randomColor);
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, i) => {
  div.addEventListener("change", () => {
    updateTextUI(i);
  });
});

currentHexes.forEach((hex) => {
  hex.addEventListener("click", () => {
    copyToClipboard(hex);
  });
});

popup.addEventListener("transitionend", () => {
  const popupBox = popup.children[0];
  popup.classList.remove("active");
  popupBox.classList.remove("active");
});

adjustButton.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    openAdjustmentPanel(index);
  });
});

closeAdjust.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    closeAdjustmentPanel(index);
  });
});

lockButton.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    lockLayer(e, index);
  });
});

//function support for system
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColor() {
  initialColors = [];
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();
    if (div.classList.contains("locked")) {
      initialColors.push(hexText.innerText);
      return;
    } else {
      initialColors.push(chroma(randomColor).hex());
    }

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    checkTextContrast(randomColor, hexText);
    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
    colorizeSliders(color, hue, brightness, saturation);
  });
  resetInput();
  adjustButton.forEach((button, index) => {
    checkTextContrast(initialColors[index], button);
    checkTextContrast(initialColors[index], lockButton[index]);
  });
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

function colorizeSliders(color, hue, brightness, saturation) {
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);
  const midBright = color.set("hsl.s", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(
    0
  )}, ${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(
    0
  )},${scaleBright(0.5)}, ${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75, 204, 204),rgb(75, 75, 204),rgb(204, 75, 204),rgb(204,75,75))`;
}

function hslControls(e) {
  const index =
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-sat") ||
    e.target.getAttribute("data-hue");
  let slider = e.target.parentElement.querySelectorAll('input[type="range"]');
  const hue = slider[0];
  const brightness = slider[1];
  const saturation = slider[2];

  const bgColor = initialColors[index];
  let color = chroma(bgColor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);
  colorDivs[index].style.backgroundColor = color;

  colorizeSliders(color, hue, brightness, saturation);
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector("h2");
  const icons = activeDiv.querySelectorAll(".controls button");
  textHex.innerText = color.hex();
  checkTextContrast(color, textHex);
  for (icon of icons) {
    checkTextContrast(color, icon);
  }
}

function resetInput() {
  const sliders = document.querySelectorAll(".sliders input");
  sliders.forEach((slider) => {
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute("data-hue")];
      const hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }
    if (slider.name === "brightness") {
      const brightColor = initialColors[slider.getAttribute("data-bright")];
      const brightValue = chroma(brightColor).hsl()[2];
      slider.value = Math.floor(brightValue * 100) / 100;
    }
    if (slider.name === "saturation") {
      const satColor = initialColors[slider.getAttribute("data-sat")];
      const satValue = chroma(satColor).hsl()[1];
      slider.value = Math.floor(satValue * 100) / 100;
    }
  });
}

function copyToClipboard(hex) {
  const el = document.createElement("textarea");
  el.value = hex.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  const popupBox = popup.children[0];
  popup.classList.add("active");
  popupBox.classList.add("active");
}
function openAdjustmentPanel(index) {
  sliderContainers[index].classList.toggle("active");
}

function closeAdjustmentPanel(index) {
  sliderContainers[index].classList.remove("active");
}
function lockLayer(e, index) {
  const lockSVG = e.target.children[0];
  const activeBg = colorDivs[index];
  activeBg.classList.toggle("locked");

  if (lockSVG.classList.contains("fa-lock-open")) {
    e.target.innerHTML = '<i class="far fa-lock"></i>';
  } else {
    e.target.innerHTML = '<i class="far fa-lock-open"></i>';
  }
}

const saveContainer = document.querySelector(".save-container");
const saveBtn = document.querySelector(".save");
const submitSave = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveInput = document.querySelector(".save-container input");
const libraryContainer = document.querySelector(".library-container");
const librarybtn = document.querySelector(".library");
const closeLibraryBtn = document.querySelector(".close-library");

saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
librarybtn.addEventListener("click", openLibrary);
closeLibraryBtn.addEventListener("click", closeLibrary);

function openPalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.add("active");
  popup.classList.add("active");
}
function closePalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
}
function savePalette() {
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
  const name = saveInput.value;
  const colors = [];
  currentHexes.forEach((hex) => {
    colors.push(hex.innerText);
  });
  let paletteNr;
  const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
  if (paletteObjects) {
    paletteNr = paletteObjects.length;
  } else {
    paletteNr = savedPalettes.length;
  }

  const paletteObj = { name, colors, nr: paletteNr };
  savedPalettes.push(paletteObj);
  savetoLocal(paletteObj);
  saveInput.value = "";
  const palette = document.createElement("div");
  palette.classList.add("custom-palette");
  const title = document.createElement("h4");
  title.innerText = paletteObj.name;
  const preview = document.createElement("div");
  preview.classList.add("small-preview");
  paletteObj.colors.forEach((smallColor) => {
    const smallDiv = document.createElement("div");
    smallDiv.style.backgroundColor = smallColor;
    preview.appendChild(smallDiv);
  });
  const paletteBtn = document.createElement("button");
  paletteBtn.classList.add("pick-palette-btn");
  paletteBtn.classList.add(paletteObj.nr);
  const i1 = document.createElement("i");
  i1.classList.add("far");
  i1.classList.add("fa-palette");
  paletteBtn.appendChild(i1);

  paletteBtn.addEventListener("click", (e) => {
    closeLibrary();
    const paletteIndex = e.target.classList[1];
    initialColors = [];
    savedPalettes[paletteIndex].colors;
    savedPalettes[paletteIndex].colors.forEach((color, index) => {
      initialColors.push(color);
      colorDivs[index].style.backgroundColor = color;
      const text = colorDivs[index].children[0];
      checkTextContrast(color, text);
      updateTextUI(index);
    });
    resetInput();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("pick-palette-btn");
  deleteBtn.classList.add(paletteObj.nr);
  const i2 = document.createElement("i");
  i2.classList.add("far");
  i2.classList.add("fa-trash-alt");
  deleteBtn.appendChild(i2);
  deleteBtn.addEventListener("click", (e) => {
    deleteByIndex(e.target.classList[1]);
  });

  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteBtn);
  palette.appendChild(deleteBtn);
  libraryContainer.children[0].appendChild(palette);
}

function savetoLocal(paletteObj) {
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  localPalettes.push(paletteObj);
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

function openLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.add("active");
  popup.classList.add("active");
}
function closeLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.remove("active");
  popup.classList.remove("active");
}

function getLocal() {
  if (localStorage.getItem("palettes") == null) {
    localPalettes = [];
  } else {
    const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    savedPalettes = [...paletteObjects];
    paletteObjects.forEach((paletteObj) => {
      const palette = document.createElement("div");
      palette.classList.add("custom-palette");
      const title = document.createElement("h4");
      title.innerText = paletteObj.name;
      const preview = document.createElement("div");
      preview.classList.add("small-preview");
      paletteObj.colors.forEach((smallColor) => {
        const smallDiv = document.createElement("div");
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);
      });
      const paletteBtn = document.createElement("button");
      paletteBtn.classList.add("pick-palette-btn");
      paletteBtn.classList.add(paletteObj.nr);
      const i1 = document.createElement("i");
      i1.classList.add("far");
      i1.classList.add("fa-palette");
      paletteBtn.appendChild(i1);

      paletteBtn.addEventListener("click", (e) => {
        closeLibrary();
        const paletteIndex = e.target.classList[1];
        initialColors = [];
        paletteObjects[paletteIndex].colors;
        paletteObjects[paletteIndex].colors.forEach((color, index) => {
          initialColors.push(color);
          colorDivs[index].style.backgroundColor = color;
          const text = colorDivs[index].children[0];
          checkTextContrast(color, text);
          updateTextUI(index);
        });
        resetInput();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("pick-palette-btn");
      deleteBtn.classList.add(paletteObj.nr);
      const i2 = document.createElement("i");
      i2.classList.add("far");
      i2.classList.add("fa-trash-alt");
      deleteBtn.appendChild(i2);

      deleteBtn.addEventListener("click", (e) => {
        deleteByIndex(e.target.classList[1]);
      });

      palette.appendChild(title);
      palette.appendChild(preview);
      palette.appendChild(paletteBtn);
      palette.appendChild(deleteBtn);
      libraryContainer.children[0].appendChild(palette);
    });
  }
}

function deleteByIndex(index) {
  newPalettes = [];
  for (var i = 0; i < savedPalettes.length; i++) {
    if (i != index) {
      let st = savedPalettes[i];
      st.nr = i;
      newPalettes.push(st);
    }
  }
  for (var i = 0; i < newPalettes.length; i++) {
    newPalettes[i].nr = i;
  }
  savedPalettes = newPalettes;
  localStorage.setItem("palettes", JSON.stringify(newPalettes));

  for (var i = 2; i < libraryContainer.children[0].children.length; i) {
    libraryContainer.children[0].removeChild(
      libraryContainer.children[0].children[i]
    );
  }
  getLocal();
}

getLocal();
randomColor();
