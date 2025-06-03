// This is a JavaScript program that creates a list of Pokémon and displays them on a webpage.
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        let listPokemon = document.createElement('li');
        // Creates a button for each Pokémon, sets the text and adds a class
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class')
        // Displays the buuton
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        // Adds an event listener to the button
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    //Keys to penetrate the IIFE
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
    };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});