// This is a JavaScript program that creates a list of Pokémon and displays them on a webpage.
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Add a new Pokémon to the list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Returns all pokemon
    function getAll() {
        return pokemonList;
    }

    // Adds a Pokémon to the unordered list in the HTML
    function addListItem(pokemon) {
        // Pulls unordered list
        let pokemonListElement = document.querySelector('.pokemon-list');
        
        // Creates li element for list
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // Create Bootstrap button
        let button = document.createElement('button');
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add('btn', 'btn-primary', 'btn-block', 'text-truncate');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('aria-label', `Show details for ${pokemon.name}`);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    // Displays details of a Pokémon in a modal
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    // Fetches the list of Pokémon from the API
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
  
    // Fetches details of a Pokémon from the API
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // Bootstrap modal display
    function showModal(pokemon) {
        $('#exampleModalLabel').text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
        $('.modal-body').html(`
            <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="img-fluid mx-auto d-block mb-3" style="max-width:150px;">
            <ul class="list-group">
                <li class="list-group-item"><strong>Height:</strong> ${pokemon.height}</li>
                <li class="list-group-item"><strong>Weight:</strong> ${pokemon.weight}</li>
                <li class="list-group-item"><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</li>
                <li class="list-group-item"><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</li>
            </ul>
        `);
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem
    };
})();

// Initializes the Pokémon repository and adds each Pokémon to the list
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});