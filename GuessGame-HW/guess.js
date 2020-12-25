let restart = document.getElementById("restart");
let cheat = document.getElementById("cheat");
restart.setAttribute("disabled",true);
cheat.setAttribute("disabled",true);
document.getElementById("rule").onclick = function(event){
  alert(`遊戲規則:請先點選開始，輸入四個數字，不能使用重複數字，猜出系統的四個數字，才算獲勝哦！`);
}


let startGame = document.getElementById("start");
let numbers = [];
let randomNum =  function (){
  if(randomNum == 0){
    return;
  }
  numbers = [];
  for(i=0;i<4;i+0){
    let num1 = Math.floor(Math.random()*10);
    if(!numbers.includes(num1)){
      numbers.push(num1);
      i++;
    }
  }
}

let clearInfo = function () {
  document.getElementById("guessResults").innerHTML = "";
}

startGame.onclick = function () {
  if(this.hasAttribute("disabled")){
    return
  }
  clearInfo();
  randomNum();

  startGame.setAttribute("disabled",true);
  restart.removeAttribute("disabled");
  cheat.removeAttribute("disabled");
}

var showAnswer = document.getElementById("cheat");
showAnswer.onclick = function(){
  if(this.hasAttribute("disabled")){
    return
  }
  alert(`${numbers.join('')}`);
}

let A = 0;
let B = 0;
let userAnswer = "";
let userAnswerArray =[];
let result;
let notNum;
function CountAB(){
  A = 0;
  B = 0;
  userAnswer = document.getElementById("userGuess").value;
  userAnswerArray = userAnswer.split('');
  for(i=0;i<4;i++){
    if(numbers[i] == userAnswerArray[i]){
      A++;
    }
    if(numbers.includes(parseInt(userAnswerArray[i]))){
      B++;
    }
  }
  B = B - A;
  result = userAnswerArray.filter(function(element, index, arr){
    return arr.indexOf(element) === index;
  });
  notNum = userAnswerArray.map(item=>isNaN(item));
}

document.getElementById("restart").onclick = function(){
    if(this.hasAttribute("disabled")){
    return
  }
    clearInfo();
    randomNum();
    document.getElementById("userGuess").value = "";
}

let showAB = function(){
  let liGuess = document.createElement("li");
  liGuess.setAttribute("class","list-group-item");

  let spanGuess = document.createElement("span");
  if(A==4){
  spanGuess.setAttribute("class","label label-success");
  spanGuess.textContent = (`${A}A${B}B`);
  alert("恭喜你贏了!");
  }
  else{
  spanGuess.setAttribute("class","label label-danger");
  spanGuess.textContent = (`${A}A${B}B`);
  }

  liGuess.append(spanGuess,` ${userAnswer}`);
  guessResults.appendChild(liGuess);
}

document.getElementById("userGuess").onkeyup = function (event){
  if(event.keyCode == 13){
      CountAB();
    if(userAnswer.length !== 4 || result.length !== 4  || notNum.every(item=>item == false) == false ){
      alert('請輸入4個不重複的數字!')
    }
    else{
      showAB();
    }
  }
}

document.getElementById("guess").onclick = function (event){
    CountAB();
    if(userAnswer.length !== 4 || result.length !== 4 || notNum.every(item=>item==false) == false){
      alert('請輸入4個不重複的數字!')
    }
    else{
      showAB();
    }
}

