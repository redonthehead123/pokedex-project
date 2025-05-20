// This is a JavaScript program that creates a list of Pokémon and displays them on a webpage.
let pokemonList = [
    {
        name: 'Bulbasaur', 
        height: 0.7, 
        types: ['grass', 'poison']
    },
    {
        name: 'Charmander', 
        height: 0.6, 
        types: ['fire']
    },
    {
        name: 'Squirtle', 
        height: 0.5, 
        types: ['water']
    },
    {
        name: 'Caterpie', 
        height: 0.3, 
        types: ['bug']
    },
    {
        name: 'Weedle', 
        height: 0.3, 
        types: ['bug', 'poison']
    },
    {
        name: 'Pidgey', 
        height: 0.3, 
        types: ['normal', 'flying']
    },
];

// Create a container for all Pokémon cards
let container = document.createElement('div');
container.className = 'pokemon-container';
document.body.appendChild(container);

// Uses a variable to ensure only one Pokémon gets the "Wow, that's big!" label
let bigLabelGiven = false; // Tracks if the label has been used

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];

    // Determine the main type for coloring (uses the first type)
    let mainType = pokemon.types[0];

    // Build the card element
    let card = document.createElement('div');
    card.className = 'pokemon-card type-' + mainType;

    // Pokémon name
    let nameHTML = `<strong>${pokemon.name}</strong>`;

    // Special highlight for Charmander
    if (pokemon.name === 'Charmander') {
        nameHTML += `<span class="special-highlight">(Special!)</span>`;
    }

    // Height and "Wow, that's big!" label
    let heightHTML = ` (height: ${pokemon.height}m)`;
    if (pokemon.height > 0.6 && !bigLabelGiven) {
        heightHTML += `<span class="big-label">Wow, that’s big!</span>`;
        bigLabelGiven = true;
    }

    // Types display
    let typesHTML = `<div>Type: ${pokemon.types.join(', ')}</div>`;
    // Set card HTML
    card.innerHTML = `${nameHTML}${heightHTML}${typesHTML}`;
    // Add card to container
    container.appendChild(card);
}