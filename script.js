// elements:
const itemContainerElement = document.getElementById("item-container");
const searchElement = document.getElementById("search");
const filterElement = document.getElementById("filter");

// theme-related:
const darkModeButton = document.getElementById("darkmode-button");
const body = document.body;
let isDarkMode = false;

// API endpoint
// const URL = "https://restcountries.com/v3.1/all";
const filteredEndpoint =
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags";

let countriesData = JSON.parse(localStorage.getItem("countriesData")) || [];
let mapCountries = countriesData;

const showItem = (v) => {
  const newUrl = `/detail/country.html?country=${v.name.common}`;
  window.location.href = newUrl;
};

const fetchData = async () => {
  if (!localStorage.getItem("countriesData")) {
    const response = await fetch(filteredEndpoint);

    const data = await response.json();
    console.log(data);
    countriesData = data;
    localStorage.setItem("countriesData", JSON.stringify(data));
    location.reload();
  } else {
    return;
  }
};
const renderCountryDetails = () => {
  fetchData();

  // basically this line replaces every child with 'null' when coming back from detailed view
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
    let titleText = document.createTextNode(v.name.common);
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

    // dark mode:
    if (isDarkMode) {
      itemDiv.classList.add("darkMode-item");
    }

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

const darkMode = () => {
  const items = document.querySelectorAll(".item");
  const button = document.getElementById("back-button");
  const body = document.body;
  const nav = document.querySelector("nav");
  const select = document.querySelector("select");
  const option = document.querySelector("option");
  const searchInput = document.getElementById("search");
  const darkModeButton = document.getElementById("darkmode-button");
  if (isDarkMode) {
    isDarkMode = false;
  } else if (!isDarkMode) {
    isDarkMode = true;
  }

  if (isDarkMode) {
    items.forEach((item) => {
      item.classList.add("darkMode-item");
    });
    nav.classList.add("darkMode-item");
    darkModeButton.classList.add("darkMode-item");

    select.classList.add("darkMode-item");
    if (button) {
      button.classList.add("darkMode-item");
    }
    option.classList.add("darkMode-item");

    searchInput.classList.add("darkMode-item");
    body.classList.add("darkMode-bg");
  } else if (!isDarkMode) {
    items.forEach((item) => {
      item.classList.remove("darkMode-item");
    });
    nav.classList.remove("darkMode-item");
    darkModeButton.classList.remove("darkMode-item");

    select.classList.remove("darkMode-item");
    if (button) {
      button.classList.remove("darkMode-item");
    }
    option.classList.remove("darkMode-item");

    searchInput.classList.remove("darkMode-item");
    body.classList.remove("darkMode-bg");
  }
};
const search = () => {
  const searchValue = searchElement.value;

  mapCountries = countriesData;

  mapCountries = mapCountries.filter((v) =>
    v.name.common
      .toLowerCase()
      .trim()
      .includes(searchValue.toLowerCase().trim())
  );

  renderCountryDetails();
};

const filter = () => {
  const filterValue = filterElement.value;

  mapCountries = countriesData;
  mapCountries = mapCountries.filter((v) => {
    return v.region.toLowerCase().trim().includes(filterValue.toLowerCase());
  });

  renderCountryDetails();
};
