const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
const max_width = 55;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     <div class="data">
                     <div class="views">
                         <span class="view-stats ${pokemon.type}">Stats</span>
                     </div>
                     <div class="stats">
                         
                         <div>
                         <div class="container">
                         <div>
                             <span>HP</span>
                             <span class="value">${pokemon.hp}</span>
                         </div>
                         <div>
                             <span>ATK</span>
                             <span class="value">${pokemon.atk}</span>
                         </div>
                         <div>
                             <span>DEF</span>
                             <span class="value">${pokemon.def}</span>
                         </div>
                         <div>
                             <span>SATK</span>
                             <span class="value">${pokemon.satk}</span>
                         </div>
                         <div>
                             <span>SDEF</span>
                             <span class="value">${pokemon.sdef}</span>
                         </div>
                         <div>
                             <span>SPD</span>
                             <span class="value">${pokemon.spd}</span>
                         </div>
                     </div>
                         </div>
                     </div>
                     

            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


