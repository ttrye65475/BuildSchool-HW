let dateControl;
let dateValue = "";
let button = document.querySelector("#form-btn");
let num = [];
let add;
let total = 0;
const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
let month;
let day;
let starSign = "";
let starSignEng = "";
let starData;


button.addEventListener('click', function () {
  dateControl = document.querySelector("#date");
  dateValue = dateControl.value;
  CountNum();
  CountStar();
  GetSentence();
})

//顯示lifeNum()
function showInfo(lifesen) {
  let lifeSign = document.querySelector(".starSign-answer");
  lifeSign.innerHTML = `${starSign}座 ${starSignEng}`;
  let lifeNum = document.querySelector(".lifeNum-answer");
  lifeNum.innerText = `${add}`;
  let sentence = document.querySelector(".sentence-answer");
  sentence.innerText = `${lifesen}`;
}

//算生命靈數
function CountNum() {
  num = dateValue.split('');
  num = num.filter(n => n !== "-");
  add = num.reduce(reducer).toString().split("");
  while (add.length > 1) {
    add = add.reduce(reducer).toString().split("");
  }
}

function CountStar() {
  month = num[4] + num[5];
  day = num[6] + num[7];
  starSign = getAstro(month, day);
  starData = [{
      Name: "魔羯",
      English: "capricorn"
    },
    {
      Name: "水瓶",
      English: "aquarius"
    }, {
      Name: "雙魚",
      English: "pisces"
    }, {
      Name: "牡羊",
      English: "aries"
    }, {
      Name: "金牛",
      English: "taurus"
    }, {
      Name: "雙子",
      English: "gemini"
    }, {
      Name: "巨蟹",
      English: "Cancer"
    }, {
      Name: "獅子",
      English: "leo"
    }, {
      Name: "處女",
      English: "virgo"
    }, {
      Name: "天秤",
      English: "libra"
    }, {
      Name: "天蠍",
      English: "scorpio"
    }, {
      Name: "射手",
      English: "sagittarius"
    }
  ]
  for (let item in starData) {
    if (starData[item].Name == starSign) {
      starSignEng = starData[item].English;
    }
  }
}

//算星座公式
function getAstro(month, day) {
  var s = "魔羯水瓶雙魚牡羊金牛雙子巨蟹獅子處女天秤天蠍射手魔羯";
  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}

//得到ajax資料
function GetSentence() {
  $.ajax({
    type: "Get",
    url: `https://buildschoolapi.azurewebsites.net/api/number/GetNumerology?constellation=${starSignEng}&number=${add}`,
    success: function (response) {
      showInfo(response);
    }
  });
}