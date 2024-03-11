const LOCAL_JSON_DATA_FILE = "./data.json";
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
fetchData();
