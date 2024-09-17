let currentId = 1;

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        return null;
    }
}

function updateBackground(type) {
    const body = document.body;
    switch (type) {
        case 'fire':
            body.style.backgroundColor = '#FF0000';
            break;
        case 'water':
            body.style.backgroundColor = '#0000FF';
            break;
        case 'grass':
            body.style.backgroundColor = '#059405';
            break;
        case 'electric':
            body.style.backgroundColor = '#0079a8'; 
            break;
        case 'bug':
            body.style.backgroundColor = '#85ffb6'; 
            break;
        default:
            body.style.backgroundColor = '#ffffff';
            break;
    }
}

async function updatePokemon(id) {
    const pokemon = await fetchPokemon(id);
    if (pokemon) {
        document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
        document.getElementById('pokemon-name').textContent = pokemon.name;
        updateBackground(pokemon.types[0].type.name); 
    }
}


function changePokemon(amount) {
    currentId += amount;
    if (currentId < 1) currentId = 1;
    updatePokemon(currentId);
}

function showPokemonById() {
    const id = parseInt(document.getElementById('pokemon-id').value);
    if (!isNaN(id) && id > 0) {
        currentId = id;
        updatePokemon(currentId);
    }
}

updatePokemon(currentId);

document.getElementById('prev-btn').addEventListener('click', () => changePokemon(-1));
document.getElementById('next-btn').addEventListener('click', () => changePokemon(1));
document.getElementById('search-btn').addEventListener('click', showPokemonById);
document.getElementById('pokemon-id').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        showPokemonById();
    }
});
