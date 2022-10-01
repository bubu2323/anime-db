import  KEY  from "./api_js.js";
let page = "page=1";
//dom elements
let modal = document.querySelector("#modal");
let openModal = document.querySelector(".open");
let closeModal = document.querySelector(".close");
let titleModal = document.querySelector(".title-modal");
let statusModal = document.querySelector(".status-modal");
let genresModal = document.querySelector(".genres-modal");
let descriptionModal = document.querySelector(".description-modal");
let img = document.getElementsByClassName("img-anime");
let containerModal = document.querySelector(".container-modal");
let showFilmsContainer = document.querySelector(".showFilms");
let containerWrapper = document.querySelector(".container-wrapper");
let title = document.querySelector("h1");

//fetch data
async function getData() {
  const response = await fetch(
    `https://anime-db.p.rapidapi.com/anime?${page}&size=4&sortBy=ranking&sortOrder=asc`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  showFilms(data);
// if clicked on img
  document.addEventListener(
    "click",
    function (e) {
      if (hasClass(e.target, "img-anime")) {
        let idImg = e.target.dataset.id;

        //iterate the obj
        const alteredKeys = {};
       // gives an array with enumerable property key-value pairs,allow to foreach on result 
        for (const [key, nested] of Object.entries(data)) {
          for (const [i, value] of Object.entries(nested)) {
            if (!alteredKeys[i]) alteredKeys[i] = {};
            alteredKeys[i][key] = value;
          }
        }
        //returns only the values of the obj
        const transformed = Object.values(alteredKeys);

        transformed.forEach((element) => {
          // console.log(element);
          let elem = element.data;
          if (elem) {
            if (elem._id == idImg) {
              titleModal.innerText = elem.title;
              descriptionModal.innerText = elem.synopsis;
              genresModal.innerText = elem.genres;
              let imgModal = document.querySelector(".img-modal");
              imgModal.src = elem.image;
              containerModal.prepend(imgModal);

              statusModal.innerText = `status: ${elem.status.toLowerCase()}`;
            }
          }
        });

        modal.showModal();
      }
    },
    false
  );
}

//call fetch data
getData();

// show data in homepage
function showFilms(data) {
  if (document.querySelector(".loader")) {
    document.querySelector(".loader").remove();
  }

  let results = data.data;

  results.forEach((result) => {
    let title = result.title;
    let img = result.image;
    let filmContainer = document.createElement("div");
    filmContainer.classList.add("film");
    showFilmsContainer.appendChild(filmContainer);

    let filmImg = document.createElement("img");
    filmContainer.appendChild(filmImg);
    filmImg.classList.add("img-anime");
    filmImg.src = img;
    filmImg.setAttribute("data-id", result._id);

    let titleSerie = document.createElement("h3");
    titleSerie.classList.add("titleSerie");
    filmContainer.appendChild(titleSerie);
    titleSerie.innerText = title;
  });
}

//close modal on click
closeModal.addEventListener("click", () => {
  modal.close();
});

// generate specific anime
document.querySelector(".buttonsShow").addEventListener("click", (e) => {
  showFilmsContainer.innerText = "";
  let loader = document.createElement("div");
  loader.classList.add("loader");
  showFilmsContainer.appendChild(loader);
console.log(e.target.className);
  if (e.target.className === "rose-btn randomPageBtn link-nav") {
    title.innerText = "Some random anime";
    page = `page=${randomInteger(1, 1000)}`;
    console.log('qui');
  } else if (e.target.className === "rose-btn popularBtn link-nav") {
    title.innerText = "Most popular anime";
    page = `page=1`;

  }
  getData();
});

//utilis functions
function hasClass(elem, className) {
  return elem.classList.contains(className);
}
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.querySelector(".search").addEventListener("keydown", (e) => {
  if (e.keyCode == 13) e.preventDefault();
});
