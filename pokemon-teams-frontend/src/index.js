const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL).then(response => response.json())
    .then(json =>{
        createList(json)
    })


    //add pokemon buttons
    main.addEventListener('click', event =>{
        if(event.target.textContent === " Add Pokemon"){
            let trainerId = event.target.dataset.trainerId
            let trainerCard = document.querySelector(`div[data-id= '${trainerId}']`)
            
            if(trainerCard.lastElementChild.childElementCount < 6){
                addPokemon(trainerId)
            }
        }
        
    })

    //release pokemon
    main.addEventListener('click', event => {
        if(event.target.className === "release"){
            let pokeId = event.target.dataset.pokemonId
            releasePokemon(pokeId)
            event.target.parentElement.remove()
        }
    })

})

//helper functions section begins ;)//

//release pokemon ;)
function releasePokemon(pokeId){
    fetch(`POKEMONS_URL/${pokeId}`, {
        method: 'DELETE'
    })
}


//initial render
function render(trainer){
    let card = document.createElement('div')
    card.className = 'card'
    card.dataset.id = trainer.id 
    card.innerHTML = `<p>${trainer.name}</p>
    <button data-trainer-id= ${trainer.id}> Add Pokemon</button>
    <ul></ul>`

    trainer.pokemons.forEach(pokemon =>{
       pokemonList(card, pokemon)
    })
    main.appendChild(card)
}

function createList(trainers){
    trainers.forEach(trainer => {
        render(trainer)
    })
}

//creating new pokemon
function addPokemon(trainerId){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trainer_id: trainerId})
    }).then(response => response.json())
    .then(pokemon => {
        let trainerCard = document.querySelector(`div[data-id= '${trainerId}']`)
        pokemonList(trainerCard, pokemon)
    })
}
//adding pokemon to trainer cards
function pokemonList(card, pokemon){
    let li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
    card.lastElementChild.appendChild(li)
}



