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

const showItem = (v) => {
  console.log("item clicked", v);
  // create a new detailed div component with:
  // back button -top left
  // flag big - left center
  // countryname - right big
  // 2cols x nrows grid :
  // native name    top level domain
  // population     currencies
  // region         languages
  // sub region
  // capital
  // bottom of grid:
  // Border countries (each in button/box)
  let detailedDiv = document.createElement("div");
  detailedDiv.className = "item-detailed";
  // flag
  let detailedFlag = document.createElement("img");
  detailedFlag.className = "flag-detailed";
  detailedFlag.src = v.flags.png;
  detailedFlag.alt = v.flags.alt;
  // title
  let detailedTitle = document.createElement("p");
  detailedTitle.className = "country-title-detailed";
  let detailedTitleText = document.createTextNode(v.name);
  detailedTitle.appendChild(detailedTitleText);
  //
  //
  // population
  let detailedPopulation = document.createElement("p");
  detailedPopulation.className = "country-population-detailed";
  let detailedPopulationText = document.createTextNode(
    `Population: ${v.population || "Unknown"}`
  );
  detailedPopulation.appendChild(detailedPopulationText);

  // region
  let detailedRegion = document.createElement("p");
  detailedRegion.className = "country-region-detailed";
  let detailedRegionText = document.createTextNode(
    `Region: ${v.region || "Unknown"}`
  );
  detailedRegion.appendChild(detailedRegionText);

  // capital
  let detailedCapital = document.createElement("p");
  detailedCapital.className = "country-capital-detailed";
  let detailedCapitalText = document.createTextNode(
    `Capital: ${v.capital || "Unknown"}`
  );
  // appendall to main div
  detailedDiv.append(
    detailedFlag,
    detailedCapital,
    detailedPopulation,
    detailedRegion,
    detailedTitle
  );
  // append main div to item-container and render :)
  detailedCapital.appendChild(detailedCapitalText);
  itemContainerElement.replaceChildren(detailedDiv);
  console.log(itemContainerElement);
};

const fetchData = () => {
  console.log("function fetchData ran");
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
};
const renderCountryDetails = () => {
  fetchData();
  let countryComponents = mapCountries.map((v, i) => {
    // main div
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.id = "item";
    itemDiv.addEventListener("click", () => showItem(v));

    // flag
    let flag = document.createElement("img");
    flag.src = v.flags.png;
    flag.alt = v.flags.alt;

    // title
    let title = document.createElement("p");
    title.className = "country-title";
    let titleText = document.createTextNode(v.name);
    title.appendChild(titleText);

    // population
    let population = document.createElement("p");
    population.className = "country-population";
    let populationText = document.createTextNode(
      `Population: ${v.population || "Unknown"}`
    );
    population.appendChild(populationText);

    // region
    let region = document.createElement("p");
    region.className = "country-region";
    let regionText = document.createTextNode(
      `Region: ${v.region || "Unknown"}`
    );
    region.appendChild(regionText);

    // capital
    let capital = document.createElement("p");
    capital.className = "country-capital";
    let capitalText = document.createTextNode(
      `Capital: ${v.capital || "Unknown"}`
    );
    capital.appendChild(capitalText);

    // appending all together:
    itemDiv.append(flag, title, population, region, capital);
    return itemDiv;
  });
  // appending each country component to item container
  countryComponents.map((v) => {
    itemContainerElement.append(v);
  });
};

// event listeners:
window.addEventListener("load", renderCountryDetails);

darkModeButton.addEventListener("click", () => {
  console.log("dark mode button pressed");
});
const search = () => {
  const searchValue = searchElement.value;
  console.log(searchValue);
};
