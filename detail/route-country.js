const params = new URLSearchParams(window.location.search);
const country = params.get("country");
const URL = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
const LOOK_UP_URL = "https://restcountries.com/v3.1/all?fields=name,cca3";
let lookUpData = new Map();

// dark-theme-related
const body = document.body;
const nav = document.querySelector("nav");
const darkModeButton = document.getElementById("darkmode-button");
const itemContainerElement = document.getElementById("item-container");

let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
// let isDarkMode = false;
const fetchLookUpData = async () => {
  try {
    const response = await fetch(LOOK_UP_URL);
    const data = await response.json();
    data.map((lookUpCountry) => {
      lookUpData.set(lookUpCountry.cca3, lookUpCountry.name.common);
    });
    console.log(lookUpData);
  } catch (error) {
    console.log(`something went wrong while fetching lookup data:,${error}`);
  }
};

const borderCountryLookup = (countryItem) => {
  // data in countries.json uses cca2, but borders has cca3 format
  // so using the first 2 letters of v, this finds the object(i.e country) and returns it

  // const country = lookUpData.find((item) => {
  //   return item.cca3 === v;
  // });
  if (lookUpData.has(countryItem)) {
    return lookUpData.get(countryItem);
  } else {
    return null;
  }
  // if (country) {
  //   return country.name.common;
  // } else return null;
};

const showItem = (v) => {
  //   main div:
  //   the first vertical row:
  let detailedDiv = document.createElement("div");
  detailedDiv.className = "item-detailed";
  detailedDiv.id = "main-detailed";

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
  let detailedTitleText = document.createTextNode(v.name.common);
  detailedTitle.appendChild(detailedTitleText);
  // grid of 2 columns and 4 rows holding data
  let dataDivDetailed = document.createElement("div");
  dataDivDetailed.className = "data-div-detailed";
  // population
  let detailedPopulation = document.createElement("p");
  let detailedPopulationText = document.createTextNode(
    `Population: ${v.population || "Unknown"}`
  );
  detailedPopulation.appendChild(detailedPopulationText);
  // region
  let detailedRegion = document.createElement("p");
  let detailedRegionText = document.createTextNode(
    `Region: ${v.region || "Unknown"}`
  );
  detailedRegion.appendChild(detailedRegionText);
  // capital
  let detailedCapital = document.createElement("p");
  let detailedCapitalText = document.createTextNode(
    `Capital: ${v.capital || "Unknown"}`
  );
  detailedCapital.appendChild(detailedCapitalText);
  // sub region
  let detailedSubRegion = document.createElement("p");
  let detailedSubRegionText = document.createTextNode(
    `Sub Region: ${v.subregion || "Unknown"}`
  );
  detailedSubRegion.appendChild(detailedSubRegionText);
  // native name
  let detailedNativeName = document.createElement("p");
  let detailedNativeNameString = "";
  for (const key in v.name.nativeName) {
    const element = v.name.nativeName[key];
    detailedNativeNameString += element.common + ", ";
  }

  let detailedNativeNameText = document.createTextNode(
    `Native Name: ${detailedNativeNameString || "Unknown"}`
  );
  detailedNativeName.appendChild(detailedNativeNameText);
  // top level domain
  let detailedTopLevelDomain = document.createElement("p");
  let topLevelDomainString = "";
  v.tld
    ? v.tld.map((v) => {
        topLevelDomainString += v + ", ";
      })
    : (topLevelDomainString = "Unknown");
  let detailedTopLevelDomainText = document.createTextNode(
    `Top Level Domain: ${topLevelDomainString}`
  );
  detailedTopLevelDomain.appendChild(detailedTopLevelDomainText);
  // currencies
  let detailedCurrencies = document.createElement("p");
  let currenciesString = "";

  for (var key in v.currencies) {
    var val = v.currencies[key].name;
    currenciesString += val + ", ";
  }
  let detailedCurrenciesText = document.createTextNode(
    `Currencies: ${currenciesString}`
  );
  detailedCurrencies.appendChild(detailedCurrenciesText);

  // languages
  let detailedLanguages = document.createElement("p");
  let languagesString = "";
  for (var key in v.languages) {
    var val = v.languages[key];
    languagesString += val + ", ";
  }
  let detailedLanguagesText = document.createTextNode(
    `Languages: ${languagesString || "Unknown"}`
  );
  detailedLanguages.appendChild(detailedLanguagesText);

  // border countries
  let detailedBorderCountriesContainer = document.createElement("div");
  detailedBorderCountriesContainer.className = " border-countries-container";
  let borderCountriesLabel = document.createElement("p");
  borderCountriesLabel.appendChild(
    document.createTextNode("Border Countries: ")
  );
  detailedBorderCountriesContainer.appendChild(borderCountriesLabel);

  // for each border country, the following is :
  // getting the name from borderCountryLookup function
  // creating a p element with on click event listener to go to the clicked country
  // appending them to the container
  let detailedBorderCountries = document.createElement("div");
  detailedBorderCountries.className = "countries-container";
  v.borders
    ? v.borders.map((border) => {
        let detailedBorderCountriesString = borderCountryLookup(border);
        if (detailedBorderCountriesString !== null) {
          let borderCountryComponent = document.createElement("p");
          borderCountryComponent.id = "border-country";
          borderCountryComponent.className = "border-country";

          if (isDarkMode) {
            borderCountryComponent.classList.add("darkMode-item");
          } else if (!isDarkMode) {
            borderCountryComponent.classList.remove("darkMode-item");
          }

          let borderCountryText = document.createTextNode(
            detailedBorderCountriesString
          );
          borderCountryComponent.addEventListener("click", () => {
            const newUrl = `/detail/country.html?country=${detailedBorderCountriesString}`;
            window.location.href = newUrl;
          });
          borderCountryComponent.appendChild(borderCountryText);
          detailedBorderCountries.append(borderCountryComponent);
        }
        detailedBorderCountriesContainer.appendChild(detailedBorderCountries);
      })
    : detailedBorderCountriesContainer.append(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Unknown"))
      );
  // back button
  let backButton = document.createElement("button");
  backButton.className = "back-button";
  backButton.id = "back-button";

  let backButtonText = document.createTextNode("Back");
  backButton.appendChild(backButtonText);
  backButton.addEventListener("click", () => {
    window.history.back();
  });

  if (isDarkMode) {
    body.classList.add("darkMode-bg");
    backButton.classList.add("darkMode-item");
    nav.classList.add("darkMode-item");
    darkModeButton.classList.add("darkMode-bg");
  } else {
    body.classList.remove("darkMode-bg");
    backButton.classList.remove("darkMode-item");
    nav.classList.remove("darkMode-item");
    darkModeButton.classList.remove("darkMode-bg");
  }
  // appending elements according to layout:
  detailedDiv.append(backButton, mainDivDetailed);
  mainDivDetailed.append(detailedFlag, mainDataDivDetailed);
  mainDataDivDetailed.append(
    detailedTitle,
    dataDivDetailed,
    detailedBorderCountriesContainer
  );
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

  itemContainerElement.append(detailedDiv);
};

const fetchCountryData = async () => {
  await fetchLookUpData();

  const response = await fetch(URL);
  countryData = await response.json();
};

const renderDetailedView = async () => {
  try {
    await fetchCountryData();
    countryData.map((v) => showItem(v));
  } catch (error) {
    console.error(error);
  }
};

const checkDarkmode = () => {
  if (isDarkMode) {
    body.classList.add("darkMode");
  } else {
    body.classList.remove("darkMode");
  }
};

const darkMode = () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    body.classList.add("darkMode");
  } else {
    body.classList.remove("darkMode");
  }
  localStorage.setItem("isDarkMode", isDarkMode);
};
window.addEventListener("load", () => {
  renderDetailedView();
});
