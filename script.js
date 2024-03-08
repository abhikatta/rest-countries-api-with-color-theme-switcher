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
  // console.log("item clicked", v);
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

  // sub region
  let detailedSubRegion = document.createElement("p");
  detailedSubRegion.className = "country-subregion-detailed";
  let detailedSubRegionText = document.createTextNode(
    `Sub Region: ${v.subregion || "Unknown"}`
  );
  detailedSubRegion.appendChild(detailedSubRegionText);

  // native name
  let detailedNativeName = document.createElement("p");
  detailedNativeName.className = "country-nativename-detailed";
  let detailedNativeNameText = document.createTextNode(
    `Native Name: ${v.nativeName || "Unknown"}`
  );
  detailedNativeName.appendChild(detailedNativeNameText);

  // top level domain
  let detailedTopLevelDomain = document.createElement("p");
  let topLevelDomainString = "";
  v.topLevelDomain
    ? v.topLevelDomain.map((v, i) => {
        topLevelDomainString += v + ", ";
      })
    : (topLevelDomainString = "Unknown");
  detailedTopLevelDomain.className = "country-topleveldomain-detailed";
  let detailedTopLevelDomainText = document.createTextNode(
    `Top Level Domain: ${topLevelDomainString}`
  );
  detailedTopLevelDomain.appendChild(detailedTopLevelDomainText);

  // currencies
  let detailedCurrencies = document.createElement("p");
  let currenciesString = "";
  v.currencies
    ? v.currencies.map((v, i) => {
        currenciesString += v.name + ", ";
      })
    : (currenciesString = "Unknown");
  detailedCurrencies.className = "country-currencies-detailed";
  let detailedCurrenciesText = document.createTextNode(
    `Currencies: ${currenciesString}`
  );
  detailedCurrencies.appendChild(detailedCurrenciesText);

  // languages
  let detailedLanguages = document.createElement("p");
  let languagesString = "";
  v.languages.map((v, i) => {
    languagesString += v.name + ", ";
  });
  detailedLanguages.className = "country-currencies-detailed";
  let detailedLanguagesText = document.createTextNode(
    `Languages: ${languagesString}`
  );

  // back button
  let backButton = document.createElement("button");
  backButton.className = "back-button";
  let backButtonText = document.createTextNode("Back");
  backButton.appendChild(backButtonText);
  backButton.addEventListener("click", () => {
    renderCountryDetails();
    // itemContainerElement.remove(detailedDiv);
  });
  detailedLanguages.appendChild(detailedLanguagesText);
  // appendall to main div
  detailedDiv.append(
    backButton,
    detailedFlag,
    detailedTitle,
    detailedNativeName,
    detailedPopulation,
    detailedRegion,
    detailedSubRegion,
    detailedCapital,
    detailedTopLevelDomain,
    detailedCurrencies,
    detailedLanguages
  );
  // append main div to item-container and render :)
  detailedCapital.appendChild(detailedCapitalText);
  itemContainerElement.replaceChildren(detailedDiv);
  // console.log(itemContainerElement);
};

const fetchData = () => {
  // console.log("function fetchData ran");
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
        // console.log("fetched data from localStorage");
      }
    })
    .catch((error) => {
      let errorElement = document.createElement("h1");
      errorElement.appendChild(
        document.createTextNode(`Something Went Wrong:\n${error.message}`)
      );
      body.append(errorElement);
      // console.log(error);
    });
};
const renderCountryDetails = () => {
  fetchData();
  // basically this line replaces every child with... nothing and creates all components again :)
  itemContainerElement.replaceChildren();
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
  // console.log("dark mode button pressed");
});
const search = () => {
  const searchValue = searchElement.value;
  // console.log(searchValue);
};
