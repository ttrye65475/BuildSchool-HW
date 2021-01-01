let pokemonArray = [];
let pokemonNewArray = [];

let Id;
let Name;
let Hp;
let Attack;
let Defense;
let SpAttack;
let SpDefense;
let Speed;
let Pic;

let cloneContent;

window.onload = function () {
  getPokemonJson();
};

function getPokemonJson() {
  let xhl = new XMLHttpRequest();
  //整理資料成id name img
  xhl.onload = function () {
    pokemonArray = JSON.parse(this.responseText);
    pokemonArray.forEach(item => {
      let temp = {
        Id: item.id.toString().padStart(3, 0),
        Name: item.name["chinese"],
        Hp: item.base["HP"],
        Attack: item.base["Attack"],
        Defense: item.base["Defense"],
        SpAttack: item.base["Sp. Attack"],
        SpDefense: item.base["Sp. Attack"],
        Speed: item.base["Speed"],
        Pic: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3,0)}.png`
      }
      pokemonNewArray.push(temp);
    });
    pokeTemplate();
  }
  xhl.open("GET", "https://raw.githubusercontent.com/apprunner/pokemon.json/master/pokedex.json");
  xhl.send();
}

//複製card
function pokeTemplate() {
  let row = document.getElementsByClassName("row")[0];
  let card = document.getElementById("pokemonTemplate");
  //把getPokemonJson資料加到card
  pokemonNewArray.forEach((item) => {
    cloneContent = card.content.cloneNode(true);
    cloneContent.querySelector("img").src = item.Pic;
    cloneContent.querySelector("h5").innerText = item.Id;
    cloneContent.querySelector("p").innerText = item.Name;
    cloneContent.querySelector('.btn').setAttribute("data-bs-toggle", "modal");
    cloneContent.querySelector('.btn').setAttribute("data-bs-target", "#pokemonModal");
    pokeModal(item);
    row.append(cloneContent);
  })
}

//在既有的Modal上, 點到時, 綁pokeTemplate資料上去
function pokeModal(item) {
  cloneContent.querySelector('.btn').addEventListener('click', function () {
    let modal = document.querySelector("#pokemonModal");
    modal.querySelector("img").src = item.Pic;
    modal.querySelector("h5").innerText = item.Name;
    modal.querySelector("#Id").innerText = item.Id;
    modal.querySelector("#Hp").innerText = item.Hp;
    modal.querySelector("#Attack").innerText = item.Attack;
    modal.querySelector("#Defense").innerText = item.Defense;
    modal.querySelector("#SpAttack").innerText = item.SpAttack;
    modal.querySelector("#SpDefense").innerText = item.SpDefense;
    modal.querySelector("#Speed").innerText = item.Speed;

  })
}

//產list在Modal上
function genList(){
  document.createElement("ul");
  document.createElement("li");
  document.createElement("thead");
  document.createElement("th");
  document.createElement("tr");
  document.createElement("td");
  document.createElement("tbody");
  document.createElement("tr");
  document.createElement("td");
}