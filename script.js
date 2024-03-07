const itemContainerElement = document.getElementById("item-container");
const searchElement = document.getElementById("search");
// not using this due to design requirements
const URL = "https://restcountries.com/v3.1/all";
const LOCAL_JSON_DATA_FILE = "./data.json";
var req = new XMLHttpRequest();
var countriesData = JSON.parse(localStorage.getItem("countriesData")) || [];
var mapCountries = countriesData;
window.addEventListener("load", async () => {
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
    })
    .catch((error) => console.log(error));
  mapCountries.map((v, i) => {
    itemContainerElement.innerHTML += `<div class='item' key=${i} id='item'>
                                <img  src=${v.flags.png} alt=${v.flags.alt}/>
                                <p class='country-title'>${v.name.common}</p>
                                <p class='country-population'>Population: ${v.population}</p>
                                <p class='country-capital'>Capital: ${v.capital}</p>
                            </div>`;
  });
});

const search = () => {
  if (searchElement.value.length > 0) {
    console.log(search.value);
    mapCountries
      .filter((v) => v.includes(search.value))
      .map((v, i) => {
        itemContainer.innerHTML += `<div class='item' id='item'>
                                            <img class='country-flag' src=${v.flags.png} alt=${v.flags.alt}/>
                                            <p class='country-title'>${v.name.common}</p>
                                            <p class='country-population'>Population: ${v.population}</p>
                                            <p class='country-capital'>Capital: ${v.capital}</p>
                                        </div>`;
      });
  }
};
