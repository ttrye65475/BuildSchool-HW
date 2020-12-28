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
let itemIndex = -1;
let loadAllIndex = 0;

window.onload = function () {
  let img = document.querySelector(".pic");
  img.setAttribute("style", "transform: rotate(360deg);")
  // getPokemonJson();
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
function pokeTemplate(itemIndex) {
  let row = document.getElementsByClassName("row")[0];
  let card = document.getElementById("pokemonTemplate");
  //把getPokemonJson資料加到card
  pokemonNewArray.forEach((item, index) => {
    if (itemIndex < index) {
      return;
    }
    if (loadAllIndex > 1) {
      return;
    }
    cloneContent = card.content.cloneNode(true);
    cloneContent.querySelector("img").src = item.Pic;
    // cloneContent.querySelector("h5").innerText = item.Id;
    cloneContent.querySelector("h5").innerText = item.Name;
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
  let h5 = document.querySelector("#exampleModalLabel");
  h5.innerText = `${item.Id}`;
  let li = document.createElement("li");
  let modalImg = document.createElement("img");
  modalImg.setAttribute("src", item.Pic);
  li.setAttribute("style", "list-style:none;");

  li.innerHTML = `
  <p>名字 : ${item.Name}</p>
  <p>HP : ${item.Hp}</p>
  <p>攻擊力 : ${item.Attack}</p>
  <p>防禦力 : ${item.Defense}</p>
  <p>SP 攻擊力 : ${item.SpAttack}</p>
  <p>SP 防禦力 : ${item.SpDefense}</p>
  <p>速度 : ${item.Speed}</p>`;
  ul.appendChild(modalImg);
  ul.appendChild(li);
  return ul;
}

//Load all images button
let LoadAll = function () {
  loadAllIndex++;
  getPokemonJson();
}

//Add one image button
let AddOne = function () {
  itemIndex++;
  Reset();
  pokeTemplate(itemIndex);
}

//Minus one image button
let MinusOne = function () {
  if (itemIndex < 0) {
    return;
  }
  itemIndex--;
  Reset();
  pokeTemplate(itemIndex);
}

//RESET button
function Reset() {
  let row = document.querySelector(".row");
  row.innerHTML = "";
}

//RESET Card
function ResetAll() {
  Reset();
  itemIndex = -1;
  loadAllIndex = 0;
}

window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".banner").setAttribute("style", "background-color: rgb(30, 134, 255);border: 1px solid rgb(30, 110, 255);");
    document.querySelector(".banner h1").setAttribute("style", "color: #fff;");

  } else {
    document.querySelector(".banner").setAttribute("style", "background-color: #fff; ");
    document.querySelector(".banner h1").setAttribute("style", "color: #000;");
  }
}