// elements:
const itemContainerElement = document.getElementById("item-container");
const searchElement = document.getElementById("search");
const filterElement = document.getElementById("filter");
// theme-related:
const darkModeButton = document.getElementById("darkmode-button");
const body = document.body;
let isDarkMode = false;
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

  // so layout needs multiple rows and columns layouts inside :
  // first vertical row with (button+main div) [done]
  // main div= row (flag+data) []
  // main data div= column (title+data+?bordercountries)
  // data div=grid(4rowsx2columns with data)

  // main div:
  // the first vertical row:
  let detailedDiv = document.createElement("div");
  detailedDiv.className = "item-detailed";

  // main div:
  // has flag + data (row)
  let mainDivDetailed = document.createElement("div");
  mainDivDetailed.className = "main-div-detailed";

  // main data div:
  // data ( column of 3 rows)
  let mainDataDivDetailed = document.createElement("div");
  mainDataDivDetailed.className = "main-data-div-detailed";

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

  // grid of 2 columns and 4 rows holding data
  let dataDivDetailed = document.createElement("div");
  dataDivDetailed.className = "data-div-detailed";

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
  detailedCapital.appendChild(detailedCapitalText);

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
  detailedLanguages.appendChild(detailedLanguagesText);

  // back button
  let backButton = document.createElement("button");
  backButton.className = "back-button";
  let backButtonText = document.createTextNode("Back");
  backButton.appendChild(backButtonText);
  backButton.addEventListener("click", () => {
    renderCountryDetails();
    // itemContainerElement.remove(detailedDiv);
  });

  // append all to main div
  // detailedDiv.append(
  //   backButton,
  //   detailedFlag,
  //   detailedTitle,
  //   detailedNativeName,
  //   detailedPopulation,
  //   detailedRegion,
  //   detailedSubRegion,
  //   detailedCapital,
  //   detailedTopLevelDomain,
  //   detailedCurrencies,
  //   detailedLanguages
  // );

  // appending elements according to layout:
  detailedDiv.append(backButton, mainDivDetailed);
  mainDivDetailed.append(detailedFlag, mainDataDivDetailed);
  mainDataDivDetailed.append(detailedTitle, dataDivDetailed);
  dataDivDetailed.append(
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
  // when coming back from detailed view
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
if (isDarkMode) {
  items.forEach((item) => {
    item.classList.toggle("darkMode-item");
  });
  button.forEach((button) => {
    button.classList.toggle("darkMode-item");
  });
  console.log("dark mode button pressed", body.classList);

  body.classList.toggle("darkMode-bg");
  console.log("dark mode button pressed", body.classList);
}
// event listeners:
window.addEventListener("load", renderCountryDetails);

const darkMode = () => {
  const items = document.querySelectorAll(".item");

  const button = document.querySelectorAll("button");
  isDarkMode = true;
  if (isDarkMode) {
    items.forEach((item) => {
      item.classList.toggle("darkMode-item");
    });
    button.forEach((button) => {
      button.classList.toggle("darkMode-item");
    });
    console.log("dark mode button pressed", body.classList);

    body.classList.toggle("darkMode-bg");
    console.log("dark mode button pressed", body.classList);
  }
};
const search = () => {
  const searchValue = searchElement.value;
  console.log(searchValue);
  mapCountries = countriesData;

  mapCountries = mapCountries.filter((v) =>
    v.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())
  );

  renderCountryDetails();
};

const filter = () => {
  const filterValue = filterElement.value;
  console.log(filterValue.toLowerCase().trim());
  mapCountries = countriesData;
  mapCountries = mapCountries.filter((v) => {
    return v.region.toLowerCase().trim().includes(filterValue.toLowerCase());
  });

  renderCountryDetails();
};
