const pokeList = document.querySelector('#pokemon-list');
document.querySelector('.prev-button').addEventListener('click', (e)=>{
    e.preventDefault();
    if (pageCount != 0) {
        pageCount-=20;
    }
    app();
}); 
document.querySelector('.next-button').addEventListener('click', (e)=>{
    e.preventDefault();
    pageCount+=20;
    app();
}); 
let pageCount = 0;

async function get (url) {
    try {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    } catch(e) {
        console.log(`[Error occured] ${e.message}`);
    }
};


async function app() {
    const pokemons = await get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
    pokeList.innerHTML = '';

    pokemons.slice(pageCount, pageCount+20).forEach(pokemon => {
        const div = document.createElement('div');
        div.className = "pokemon-item";

        const img = document.createElement('img')
        ;
        const urlId = pokemon.id.toLocaleString('en-us', { minimumIntegerDigits: 3 })
        img.setAttribute('src', `https://github.com/fanzeyi/pokemon.json/blob/master/images/${urlId}.png?raw=true`)

        const descDiv = document.createElement('div');
        descDiv.className = 'pokemon-item__description';

        const descUl = document.createElement('ul');
        Object.keys(pokemon.base).forEach((key)=>{
            const li = document.createElement('li');
            li.innerHTML = `${key}: ${pokemon.base[key]}`
            descUl.appendChild(li);
        })
        descDiv.appendChild(descUl);

        const p = document.createElement('p');
        p.innerHTML = pokemon.name['english'];

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(descDiv);
        div.app

        pokeList.appendChild(div);
    });
}

app();