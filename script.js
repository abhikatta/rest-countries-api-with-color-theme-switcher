// elements:
const itemContainerElement = document.getElementById("item-container");
const searchElement = document.getElementById("search");
const filterElement = document.getElementById("filter");

// theme-related:
const button = document.getElementById("back-button");
const body = document.body;
const nav = document.querySelector("nav");
const select = document.querySelector("select");
const option = document.querySelector("option");
const darkModeButton = document.getElementById("darkmode-button");
let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;

// API endpoint
const filteredEndpoint =
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags";

let countriesData = JSON.parse(localStorage.getItem("countriesData")) || [];
let mapCountries = JSON.parse(JSON.stringify(countriesData));

const showItem = (v) => {
  const newUrl = `/detail/country.html?country=${v.name.common}`;
  window.location.href = newUrl;
};

const fetchData = async () => {
  if (!localStorage.getItem("countriesData")) {
    const response = await fetch(filteredEndpoint);

    const data = await response.json();

    countriesData = data;
    localStorage.setItem("countriesData", JSON.stringify(data));
    location.reload();
  } else {
    return;
  }
};

const buildCountryComponents = (countries) => {
  return countries.map((country) => {
    // main div
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.id = "item";
    itemDiv.addEventListener("click", () => showItem(country));

    // flag
    let flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = country.flags.alt;

    // title
    let title = document.createElement("p");
    title.className = "country-title";
    let titleText = document.createTextNode(country.name.common);
    title.appendChild(titleText);

    // population
    let population = document.createElement("p");
    population.className = "country-population";
    let populationText = document.createTextNode(
      `Population: ${country.population || "Unknown"}`
    );
    population.appendChild(populationText);

    // region
    let region = document.createElement("p");
    region.className = "country-region";
    let regionText = document.createTextNode(
      `Region: ${country.region || "Unknown"}`
    );
    region.appendChild(regionText);

    // capital
    let capital = document.createElement("p");
    capital.className = "country-capital";
    let capitalText = document.createTextNode(
      `Capital: ${country.capital || "Unknown"}`
    );
    capital.appendChild(capitalText);

    // dark mode:
    if (isDarkMode) {
      itemDiv.classList.add("darkMode-item");
      searchElement.classList.add("darkMode-item");
    } else {
      itemDiv.classList.remove("darkMode-item");
      searchElement.classList.remove("darkMode-item");
    }

    // appending all together:
    itemDiv.append(flag, title, population, region, capital);
    return itemDiv;
  });
};
const renderCountryDetails = () => {
  const searchValue = searchElement.value;
  const filterValue = filterElement.value;

  fetchData();
  // basically this line replaces every child with 'null' when coming back from detailed view
  itemContainerElement.replaceChildren();
  let countryComponents;
  // this looks for any input in the search input element and if there is any value in search, it
  // will render a list of filtered data of that search input value, else the whole list
  if (!searchValue) {
    countryComponents = buildCountryComponents(mapCountries);
  }
  if (searchValue) {
    let newMapCountries = mapCountries.filter((mapCountry) =>
      mapCountry.name.common
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim())
    );
    countryComponents = buildCountryComponents(newMapCountries);
  }
  if (filterValue && filterValue !== "Filter by Region") {
    let newMapCountries;
    if (searchValue) {
      newMapCountries = mapCountries.filter(
        (mapCountry) =>
          mapCountry.region
            .toLowerCase()
            .trim()
            .includes(filterValue.toLowerCase().trim()) &&
          mapCountry.name.common
            .toLowerCase()
            .trim()
            .includes(searchValue.toLowerCase().trim())
      );
    } else {
      newMapCountries = newMapCountries = mapCountries.filter((mapCountry) =>
        mapCountry.region
          .toLowerCase()
          .trim()
          .includes(filterValue.toLowerCase().trim())
      );
    }
    countryComponents = buildCountryComponents(newMapCountries);
  }
  // appending each country component to item container
  countryComponents.map((country) => {
    itemContainerElement.append(country);
  });
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
const search = () => {
  const searchValue = searchElement.value;
  mapCountries = countriesData;
  mapCountries = mapCountries.filter((mapCountry) =>
    mapCountry.name.common
      .toLowerCase()
      .trim()
      .includes(searchValue.toLowerCase().trim())
  );

  renderCountryDetails();
};

const filter = () => {
  const filterValue = filterElement.value;
  mapCountries = countriesData;
  mapCountries = mapCountries.filter((mapCountry) => {
    return mapCountry.region
      .toLowerCase()
      .trim()
      .includes(filterValue.toLowerCase());
  });

  renderCountryDetails();
};

window.addEventListener("load", () => {
  renderCountryDetails();
  checkDarkmode();
});
