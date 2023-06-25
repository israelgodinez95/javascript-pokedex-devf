const pokeImage = document.getElementsByTagName('img')[0];

let pokeArray = [];
pokeArray.push(document.getElementById('pokemon-list-1'));
pokeArray.push(document.getElementById('pokemon-list-2'));
pokeArray.push(document.getElementById('pokemon-list-3'));
pokeArray.push(document.getElementById('pokemon-list-4'));
pokeArray.push(document.getElementById('pokemon-list-5'));
pokeArray.push(document.getElementById('pokemon-list-6'));
pokeArray.push(document.getElementById('pokemon-list-7'));

const pokeName = document.getElementById('pokemon-name');
const pokeTypes = document.getElementById('pokemon-type');
const nextPokemon = document.getElementsByClassName('btn-next');
const previousPokemon = document.getElementsByClassName('btn-previous');

let pokeIndex = 1;
let url = 'https://pokeapi.co/api/v2/pokemon/';

async function displayPokeImage(index) {
    if(index ==0){
        index+=(-1);
    }
    if (index < 0) {
        index * (-1);
        index=1011+index;
    }
    if(index > 1010){
        index=index-1010;
    }
    const pokemon = fetch(url + index)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            pokeImage.src = data.sprites.front_default;
            pokeName.textContent = data.name;
            pokeTypes.textContent= "types: ";
            for(let typeIndex=0; typeIndex<(data.types).length ; typeIndex++){

                pokeTypes.textContent += (data.types[typeIndex].type).name ;  
                if(typeIndex+1 != (data.types).length){
                    pokeTypes.textContent+='/'
                }           
            }
            
        })
        .catch(error => {
            console.log(error);
        })
}


async function logPokeInfo(index, position) {
    if(index ==0){
        index+=(-1);
    }
    if (index < 0) {
        index * (-1);
        index=1011+index;
    }
    if(index > 1010){
        index=index-1010;
    }
    const pokemon = fetch(url + index)
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

    displayPokeImage(pokeIndex);
    pokeArray.forEach((item,index) => {
    logPokeInfo(pokeIndex-3+index, pokeArray[index])})

for(let btnNextIndex=0; btnNextIndex<nextPokemon.length; btnNextIndex++){
    nextPokemon[btnNextIndex].addEventListener('click', function(){
    pokeIndex+=1;
    displayPokeImage(pokeIndex);
    pokeArray.forEach((item,index) => {
    logPokeInfo(pokeIndex-3+index, pokeArray[index])
});
})
}

for(let btnPreviousIndex=0; btnPreviousIndex<previousPokemon.length; btnPreviousIndex++){
    previousPokemon[btnPreviousIndex].addEventListener('click', function(){
    pokeIndex-=1;
    displayPokeImage(pokeIndex);
    pokeArray.forEach((item,index) => {
    logPokeInfo(pokeIndex-3+index, pokeArray[index])
});
})
}

