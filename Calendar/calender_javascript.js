let dayId;
let spanRemoveID;
var myModal;
window.onload = function () {
  addList();
  Load();
}

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
let weekday = today.getDay();
let daysOfMonth = new Date(year, month + 1, 0).getDate();

let today_now = new Date();
let today_year = today_now.getFullYear();
let today_month = today_now.getMonth();
let today_day = today_now.getDate();
let firstweekDay = new Date(year, month, 1).getDay();
//增加日期格子
function addList() {
  let day = document.getElementById("day");
  day.innerHTML = "";
  daysOfMonth = new Date(year, month + 1, 0).getDate();
  firstweekDay = new Date(year, month, 1).getDay();
  let ul = document.createElement("ul");
  let num = 42;

  if (firstweekDay + daysOfMonth <= 35) {
    num -= 7;
  }
  for (let i = 0; i < num; i++) {
    let day = document.getElementById("day");
    let li = document.createElement("li");
    li.setAttribute("id", `li${i}`);
    ul.appendChild(li);
    day.appendChild(ul);
  }

  let monthEng = "";
  let _monthEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthEng = _monthEng[month];

  let yearTitle = document.getElementById("year");
  yearTitle.innerText = year;
  let monthTitle = document.getElementById("month");
  monthTitle.innerText = monthEng;

  for (let i = 0; i < daysOfMonth; i++) {
    let li = document.getElementById(`li${firstweekDay+i}`);
    li.setAttribute("class", "liGroup");
    li.setAttribute("onclick", "liGroup(event)");
    let p = document.createElement("p");
    let div = document.createElement("div");
    let addSpan = document.createElement("span");
    addSpan.setAttribute("class", "addSpanGroup");
    addSpan.innerText = "Add Schedule";
    div.setAttribute("class", "divGroup");
    div.setAttribute("id", `${year}-${month+1}-${i+1}`);
    p.setAttribute("id", `p${i}`);
    p.innerText = i + 1;
    p.append(addSpan);
    li.append(p);
    li.append(div);

    if (div.id == `${today_year}-${today_month+1}-${today_day}`) {
      let selectedToday = document.getElementById(`${today_year}-${today_month+1}-${today_day}`);
      selectedToday.parentNode.setAttribute("style", "border:3px solid #AF4034; background-color:rgba(255,200,200,.3); border-radius:24px;");
    }
  }
}

function refresh() {
  let divGroup = document.querySelectorAll(".divGroup");
  if (divGroup != null) {
    divGroup.forEach(x => x.innerHTML = "");
  }
  let calenderData = localStorage.getItem('calenderDay');
  if (calenderData != null) {
    _tempArray = JSON.parse(calenderData);
  }
}

myModal = new bootstrap.Modal(document.getElementById('modal-content'), {
  keyboard: false
})

function liGroup(event) {
  dayId = event.target.id;
  myModal.show();
  document.getElementById("time").value = null;
  document.getElementById("todo").value = null;
}

let time;
let todo;

function saveBtn() {
  time = document.getElementById('time').value;
  todo = document.getElementById('todo').value;
  if (time == "" || todo == "") {
    alert("請輸入時間及待辦事項!")
    return;
  }
  SaveData();
  refresh();
  Load();
}

let myModal_Span = new bootstrap.Modal(document.getElementById('modal-content_span'), {
  keyboard: false
})

let targetId;

function spanGroup(event) {
  spanId = event.target.id;
  myModal_Span.show();
  document.getElementById("time_span").value = null;
  document.getElementById("todo_span").value = null;
  targetId = event.target.id;
  event.stopPropagation();
}

function saveEditedBtn() {
  let time_span = document.getElementById("time_span").value;
  let todo_span = document.getElementById("todo_span").value;
  if (time_span == "" || todo_span == "") {
    alert('請輸入時間跟待辦事項!');
    return;
  }
  edit(targetId);
  myModal_Span.hide();
  refresh();
  Load();
}

let localData = JSON.parse(localStorage.getItem('calenderDay'));
let _tempArray = localData == null ? [] : localData;
let createTime;
//儲存資料到localStorage
function SaveData() {
  createTime = new Date().getTime();
  let temp = {
    Id: document.getElementById(dayId).childNodes[1].id,
    Time: time,
    Todo: todo,
    CreateTime: createTime,
    Color: '#f00'
  }

  _tempArray.push(temp);
  //存lst東西用setItem, 有兩個參數, key & value
  localStorage.setItem('calenderDay', JSON.stringify(_tempArray));
  myModal.hide();
  time = "";
  todo = "";
}

//顯示和創建代辦事項, 從lsg拿東西
function Load() {
  _tempArray.forEach(item => {
    let divId = item.Id;
    let spanId = item.CreateTime;

    let node = document.getElementById(divId);
    if (node != null) {
      let span = document.createElement("span");
      let spanRemove = document.createElement("span");
      span.setAttribute("id", spanId);
      prespan = spanId;
      span.setAttribute("class", "spanGroup");
      span.setAttribute("onclick", `spanGroup(event)`);
      spanRemove.setAttribute("class", "SRGroup");
      spanRemove.setAttribute("onclick", `SRGroup(this,event)`);
      spanRemove.innerText = "x";
      span.append(`${item.Time} ${item.Todo}`);
      span.appendChild(spanRemove);
      node.appendChild(span);
    }
  });

}

document.querySelectorAll(".addSpanGroup").forEach(x => {
  x.stopPropagation();
})

//控制移除x鍵的function
function SRGroup(target, event) {
  removeData(target);
  event.stopPropagation();
}

//修改lst內的東西
function edit(targetId) {
  let time_span = document.getElementById("time_span").value;
  let todo_span = document.getElementById("todo_span").value;
  if (time_span == "" || todo_span == "") {
    alert('請輸入時間跟待辦事項!');
    return;
  }
  let temp = JSON.parse(localStorage.getItem('calenderDay'));
  let correctTemp = temp.find(x => x.CreateTime.toString() == targetId);
  let correctIndex = temp.indexOf(correctTemp);
  correctTemp.Time = time_span;
  correctTemp.Todo = todo_span;
  temp.splice(correctIndex, 1, correctTemp);
  localStorage.setItem('calenderDay', JSON.stringify(temp));
}

//移除lst內的東西 
function removeData(target) {
  let spanRemoveID = target.parentNode.id;
  let removeSpan = _tempArray.findIndex(x => x.CreateTime == spanRemoveID);
  _tempArray.splice(removeSpan, 1);
  localStorage.setItem('calenderDay', JSON.stringify(_tempArray));
  refresh();
  Load();
}

let preMonth = document.getElementById("pre-month");
let nextMonth = document.getElementById("next-month");

// 上個月
preMonth.addEventListener('click', function () {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  addList();
  refresh();
  Load();
})
//下個月
nextMonth.addEventListener('click', function () {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  addList();
  refresh();
  Load();
})