// This is a JavaScript program that creates a list of Pokémon and displays them on a webpage.
let pokemonRepository = (function () {
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

    //Add a new Pokémon to the list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    //returns all pokemon
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        // Pulls unordered list
        let pokemonList = document.querySelector('.pokemon-list');
        // Creates li element for list
        let listpokemon = document.createElement('li');
        // Creates a button for each Pokémon, sets the text and adds a class
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class')
        // Displays the buuton
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        // Adds an event listener to the button
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //Keys to penetrate the IIFE
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

// Uses a variable to ensure only one Pokémon gets the "Wow, that's big!" label
let bigLabelGiven = false; // Tracks if the label has been used

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});