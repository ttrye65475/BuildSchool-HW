window.onload = function () {
  setInfo();
}

function setInfo() {
  let start = document.querySelector("#start");
  start.addEventListener('click', function () {
    randomPuzzle();
  })

  level.addEventListener('click', function () {
    removeCanvas();
    setPuzzleSize();
    setCanvas();
    cutDraw();
  })

  let back = document.querySelector("#back");
  back.addEventListener('click', function () {
    stepBack();
  })
}

//難度選擇
let level = document.getElementById("level");
let levelInput;
let width;

function setPuzzleSize() {
  levelInput = document.getElementById("levelInput").value;
  width = 600 + (levelInput * 2);
  let puzzle = document.querySelector("#puzzle");
  puzzle.setAttribute("style", `width:${width}px;`);
}

let url = "./03.png";
let puzzleNum;
let lastCanvas;
let puzzlePic = document.querySelector("#puzzle-pic");

function setCanvas() {
  puzzleNum = parseInt(levelInput);
  let size = (width - (levelInput * 2)) / puzzleNum;

  for (let i = 1; i < puzzleNum * puzzleNum + 1; i++) {
    let can = document.createElement("canvas");
    can.setAttribute("id", `canvas${i}`);
    can.setAttribute("width", `${size}`);
    can.setAttribute("height", `${size}`);
    can.setAttribute("style", `order:${i}`);
    can.setAttribute("onclick", `clickImg(this)`);
    puzzlePic.appendChild(can);
  }
}

function removeCanvas() {
  puzzlePic.innerHTML = "";
}

//切圖片
function cutDraw() {
  var img = new Image();
  let size = width - (puzzleNum * 2);
  let _Array = [0];
  for (let i = 1; i < puzzleNum; i++) {
    _Array.push(Math.round((size / puzzleNum) * i));
  }
  let index = 1;

  img.onload = function () {
    for (let i = 0; i < puzzleNum; i++) {
      for (let j = 0; j < puzzleNum; j++) {
        let id = 'canvas' + index;
        let isLast = i * j == (puzzleNum - 1) * (puzzleNum - 1);
        if (!isLast) {
          document.getElementById(id).getContext('2d').drawImage(img, _Array[j], _Array[i], _Array[1], _Array[1], 0, 0, _Array[1], _Array[1]);
        }
        index++;
      }
    }
    lastCanvas = document.getElementById(`canvas${index-1}`);
  }
  img.src = `${url}`;
}



//跑亂拼圖
let chkRandom;

function randomPuzzle() {
  randomArray = [];
  for (let i = 0; i < 100; i++) {
    chkRandom = true;
    let num = Math.floor(Math.random() * (puzzleNum * puzzleNum + 1));
    if (num > 0) {
      clickImg(document.getElementById(`canvas${num}`));
    }
  }
  chkRandom = false;
}

let determ;

function rule(x, y, puzzleNum) {

  for (let i = 1; i < puzzleNum; i++) {
    //先寫往右的
    if (x % puzzleNum == i && y == x + 1 || y % puzzleNum == i && x == y + 1) {
      return determ = true;
    }
    //再寫往左的
    else if (x < puzzleNum * 1 && x > (puzzleNum * i) - (puzzleNum - 1) && y < puzzleNum * 1 || y < puzzleNum * 1 && y > (puzzleNum * i) - (puzzleNum - 1) && x < puzzleNum * 1) {
      return determ = true;
    }
    //再寫往上的
    else if (x > puzzleNum && x < (puzzleNum * (i + 1)) + 1 && y == x - puzzleNum || y > puzzleNum * i && y < (puzzleNum * (i + 1)) + 1 && x == y - puzzleNum) {
      return determ = true;
    }
    //再寫往下的
    else if (x < (puzzleNum * i) + 1 && y == x + puzzleNum || y < (puzzleNum * i) + 1 && x == y + puzzleNum) {
      return determ = true;
    }
  }
}

//判斷位置是否一樣, 一樣就正確
function checkPlace() {
  let chkCanvasArray = [];
  let chkOrderArray = [];
  for (let i = 1; i < 10; i++) {
    let checkOrder = document.getElementById(`canvas${i}`).style.order;
    chkCanvasArray.push(Number(checkOrder));
    chkOrderArray.push(i);
  }
  if (JSON.stringify(chkCanvasArray) == JSON.stringify(chkOrderArray) && chkCanvasArray !== null) {
    alert("恭喜你全對!");
  }
}

let randomArray = [];
//點圖片會跟lastCanvas交換order
function clickImg(obj) {
  let selectOrder = obj.style.order;
  let change = lastCanvas.style.order;
  rule(Number(selectOrder), Number(change), puzzleNum);

  if (chkRandom) {
    //random圖片時交換order
    if (determ) {
      obj.style.order = change;
      lastCanvas.style.order = selectOrder;
      determ = false;
      randomArray.push(Number(change));
    } else {
      return;
    }
  } 
  // else if (chkBack) {
  //   //點選一鍵返回時做確認
  //   obj.style.order = change;
  //   lastCanvas.style.order = selectOrder;
  //   determ = false;
  // } 
  else {
    //點圖片會跟lastCanvas交換order
    if (determ) {
      obj.style.order = change;
      lastCanvas.style.order = selectOrder;
      determ = false;
      randomArray.push(change);
      checkPlace();
    } else {
      return;
    }
  }

}

// let chkBack;
// //一鍵返回
// const sleep = function (milliseconds) {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }
// async function stepBack() {
//   chkBack = true;
//   let length = randomArray.length;
//   for (let i = 0; i < length; i++) {
//     let temp = randomArray.pop();
//     console.log(temp);
//     console.log(document.getElementById(`canvas${temp}`));
//     clickImg(document.getElementById(`canvas${temp}`));
//     await sleep(50);
//   }
// }