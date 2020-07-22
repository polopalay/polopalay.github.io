const auth = "563492ad6f91700001000001f9716621c5f346c7820774e8c0431e39";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit");
const form = document.querySelector(".search-form");
const moreBtn = document.querySelector(".more");
const option = document.querySelector("#chose");
const linkImg = "https://api.pexels.com/v1/curated";
const linkSearchImg = "https://api.pexels.com/v1/search";
const linkVideo = "https://api.pexels.com/videos/popular";
const linkSearchVideo = "https://api.pexels.com/videos/search";
let type = 1;
let page = 1;
let numberOfPerPage = 18;
let searchValue;
let fetchLink;

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = searchInput.value;
  search(searchInput.value);
});

moreBtn.addEventListener("click", loadMore);

option.addEventListener("change", () => {
  gallery.innerHTML = "";
  type = option.value == "image" ? 1 : 2;
  numberOfPerPage = option.value == "image" ? 18 : 8;
  load();
});

function generatePicture(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <a href=${photo.photographer_url}>${photo.photographer}</a>
            <a href=${photo.src.original}><i class="far fa-compress-wide"></i></a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    gallery.appendChild(galleryImg);
  });
}

function generateVideo(data) {
  data.videos.forEach((video) => {
    const galleryVideo = document.createElement("div");
    galleryVideo.innerHTML = `
            <div class="gallery-info">
            <a href=${video.user.url}>${video.user.name}</a>
            <a href=${video.video_files[0].link}>
            <i class="far fa-compress-wide"></i></a>
            </div>
            <video controls>
            <source src="${
              video.video_files[video.video_files.length - 1].link
            }" type="${video.video_files[0].file_type}">
            </video>
            `;
    gallery.appendChild(galleryVideo);
  });
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function load() {
  fetchLink =
    (type === 1 ? linkImg : linkVideo) + `?per_page=${numberOfPerPage}&page=1`;
  const data = await fetchApi(fetchLink);
  console.log(data);
  if (type === 1) {
    generatePicture(data);
  } else {
    generateVideo(data);
  }
}

async function search(query) {
  gallery.innerHTML = "";
  searchInput.value = "";
  fetchLink =
    (type === 1 ? linkSearchImg : linkSearchVideo) +
    `?query=${query}&per_page=${numberOfPerPage}&page=1`;
  const data = await fetchApi(fetchLink);
  if (type === 1) {
    generatePicture(data);
  } else {
    generateVideo(data);
  }
}

async function loadMore() {
  page++;
  if (searchValue) {
    fetchLink =
      (type == 1 ? linkImg : linkVideo) +
      `?query=${searchValue}&per_page=${numberOfPerPage}&page=${page}`;
  } else {
    fetchLink =
      (type == 1 ? linkImg : linkVideo) +
      `?per_page=${numberOfPerPage}&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  if (type === 1) {
    generatePicture(data);
  } else {
    generateVideo(data);
  }
}

load();
