/**
 * Get pokemon Data. (Example)
 */
const fetchPokemon = () => {
    const pokeInput = document.getElementById("pokeInput");
    let pokeIName = pokeInput.value.toLowerCase();
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokeIName}`;
    const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokeIName}`;

    fetch(urlPokemon).then((res) => {
        console.log("res");
        console.log(res);
        if (res.status != "200") {
            pokeImage("./Assets/pokeball.png"); // **CAMBIAR POR UN RESET();**
        } else {
            return res.json();
        }
    }).then((data) => {
        console.log("DATA1");
        console.log(data);

        pokeInfo(data);
        fetchUrl(urlSpecies);
    })
}

async function fetchGrid() {
    console.log("FetchGrid")
    for (let i = 1; i <= 898; i++) {

        const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${i}`;

        const res = await fetch(urlPokemon);
        const data = await res.json();

        let name = data.name;
        let ID = data.id;
        let img = data.sprites.other["official-artwork"].front_default;

        gridPokemon(ID, name, img);

        /*fetch(urlPokemon).then((res) => {
            console.log("res");
            console.log(res);
            if (res.status != "200") {
                pokeImage("./Assets/pokeball.png"); // **CAMBIAR POR UN RESET();**
            } else {
                return res.json();
            }
        }).then((data) => {
            console.log("GridData");
            console.log(data);

        })*/

    }
}

document.addEventListener('DOMContentLoaded', fetchGrid, false);


/**
 * Get pokemon Extra Data.
 * @param {String} urlSpecies Pokemon species url
 */
const fetchUrl = (urlSpecies) => { //pokemon extra Info
    let url = urlSpecies;
    fetch(url).then((res2) => {
        return res2.json();
    }).then((data2) => {
        console.log("DATA2");
        console.log(data2);
        //Pokemon Specie
        let pokeSpecie = data2.genera[7]["genus"];

        //Pokemon Description
        let pokeDesc = "";
        search:
            for (let i = 0; i < data2.flavor_text_entries.length; i++) {
                if (data2.flavor_text_entries[i]["language"]['name'] == 'en'
                    /* &&
                                    (data2.flavor_text_entries[i]["version"]['name'] == 'sword' ||
                                        data2.flavor_text_entries[i]["version"]['name'] == 'firered')*/
                ) {
                    pokeDesc = pokeDesc + data2.flavor_text_entries[i]["flavor_text"].replaceAll('\n', ' ').replaceAll('', ' ').replaceAll('é', 'E');
                    break;
                }
            }
        pokeExtraInfo(pokeSpecie, pokeDesc);
    })
}

const fetchMoveType = (urlMove, div) => {

    fetch(urlMove).then((res3) => {
        return res3.json();
    }).then((movejson) => {
        type(movejson, div);
    })
}

const type = (move, div) => {
    let mType = move.type.name;

    div.className = 'childMove ' + mType;
}


/**
 * Set the parameters data in the respective tags.
 * @param {Array} data Pokemon data.
 */
const pokeInfo = (data) => {

    let name = data.name;
    let ID = data.id;
    let img = data.sprites.other["official-artwork"].front_default;
    let types = data.types;
    let abilities = data.abilities;
    let moves = data.moves;
    pokemonMoves(moves);


    //Name - ID
    const pokeNameID = document.getElementById("pokeNameID");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    ID = ID.toString().padStart(3, 0);
    pokeNameID.innerText = "#" + ID + " - " + name;

    //Image
    pokeImage(img);

    //Types
    const pokeType1 = document.getElementById("pokeType1");
    let pokeType2 = document.getElementById("pokeType2");

    if (pokeType2 == null) {
        pokeType2 = document.getElementById("empty");
        pokeType2.id = 'pokeType2';
    }

    if (types.length == 2) {
        const type1 = types[0]['type']['name'].toUpperCase();
        const type2 = types[1]['type']['name'].toUpperCase();

        pokeType1.innerText = type1;
        pokeType2.innerText = type2;

        pokeType1.className = type1.toLowerCase();
        pokeType2.className = type2.toLowerCase();
    } else {
        const type1 = types[0]['type']['name'].toUpperCase();
        pokeType1.innerText = type1;
        pokeType2.innerText = "";

        pokeType1.className = type1.toLowerCase();
        pokeType2.id = 'empty';
    }

    //Abilities
    const abilitySlot1 = document.getElementById("slot1");
    const abilitySlot2 = document.getElementById("slot2");
    const abilitySlot3 = document.getElementById("slot3");

    if (abilities.length == 3) { //3 Abilities
        abilitySlot1.innerText = abilities[0]['ability']['name'].toUpperCase().replaceAll('-', ' ');
        abilitySlot2.innerText = abilities[1]['ability']['name'].toUpperCase().replaceAll('-', ' ');
        abilitySlot3.innerText = abilities[2]['ability']['name'].toUpperCase().replaceAll('-', ' ');
        abilitySlot2.className = '';
        abilitySlot3.className = 'special';

    } else if (abilities.length == 2) { //2 Abilities
        abilitySlot1.innerText = abilities[0]['ability']['name'].toUpperCase().replaceAll('-', ' ');

        if (abilities[1]['slot'] == 2) { //Normal Ability
            abilitySlot2.innerText = abilities[1]['ability']['name'].toUpperCase().replaceAll('-', ' ');
            abilitySlot2.className = '';
            abilitySlot3.innerText = "NONE";
            abilitySlot3.className = 'none';
        } else { //Special Ability
            abilitySlot2.innerText = "NONE";
            abilitySlot2.className = 'none';
            abilitySlot3.innerText = abilities[1]['ability']['name'].toUpperCase().replaceAll('-', ' ');
            abilitySlot3.className = 'special';
        }
    } else { //1 Ability
        abilitySlot1.innerText = abilities[0]['ability']['name'].toUpperCase().replaceAll('-', ' ');
        abilitySlot2.innerText = "NONE";
        abilitySlot3.innerText = "NONE";
        abilitySlot2.className = 'none';
        abilitySlot3.className = 'none';
    }

}

const pokeImage = (img) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = img;
}

const gridPokemon = (id, name, img) => { //******************************** */
    pokeGrid = document.getElementById('gridPokemons'); //Grid

    const pokeDiv = document.createElement('div'); //Container
    pokeDiv.className = 'pokemon_sprite';

    const gridId = document.createElement('span'); //text - ID
    gridId.className = 'poke_no';

    const gridName = document.createElement('span'); //text - Name
    gridName.className = 'poke_name';

    const gridSprite = document.createElement('img'); //img - Sprite
    gridSprite.className = 'sprite';

    id = id.toString().padStart(3, 0);
    gridId.innerText = "#" + id;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    gridName.innerText = name;
    gridSprite.src = img;

    pokeGrid.append(pokeDiv);
    pokeDiv.append(gridId);
    pokeDiv.append(gridName);
    pokeDiv.append(gridSprite);

}

const pokeExtraInfo = (specie, desc) => {
    //Specie
    const pokeSpecie = document.getElementById("pokeSpecie");
    pokeSpecie.innerText = specie;

    //Description
    const pokeDesc = document.getElementById("pokeDesc");
    pokeDesc.innerText = desc;

}

const pokemonMoves = (movesArray) => {

    //Filter moves by learn method='level-up' and game version='Firered-leafgreen'
    let movesByLevel = movesArray.map(move => {
        move.version_group_details = move.version_group_details.filter(detail =>
            /*(detail.version_group.name == "sword-shield" || detail.version_group.name == "firered-leafgreen") &&*/
            detail.move_learn_method.name == "level-up");
        return move;
    }).filter(move => move.version_group_details.length).sort((move1, move2) => {
        if (move1.version_group_details[0].level_learned_at < move2.version_group_details[0].level_learned_at) {
            return -1;
        }
        if (move1.version_group_details[0].level_learned_at > move2.version_group_details[0].level_learned_at) {
            return 1;
        }
        return 0;
    })


    const array = [];
    let movesList = document.getElementById("moves");

    while (movesList.firstChild) {
        movesList.removeChild(movesList.firstChild);
    }

    for (let i = 0; i < movesByLevel.length; i++) {
        let lvl = movesByLevel[i].version_group_details[0].level_learned_at;
        let moveName = movesByLevel[i].move.name;
        array[i] = "Lvl " + lvl + ": " + moveName.charAt(0).toUpperCase() + moveName.slice(1).replaceAll('-', ' ');

        url = movesByLevel[i].move.url;

        //console.log("Move: " + i)
        //console.log(array[i] = "Lvl " + lvl + ": " + moveName.charAt(0).toUpperCase() + moveName.slice(1).replaceAll('-', ' '));

        const newDiv = document.createElement('p');
        fetchMoveType(url, newDiv);
        //newDiv.className = 'childMove';

        newDiv.innerHTML = array[i];
        movesList.append(newDiv);
    }
}