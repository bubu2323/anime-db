const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  },
};
let list = document.querySelector("#list");
let windowResult = document.querySelector(".windowResult");

function searchTitle(title) {
  fetch(
    `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${title}`,
    options
  )
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      let corrispondence = [];
      Object.keys(json).map(function (key) {
        corrispondence = json[key];
        showResults(corrispondence);
      });
    })
    .catch((err) => {
      document.querySelector("#error").innerText = `error: ${err}`;
      
    }
  )
}
 
function checkStatus(response) {
  if (!response.ok || response.status != 200) {
    throw new Error(`${response.statusText}cannot load resource`);
  }
  
return response;
}

function showResults(data) {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (typeof element == "object" && !element.length) {
        //  console.log(element);
        let div = document.createElement("div");
        div.classList.add("divContainer");
        div.setAttribute("data-id", element._id);

        divWrapper = document.createElement("div");
        divWrapper.classList.add("divWrapper");

        let title = document.createElement("h3");
        title.classList.add("titleSearch");
        title.innerText = element.title;

        let img = document.createElement("img");
        img.src = element.image;
        img.classList.add("resizeImg");
        let genres = document.createElement("h4");
        genres.classList.add("genres");
        genres.innerText = element.genres;

        let info = document.createElement("a");
        info.classList.add("link");
        info.innerText = "more info...";
        info.href = element.link;

        list.appendChild(div);
        div.appendChild(divWrapper);
        divWrapper.appendChild(title);
        divWrapper.appendChild(genres);
        div.appendChild(img);
        divWrapper.appendChild(info);
        
      }
    }
  }
}

let resetTimeout = 0;

window.onload = () => {
  let searchInput = document.querySelector(".search");
  searchInput.addEventListener("keyup", (e) => {
    clearTimeout(resetTimeout);

    //empty list and remove visibilty windowResult
    if (searchInput.value.trim().length === 0) {
      list.innerHTML = "";
      windowResult.classList.remove("show");
      return;
    } else {
      windowResult.classList.add("show");
    }

    resetTimeout = setTimeout(() => {
      searchTitle(searchInput.value);
      list.innerHTML = "";
    }, 450);
  });
};

