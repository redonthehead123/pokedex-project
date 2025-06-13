// This is a JavaScript program that creates a list of Pokémon and displays them on a webpage.
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    // Add a new Pokémon to the list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Returns all pokemon
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
        showModal(
          pokemon.name,
          'Height: ' + pokemon.height + ', Types: ' + pokemon.types.map(type => type.type.name).join(', '),
          pokemon.imageUrl
        );
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showModal(title, text, imageUrl) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';
    
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
    
        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        // Create and append the Pokémon image if imageUrl is provided
        if (imageUrl) {
          let imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = title;
          imgElement.style.display = 'block';
          imgElement.style.margin = '0 auto 16px auto';
          imgElement.style.maxWidth = '150px';
          modal.appendChild(imgElement);
        }

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
    
        modalContainer.classList.add('is-visible');
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
    }
    
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    
  window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
        }
    });

    // Keys to penetrate the IIFE
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
    };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});