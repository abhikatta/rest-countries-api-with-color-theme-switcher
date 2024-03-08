// elements:
const itemContainerElement = document.getElementById("item-container");
const searchElement = document.getElementById("search");
// theme-related:
const darkModeButton = document.getElementById("darkmode-button");
const body = document.body;
const item = document.getElementById("item");

// var req = new XMLHttpRequest();

// as of now, not using this due to design requirements and changes in
// latest api format of rest-countries:
// const URL = "https://restcountries.com/v3.1/all";

const LOCAL_JSON_DATA_FILE = "./data.json";
let countriesData = JSON.parse(localStorage.getItem("countriesData")) || [];
let mapCountries = countriesData;
const renderCountryDetails = () => {
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
    .catch((error) => {
      body.innerHTML += "<h1>Something Went Wrong</h1>";
      console.log(error);
    });
  let countryComponents = mapCountries.map((v, i) => {
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.id = "item";

    let flag = document.createElement("img");
    flag.src = v.flags.png;
    flag.alt = v.flags.alt;

    let title = document.createElement("p");
    title.className = "country-title";
    let titleText = document.createTextNode(v.name);
    title.appendChild(titleText);

    let population = document.createElement("p");
    population.className = "country-population";
    let populationText = document.createTextNode(v.population);
    population.appendChild(populationText);

    let capital = document.createElement("p");
    capital.className = "country-capital";
    let capitalText = document.createTextNode(v.capital);
    capital.appendChild(capitalText);

    itemDiv.append(flag, title, population, capital);
    return itemDiv;

    // itemContainerElement.innerHTML += ` <div class='item' key=${i} id='item'>
    //                                       <img  src=${v.flags.png} alt=${v.flags.alt}/>
    //                                       <p class='country-title'>${v.name}</p>
    //                                       <p class='country-population'>Population: ${v.population}</p>
    //                                       <p class='country-capital'>Capital: ${v.capital}</p>
    //                                     </div>`;
  });
  countryComponents.map((v) => itemContainerElement.append(v));
};
// event listeners:
window.addEventListener("load", renderCountryDetails);

darkModeButton.addEventListener("click", () => {
  console.log("dark mode button pressed");
});
