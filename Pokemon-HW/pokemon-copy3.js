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
let cardIndex = 0;

// window.onload = function () {
//   getPokemonJson();
// };

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
  pokemonNewArray.forEach((item,index) => {
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
    modal.querySelector(".modal-body").appendChild(genUl(item));
  })
}

let ul = document.createElement("ul");
//在Modal中 改成中文資料格式ul
let genUl = function (item) {
  ul.innerHTML = "";
  let li = document.createElement("li");
  li.setAttribute("style", "list-style:none")
  li.innerHTML = `
  <p>編號 : ${item.Id}</p>
  <img src = "${item.Pic}">
  <p>名字 : ${item.Name}</p>
  <p>HP : ${item.Hp}</p>
  <p>攻擊力 : ${item.Attack}</p>
  <p>防禦力 : ${item.Defense}</p>
  <p>SP 攻擊力 : ${item.SpAttack}</p>
  <p>SP 防禦力 : ${item.SpDefense}</p>
  <p>速度 : ${item.Speed}</p>`;
  ul.appendChild(li);
  return ul;
}

//Load all images button
let LoadAll = function () {
  getPokemonJson();
}

//Add one image button
let PokemonAppend = function () {

}

//RESET button
function Reset() {
  let row = document.querySelector(".row");
  row.innerHTML = "";
}