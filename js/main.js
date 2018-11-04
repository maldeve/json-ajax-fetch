let animalContainer = document.getElementById("animal-info");
let btn = document.getElementById("btn");
let pageCounter = 1;

btn.addEventListener("click", function() {
  let ourRequest = new XMLHttpRequest();
  ourRequest.open(
    "GET",
    "https://learnwebcode.github.io/json-example/animals-" +
      pageCounter +
      ".json"
  );
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      let ourData = JSON.parse(ourRequest.responseText);
      renderHtml(ourData);
    } else {
      console.log("Server Error!");
    }
  };

  ourRequest.onerror = function() {
    console.log("Connection error! Check your Internet Connection!");
  };

  ourRequest.send();
  pageCounter++;

  //   hide page after third click
  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHtml(data) {
  let htmlString = "";

  // loop through the json data
  for (var i = 0; i < data.length; i++) {
    htmlString +=
      "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
    for (let ii = 0; ii < data[i].foods.likes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += " and " + data[i].foods.likes[ii];
      }
    }

    htmlString += " and dislikes ";
    for (let ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += " and " + data[i].foods.dislikes[ii];
      }
    }

    htmlString += ".</p>";
  }
  animalContainer.insertAdjacentHTML("beforeend", htmlString);
}
