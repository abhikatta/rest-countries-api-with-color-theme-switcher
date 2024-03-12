const params = new URLSearchParams(window.location.search);
const country = params.get("country");

const URL = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,region,flags,nativeName,languages,tld,currencies`;

let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;

const showItem = (v) => {
  const itemContainerElement = document.getElementById("item-container");
  //   main div:
  //   the first vertical row:
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
  let detailedTitleText = document.createTextNode(v.name.common);
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
  let detailedNativeNameString = "";
  detailedNativeName.className = "country-nativename-detailed";
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
  detailedTopLevelDomain.className = "country-topleveldomain-detailed";
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
  detailedCurrencies.className = "country-currencies-detailed";
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
  detailedLanguages.className = "country-currencies-detailed";
  let detailedLanguagesText = document.createTextNode(
    `Languages: ${languagesString || "Unknown"}`
  );
  detailedLanguages.appendChild(detailedLanguagesText);
  // back button
  let backButton = document.createElement("button");
  backButton.className = "back-button";
  backButton.id = "back-button";

  let backButtonText = document.createTextNode("Back");
  backButton.appendChild(backButtonText);
  backButton.addEventListener("click", () => {
    location.href = window.location.origin;
  });
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

  itemContainerElement.append(detailedDiv);
};

const fetchCountryData = async () => {
  const response = await fetch(URL);
  countryData = await response.json();
};

const renderDetailedView = async () => {
  try {
    await fetchCountryData();
    showItem(countryData[0]);
  } catch (error) {
    console.error(error);
  }
};
window.addEventListener("load", renderDetailedView);
