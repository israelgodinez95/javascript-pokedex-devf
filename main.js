/*Israel Godinez Bravo. Poyecto Final Modulo: JS Avanzado, DevF, 2023
*/

const pokeImage = document.getElementsByTagName('img')[0]; //Etiqueta HTML para colocar la imagen del pokemon usando despues src

let pokeArray = []; //Array para mostrar el pokemon que estamos viendo actualmente, los 3 anteriores y los 3 siguientes (id y nombre)
pokeArray.push(document.getElementById('pokemon-list-1'));
pokeArray.push(document.getElementById('pokemon-list-2'));
pokeArray.push(document.getElementById('pokemon-list-3'));
pokeArray.push(document.getElementById('pokemon-list-4'));
pokeArray.push(document.getElementById('pokemon-list-5'));
pokeArray.push(document.getElementById('pokemon-list-6'));
pokeArray.push(document.getElementById('pokemon-list-7'));


const pokeName = document.getElementById('pokemon-name');//Obteniendo los elementos html para la interaccion con el usuario y para deplegar informacion
const pokeTypes = document.getElementById('pokemon-type');
const nextPokemon = document.getElementsByClassName('btn-next');
const previousPokemon = document.getElementsByClassName('btn-previous');
const cardDiv = document.getElementsByClassName('card')[0];
const modalDiv = document.getElementsByClassName('modal-dialog')[0];
const weightP = document.getElementById('weight-info');
const movesP = document.getElementById('moves-info');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnA = document.getElementById('btn-a-open');
const btnB = document.getElementById('btn-b-close');
const searchBar = document.getElementsByTagName('span')[0];
const searchBarBody = document.getElementById('pokedex-navbar-body');
const searchContainer = document.getElementsByClassName('search-container')[0];
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("btn-search");

let pokeIndex = 1; //PokeIndex es el numero del pokemon en el que iniciara la pagina
let url = 'https://pokeapi.co/api/v2/pokemon/'; //Url para hacer uso de la funcion fetch 

//Funcion para hacer la peticion y colocar la imagen del pokemon correspondiente en la pagina, ademas del peso y los movimientos en el modal (ocultos)
async function displayPokeImage(index) {
    let newIndex2 = evaluateIndex(index);
    const pokemon = fetch(url + newIndex2)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            pokeImage.src = data.sprites.front_default;
            pokeName.textContent = data.name;
            pokeTypes.textContent = "types: ";
            for (let typeIndex = 0; typeIndex < (data.types).length; typeIndex++) {

                pokeTypes.textContent += (data.types[typeIndex].type).name;
                if (typeIndex + 1 != (data.types).length) {
                    pokeTypes.textContent += '/';
                }
            }

            weightP.textContent = data.weight;
            for (let movesIndex = 0; movesIndex < data.moves.length; movesIndex++) {
                var li = document.createElement('li');
                li.textContent = movesIndex + ': ' + data.moves[movesIndex].move.name;;
                movesP.appendChild(li);
            }


        })
        .catch(error => {
            console.log(error);
        })
}

//Funcion asincrona para desplegar el id y el nombre de un pokemon
async function logPokeInfo(index, position) {
    let newIndex = evaluateIndex(index);
    const pokemon = fetch(url + newIndex)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            position.textContent = data.id + " : " + data.name.toUpperCase();
        })
        .catch(error => {
            console.log(error);
        })
}

// Funcion para que el indice -1 corresponda al pokemon 1010, el -2 al pokemon 1009 y asi sucesivamente
function evaluateIndex(indexE) {
    if (indexE == 0) {
        indexE = 1010;
    }
    if (indexE < 0) {
        indexE * (-1);
        indexE = 1010 + indexE;
    }
    if (indexE > 1010) {
        indexE = indexE - 1010;
    }
    return indexE
}

//Se despliega la imagen del pokemon 1 (pokeIndex=1), y se despliegan los nombres y numeros de los pokemones anteriores y siguientes
displayPokeImage(pokeIndex);
pokeArray.forEach((item, index) => {
    logPokeInfo(pokeIndex - 3 + index, pokeArray[index])
})

//AddEventListener para avanzar al siguiente pokemon (hacia abajo) con los botones right y down del pad
for (let btnNextIndex = 0; btnNextIndex < nextPokemon.length; btnNextIndex++) {
    nextPokemon[btnNextIndex].addEventListener('click', function () {
        modalDiv.classList.add('oculto');
        pokeIndex += 1;
        displayPokeImage(pokeIndex);
        pokeArray.forEach((item, index) => {
            logPokeInfo(pokeIndex - 3 + index, pokeArray[index])
        });
    })
}

//AddEventListener para retroceder al pokemon anterior(hacia arriba) con los botones left y up del pad
for (let btnPreviousIndex = 0; btnPreviousIndex < previousPokemon.length; btnPreviousIndex++) {
    previousPokemon[btnPreviousIndex].addEventListener('click', function () {
        modalDiv.classList.add('oculto');
        pokeIndex -= 1;
        displayPokeImage(pokeIndex);
        pokeArray.forEach((item, index) => {
            logPokeInfo(pokeIndex - 3 + index, pokeArray[index])
        });
    })
}

//AdEventLísteners para mostrar/ocultar el modal que contiene datos de peso y movimientos, agregando y removiendo la clase oculto de css y usando una animacion de 0.5s 
cardDiv.addEventListener(('click'), function () {
    modalDiv.classList.remove('oculto');
})

btnA.addEventListener(('click'), function () {
    modalDiv.classList.remove('oculto');
})
btnB.addEventListener(('click'), function () {
    modalDiv.classList.add('oculto');
})
searchBar.addEventListener(('click'), function () {
    searchBarBody.style.width="250px";
    searchContainer.style.display='flex';
})

//Event Listeners para buscar el pokemon ingresado por el usuario en un input (enter y boton)
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      let searchTerm = searchInput.value.toLowerCase();
        console.log(searchTerm);
        displayPokeImage(searchTerm);
        logPokeInfo(searchTerm, pokeArray[3]);
        
      // console.log("Término de búsqueda:", searchTerm);
      // Realiza otras acciones con el término de búsqueda aquí
      searchBarBody.style.width="50px";
    searchContainer.style.display='none';
    searchInput.value='';
    }
  });

searchButton.addEventListener(('click'), function(event) {
    event.preventDefault();
      let searchTerm = searchInput.value.toLowerCase();
        console.log(searchTerm);
        displayPokeImage(searchTerm);
        logPokeInfo(searchTerm, pokeArray[3]);
        
      // console.log("Término de búsqueda:", searchTerm);
      // Realiza otras acciones con el término de búsqueda aquí
      searchBarBody.style.width="50px";
    searchContainer.style.display='none';
    searchInput.value='';
    
  });

