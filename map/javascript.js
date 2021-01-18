let objResult;
let _objArray = [];
var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

window.onload = function () {
  let promise = new Promise(function(resolve,reject){
    resolve();
  })

  promise.then(result=>{
    fetchResource();
    let load = document.getElementById("load");
    load.innerHTML = "";
  })
}

//取得json資料
function fetchResource() {
  let url = "https://bsopendata.azurewebsites.net/api/LeisureTravel/Attractions";
  fetch(url)
    .then(response => response.json())
    .then(result => {
      objResult = result.XML_Head.Infos.Info;
      setData(objResult);
      getMap();
    })
    .catch(ex => {
      document.getElementById("attractions").innerText = ex;
    })
    .finally(() => {

    });
}

//載入資料格式
function setData(result) {
  // i < result.length
  for (let i = 0; i < result.length; i++) {
    let temp = {
      Name: result[i].Name,
      Lat: result[i].Px, //經度 x 120
      Lon: result[i].Py, //緯度 y 23.5
      Address: result[i].Add,
      CheckRegion: (result[i].Add).split("").splice(0, 2).join(""), //2個字的縣市, 可被找到比對的值
      Region: result[i].Region,
      Town: result[i].Town,
      Tel: result[i].Tel.split("").splice(4, 20).join(""),
      Description: result[i].Description,
      TicketInfo: result[i].Ticketinfo,
      Remarks: result[i].Remarks,
      Toldescribe: result[i].Toldescribe
    }

    _objArray.push(temp);
  }
  setDropDown();
}

let map;
let markers = L.markerClusterGroup();
//使用lealeft做地圖及放marker
function getMap() {
  map = L.map('mapid', {
    center: [25.03416068163684, 121.56454962636319],
    zoom: 7
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let popupContent = `<h1>台灣走透透</h1>`;
  let popupLocation = new L.LatLng(25.03416068163684, 121.56454962636319);
  let popup = new L.Popup();
  popup.setLatLng(popupLocation);
  popup.setContent(popupContent);
  markers.addLayer(popup);
  map.addLayer(markers);
}

function setDropDown() {
  //產生下拉式選單資料, 為每一個資料做onclick方法
  let cities = document.getElementById("cities");
  _citiesSort = ["臺北市", "基隆市", "新北市", "宜蘭縣", "桃園市", "新竹市", "新竹縣", "苗栗縣", "台中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣", "臺南市", "高雄市", "澎湖縣", "金門縣", "屏東縣", "臺東縣", "花蓮縣", "連江縣"]
  for (let i = 0; i < _citiesSort.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("class", "optionGroup");
    option.setAttribute("id", `${_citiesSort[i]}`);
    cities.setAttribute("onchange", "matchData(this)");
    option.innerText = _citiesSort[i];
    cities.append(option);
  }
}

//點選到onclick後會產生跟那一個縣市的資料
function matchData(target) {
  let temp = target.value.split("").splice(0, 2).join("");
  let info = _objArray.filter(x => x.CheckRegion == temp);
  setInfo(info);
}

//點選btn會顯示地圖資訊
function showPin(target) {
  if (markers) {
    markers.clearLayers();
  }

  let check = target.parentNode.childNodes[0].innerText;
  let info = _objArray.filter(x => x.Name.includes(check));
    
    map.setView([info[0].Lon, info[0].Lat], 14);
  let marker = L.marker([info[0].Lon, info[0].Lat], {
    title: info[0].Name,
    icon: redIcon
  })
  marker.bindPopup(`<h5>${info[0].Name}</h5><p>${info[0].Toldescribe}</p>`).openPopup();
  markers.addLayer(marker)
  map.addLayer(markers)
}

//帶入顯示資料方法及地圖pin
function setInfo(info) {
  if (markers) {
    markers.clearLayers();
  }
  let arr = [];
  let attractions = document.getElementById("attractions");
  attractions.innerHTML = "";
  for (let i = 0; i < info.length; i++) {
    let div = document.createElement("div");
    let h5 = document.createElement("h5");
    let btn = document.createElement("button");
    let p = document.createElement("p");
    let spanAdd = document.createElement("span");
    let spanTel = document.createElement("span");
    let spanTicket = document.createElement("span");
    let spanRemarks = document.createElement("span");
    btn.setAttribute("class", "btnGroup");
    btn.setAttribute("onclick", "showPin(this)");
    spanAdd.setAttribute("class", "addGroup");
    spanTel.setAttribute("class", "telGroup");
    spanTicket.setAttribute("class", "ticketGroup");
    spanRemarks.setAttribute("class", "remarksGroup");

    h5.innerText = info[i].Name;
    btn.innerText = `想去這玩`;
    p.innerText = info[i].Description;
    spanAdd.innerText = `地址: ${info[i].Address}`;
    spanTel.innerText = `聯絡電話: 0${info[i].Tel}`;
    spanTicket.innerText = `票價資訊: ${info[i].TicketInfo}`;
    spanRemarks.innerText = info[i].Remarks;

    div.append(h5);
    div.append(btn);
    div.append(p);
    div.append(spanAdd);
    div.append(spanTel);
    div.append(spanTicket);
    div.append(spanRemarks);
    attractions.appendChild(div);

    arr.push({
      x: info[i].Lat,
      y: info[i].Lon,
      name: info[i].Name,
      text: info[i].Toldescribe
    })

  }

  map.setView([arr[0].y, arr[0].x], 11);
  arr.map(item => L.marker(new L.LatLng(item.y, item.x)) // 新增Marker
      .bindPopup(`<h5> ${item.name}</h5><p> ${item.text}</p>`)) // 資訊視窗
    .forEach(item => markers.addLayer(item)); // 把marker加入 L.markerClusterGroup中
  map.addLayer(markers);

}

//搜尋結果
let inputBtn = document.getElementById("search-btn");
inputBtn.addEventListener('click', function () {
  let input = document.getElementById("search-bar");
  let infoAdd = _objArray.filter(x => x.Address.includes(input.value));
  let infoName = _objArray.filter(x => x.Name.includes(input.value));

  if (infoAdd.length !== 0) {
    setInfo(infoAdd);
  } else if (infoName !== 0) {
    setInfo(infoName);
  } else {
    let attractions = document.getElementById("attractions");
    attractions.innerHTML = "";
    let span = document.createElement("span");
    span.setAttribute("id", "notSearch");
    span.innerText = "查無資料";
    attractions.append(span);
  }
})