const main = document.getElementById("main");
const URL = "https://restcountries.com/v3.1/all";
const LOCAL_JSON_DATA_FILE = "./data.json";
var req = new XMLHttpRequest();
var allData;
window.addEventListener("load", async () => {
  req.open("GET", URL);
  req.onload = function () {
    if (this.status === 200) {
      //   console.log(this.responseText);
      allData = JSON.parse(this.responseText);
      console.log(allData);
      main.textContent = JSON.stringify(allData);
    }
  };
  req.send();
});
