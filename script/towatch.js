//import json file for genres
import genres from "../genres.json" assert { type: "json" };
//import api key
import KEY from "./api_js.js";

let datalist = document.querySelector("#titleAnime");

//create select with genres
let select = document.querySelector("#genres");
for (let key in genres) {
  for (let i in genres[key]) {
    let name = genres[key][i].name;
    let option = document.createElement("option");
    option.setAttribute("value", name);
    option.text = name;
    select.appendChild(option);
  }
}
let send = document.querySelector("#send");
let titleAnime = document.querySelector("#title");
let title = "";

//fetch data for title research
async function suggestTitle(title) {
  const response = await fetch(
    `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${title}`,
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
  showTitle(data);
}
send.addEventListener("click", (e) => {
  e.preventDefault();
  populateTable();
});

let resetTimeout = 0;

window.onload = () => {
  titleAnime.addEventListener("keyup", (e) => {
    clearTimeout(resetTimeout);

    resetTimeout = setTimeout(() => {
      suggestTitle(titleAnime.value);
    }, 450);
  });
};

function showTitle(data) {
  //iterate the object and save the titles to show in the options
  const alteredKeys = {};
  // gives an array with enumerable property key-value pairs
  for (const [key, nested] of Object.entries(data)) {
    for (const [i, value] of Object.entries(nested)) {
      if (!alteredKeys[i]) alteredKeys[i] = {};
      alteredKeys[i][key] = value;
    }
  }
  //returns only the values of the obj
  const transformed = Object.values(alteredKeys);
  transformed.forEach((element) => {
    let elem = element.data;
    //create the option in the datalist for suggesting
    if (elem) {
      let option = document.createElement("option");
      option.value = elem.title;
      option.innerText = elem.title;
      datalist.appendChild(option);
    }
  });
}

function populateTable() {
  let tbody = document.querySelector("tbody");

  addNewAnime();
  let stored = JSON.parse(localStorage.getItem("animeList"));
  let latestInserted = stored.at(0);
  let tr = document.createElement("tr");
  tr.dataset.position = latestInserted.id;
  let title = document.createElement("td");
  title.innerText = latestInserted.title;
  let genre = document.createElement("td");
  genre.innerText = latestInserted.genre;
  let status = document.createElement("td");
  status.innerText = latestInserted.status;

  let btnTd =  document.createElement("td");
  let btn = document.createElement('button');
  btn.textContent = "Delete";
  btn.setAttribute('class', 'rose-btn del')
  tbody.appendChild(tr);
  tr.appendChild(title);
 
  tr.appendChild(genre);
  tr.appendChild(status);

  tr.appendChild(btnTd);
  btnTd.appendChild(btn)
}
window.addEventListener("load", () => {
  let stored = JSON.parse(localStorage.getItem("animeList"));
  let tbody = "<tbody>";

  for (const num in stored) {
    tbody += `<tr data-position =${stored[num].id} >`;
    tbody += `<td class ="titleTd"> ${stored[num].title}</td>`;
    tbody += `<td> ${stored[num].genre}</td>`;
    tbody += `<td> ${stored[num].status}</td>`;
    tbody += `<td> <button class="rose-btn del">Delete</button></td>`;
    tbody += "</tr>";

    tbody += "</tbody>";
    document.querySelector("tbody").innerHTML = tbody;
  }
});
//delete element of list
document.addEventListener("click", function (e) {
  //delete visibility row
  if (e.target && e.target.className == "rose-btn del") {
    let buttonTr = e.target.parentNode;
    let indexElem = e.target.parentNode.parentNode.dataset.position;
    let parent = buttonTr.parentNode;
    //unique num element
    let stored = JSON.parse(localStorage.getItem("animeList"));
    stored.splice(stored[indexElem], 1);
    localStorage.setItem("animeList", JSON.stringify(stored));

    parent.innerHTML = '';
  }
});
//closure to create an increment id for each element added 
let increment = (function (n) {
  return function () {
    n += 1;
    return n;
  };
})(-1);

function addNewAnime() {
  let animeList = [];

  let anime = {
    title: titleAnime.value,
    genre: document.querySelector("#genres").value,
    status: document.querySelector('input[name="status"]:checked').value,
    id: increment(),
  };
  animeList.push(anime);
  animeList = animeList.concat(
    JSON.parse(localStorage.getItem("animeList") || "[]")
  );
  localStorage.setItem("animeList", JSON.stringify(animeList));
}
