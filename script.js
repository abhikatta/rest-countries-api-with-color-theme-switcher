const main = document.getElementById("main");
const itemContainer = document.getElementById("item-container");
// not using this as per design requirements
const URL = "https://restcountries.com/v3.1/all";
const LOCAL_JSON_DATA_FILE = "./data.json";
var req = new XMLHttpRequest();
var countriesData = JSON.parse(localStorage.getItem("countriesData")) || [];
window.addEventListener("load", async () => {
  // AJAX: params:request type, url/file, async or not
  //   req.open("GET", URL, true);
  //   req.onload = function () {
  //     if (this.status === 200) {
  //       //   console.log(this.responseText);
  //       countriesData = JSON.parse(this.responseText);
  //       console.log(countriesData);
  //       countriesData = JSON.stringify(countriesData);
  //       main.textContent = countriesData;
  //     }
  //   };
  //   req.send();
  //   Good Ol' Fetch:
  fetch(LOCAL_JSON_DATA_FILE)
    .then((response) => response.json())
    .then((data) => {
      if (localStorage.getItem("countriesData") === null) {
        countriesData = localStorage.setItem(
          "countriesData",
          JSON.stringify(data)
        );
        countriesData = data;
      } else {
        console.log("fetched data from localStorage");
      }
      //   data.forEach((element) => {
      //     main.innerHTML += `<p>${element.name.official}</p>`;
      //     main.innerHTML += `<img width='100' alt=${element.flags.alt} src=${element.flags.svg}></img>`;
      //   });
    })
    .catch((error) => console.log(error));
  countriesData.map((v, i) => {
    console.log(v);
    itemContainer.innerHTML += `<div class='item' id='item'>
                                <img  src=${v.flags.png} alt=${v.flags.alt}/>
                                <p class='country-title'>${v.name.common}</p>
                                <p class='country-population'>Population: ${v.population}</p>
                                <p class='country-capital'>Capital: ${v.capital}</p>
                            </div>`;
  });
});

// console.log(countriesData.length);
// countriesData.map((v, i) => {
//   console.log(v);
//   itemContainer.innerHTML += `<div class='item' id='item'>
//                                 <img  src=${v.flags.png} alt=${v.flags.alt}/>
//                                 <p class='country-title'>${v.name.common}</p>
//                                 <p class='country-population'>Population: ${v.population}</p>
//                                 <p class='country-capital'>Capital: ${v.capital}</p>
//                             </div>`;
// });
