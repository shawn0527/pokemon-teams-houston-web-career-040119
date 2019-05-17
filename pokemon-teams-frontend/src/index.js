const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', function(){
    renderAll()
})

function renderAll() {
    let mainTag = document.querySelector('main')
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainerObj => {
        mainTag.innerHTML = renderAllTrainers(trainerObj)
        addPokemon()
        releasePokemon()
    })    
}

function renderAllTrainers(trainerArray){
    return trainerArray.map(renderSingleTrainer).join('')
}

function renderSingleTrainer(trainer) {
    let pokemons = renderAllPokemon(trainer)
    return (`
    <div class="trainer-card">
        <h3>${trainer.name}</h3>
        <button data-id="${trainer.id}" data-action="addPokemon" class="add_pokemon_button">Add Pokemon</button>
        <ul class="pokemons" id="trainer_id_${trainer.id}">
            ${pokemons}
        </ul>
    </div>`)
}

function renderAllPokemon(trainer){
    return trainer.pokemons.map(renderSinglePokemon).join('')
}

function renderSinglePokemon(pokemon){
    return (`
    <li id="${pokemon.id}">${pokemon.nickname}(${pokemon.species}) <button data-id="${pokemon.id}" data-action="releasePokemon" class="release_pokemon_button">Relase</button></li>
    `)
}

function addPokemon() {
    let buttons = document.querySelectorAll('.add_pokemon_button')
    buttons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.preventDefault()
            let id = e.target.dataset.id
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": `${id}`
                })
            })
            .then( () => {
                renderAll()    
            })
        })
    })
}

function releasePokemon() {
    let releaseButtons = document.querySelectorAll('.release_pokemon_button')
    releaseButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.preventDefault()
            let pokemon_id = e.target.dataset.id
            fetch(`${POKEMONS_URL}/${pokemon_id}`, {
                method: 'DELETE',
            })
            .then( () => {
                renderAll()
            })
        })
    })
}