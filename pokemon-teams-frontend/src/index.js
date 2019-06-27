const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function getData(url){
    let fetchedData = fetch(url).then(res => {
            return res.json();
        }).then(json => {
            return json;
        });
    return fetchedData;
}

getData(TRAINERS_URL).then(output => {
    mainSpace = document.querySelector(".main");
    for(let i = 0; i < output.length; i++){
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute("data-id", output[i].id);
        let p = document.createElement('p');
        p.innerText = output[i].name;
        card.append(p);
        let button = document.createElement('button');
        button.setAttribute('data-trainer_id', output[i].id);
        button.innerText = "Add Pokemon";
        button.addEventListener('click', function(e){
                getData(POKEMONS_URL).then(res => {
                let randNum = Math.floor(Math.random() * res.length);
                let chosenPokemon = res[randNum];
                let selectedDiv = document.querySelector(`div[data-id="${e.target.dataset.trainer_id}"]`);
                let divUl = selectedDiv.querySelector('.element-ul');
                if(divUl.childElementCount < 6){
                    let li = document.createElement('li');
                li.innerText = chosenPokemon.nickname + " (" + chosenPokemon.species + ")";
                let removeBtn = document.createElement('button');
                removeBtn.innerText = 'Release';
                removeBtn.setAttribute('class', 'release');
                removeBtn.setAttribute('data-pokemon_id', chosenPokemon.id);
                removeBtn.addEventListener('click', function(e){
                    e.srcElement.parentElement.remove();
                });
                li.append(removeBtn);
                divUl.append(li);
                }
                
            })  
        });
        card.append(button);
        let ul = document.createElement('ul');
        ul.setAttribute('class', 'element-ul');
        card.append(ul);
        mainSpace.append(card);
    }
});


