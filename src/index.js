const FETCH_URL = "http://localhost:3000/pups"

function dogBar() {
  return document.querySelector("#dog-bar")
}

function goFetch(isGoodDog=null) {
  fetch(FETCH_URL)
    .then(response => response.json())
    .then(dogs => filterDogs(dogs, isGoodDog))
}

function filterDogs(dogs, isGoodDog) {
  if(isGoodDog) {
    renderDogs(dogs.filter(dog => dog.isGoodDog))
  } else {
    renderDogs(dogs)
  }
}

function clearDogNav() {
  document.querySelector("#dog-bar").innerHTML = "<div id='dog-bar'></div>"
}

function renderDogs(dogs) {
  clearDogNav()

  for(const dog of dogs) {
    dogBar().appendChild(buildDogBarEntryFor(dog));
  } 
}

function buildDogBarEntryFor(dog) {
  let thisDog = document.createElement('span')
  thisDog.innerText = dog.name
  thisDog.addEventListener('click', showDog.bind(dog))
  return thisDog
}

function dogInfoDiv() {
  return document.querySelector("#dog-info")
}

function clearDogDiv() {
  dogInfoDiv().innerHTML = "<div id='dog-info'></div>"
}

function toggleGoodDog(event) {
  fetch(FETCH_URL + `/${this.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: this.id, isGoodDog: !this.isGoodDog})
  })
    .then(response => response.json())
    .then(dogData => {
      showDog.call(dogData)
    })
}

function showDog(dogData) {
  clearDogDiv()

  let image = document.createElement('img')
  image.src = this.image

  let name = document.createElement('h2')
  name.innerText = this.name

  let button = document.createElement('button')
  button.id = "good-dog-btn"
  button.innerText = (this.isGoodDog ? "Good Dog!" : "Bad Dog!")
  button.addEventListener('click', toggleGoodDog.bind(this))

  dogInfoDiv().appendChild(image)
  dogInfoDiv().appendChild(name)
  dogInfoDiv().appendChild(button)
}

function onFilterClick(event) {
  if (event.target.innerText === "Filter good dogs: OFF") {
    event.target.innerText = "Filter good dogs: ON"
    goFetch(true)
  } else {
    event.target.innerText = "Filter good dogs: OFF"
    goFetch(false)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  goFetch();
  document.querySelector("#good-dog-filter").addEventListener('click', onFilterClick)
})


