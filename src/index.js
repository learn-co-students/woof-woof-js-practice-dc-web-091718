document.addEventListener('DOMContentLoaded',       function(){

    getAllPups()

    }
);

  function getAllPups(){
    fetch('http://localhost:3000/pups')
      .then(response => response.json())
        .then(pups => {
          pups.forEach(pup => {render(pup)})
        })
  }

  function render(pup){

    let dogBar = document.getElementById('dog-bar')
    let pupSpan = document.createElement('span')
      dogBar.appendChild(pupSpan)
      pupSpan.innerHTML = pup.name
      pupSpan.addEventListener('click',function(){
      renderInfo(pup)
    })
  }

  function renderInfo(pup){
    let dogInfo = document.createElement('div')
      dogInfo.setAttribute('id','dog-info')
      let grabDogInfo = document.getElementById('dog-info')

        grabDogInfo.appendChild(dogInfo)
        let pupImage = document.createElement('img')
          dogInfo.appendChild(pupImage)
          pupImage.src = pup.image
          let pupName = document.createElement('h2')
            dogInfo.appendChild(pupName)
            pupName.innerHTML = pup.name
            let goodOrBad = document.createElement('button')
              goodOrBad.setAttribute('id','switch')
              dogInfo.appendChild(goodOrBad)
              goodOrBad.innerHTML = pup.isGoodDog
                if (goodOrBad.innerHTML === 'true'){
                goodOrBad.innerHTML = "Good Dog!"
                }
                else {
                  goodOrBad.innerHTML = "Bad Dog!"
                }
              goodOrBad.addEventListener('click', function(){
                toggleButton(pup)
              })
  }

  function toggleButton(pup){

        statusSwitchpup = pup.isGoodDog
      var showSwitch = document.getElementById('switch')
        if (statusSwitchpup === false){

        showSwitch.innerHTML = "Good Dog!"
        pup.isGoodDog = true
        }
        else {

          showSwitch.innerHTML = "Bad Dog!"
          pup.isGoodDog = false
        }
        patchPuppy(pup)
  }
  function patchPuppy(pup){
    
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({isGoodDog:pup.isGoodDog}),
    })

    .then(response => response.json()) // parses response to JSON



  }
