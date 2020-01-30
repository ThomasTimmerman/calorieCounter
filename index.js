var meals = {
  havermout: [75, 7.9, 8.2, 100],
  yoghurt: [11.2, 7.5, 10, 250],
  stoofvlees: [0, 9.5, 20.1, 100],
  friet: [76, 30, 10, 200],
  rulstukjes: [8, 0.7, 21, 100],
  kidneybonen: [20.8, 0.9, 11.5, 150],
  mais: [7.7, 1.4, 2.1, 70],
  tomaten: [8, 0.2, 2, 200],
  rijst: [76, 1.1, 7.3, 100],
  kwark: [20, 0, 45, 500],
  notenreep: [11, 18, 6.5, 50],
  proteinshake: [1.4, 0, 29.4, 30]
};

function clearInput() {
  document.getElementById("name").value = "";
  document.getElementById("carbs").value = "";
  document.getElementById("fat").value = "";
  document.getElementById("protein").value = "";
  document.getElementById("grams").value = "";
}

function addProduct() {
  var name = document.getElementById("name").value;
  var carbs = document.getElementById("carbs").value;
  var fat = document.getElementById("fat").value;
  var protein = document.getElementById("protein").value;
  var grams = document.getElementById("grams").value;
  var mealList = [];
  mealList.push(
    parseFloat(carbs),
    parseFloat(fat),
    parseFloat(protein),
    parseFloat(grams)
  );
  meals[name] = mealList;
  console.log(meals);
  clearInput();

  var listItem = name;
  var li = document.createElement("li");
  li.className = "list";
  var rule = document.createTextNode(listItem);
  li.appendChild(rule);

  var removeBtn = document.createElement("input");
  removeBtn.type = "button";
  removeBtn.value = "X";
  removeBtn.className = "button";
  removeBtn.onclick = remove;
  li.appendChild(removeBtn);
  document.getElementById("list").appendChild(li);
}

function remove(e) {
  var el = e.target;
  el.parentNode.remove();
  delete meals[el.parentNode.innerHTML.split(" ").shift()];
  console.log(meals);
}

// dailyCarbs = 0
// dailyFat = 0
// dailyProtein = 0

// def cal_to_gr(cal):
//     global dailyCarbs
//     dailyCarbs += ((cal/100)*40)/4
//     global dailyFat
//     daily_fat += ((cal/100)*30)/9
//     global dailyProtein
//     dailyProtein += ((cal/100)*30)/4
//     return dailyCarbs, daily_fat, dailyProtein

var dailyCarbs = 0;
var dailyFat = 0;
var dailyProtein = 0;

function calToGrams() {
  var cal = document.getElementById("calories").value;
  dailyCarbs += ((cal / 100) * 40) / 4;
  dailyFat += ((cal / 100) * 30) / 9;
  dailyProtein += ((cal / 100) * 30) / 4;
  console.log(dailyCarbs, dailyFat, dailyProtein);
}

var totalCarbs = 0;
var totalFat = 0;
var totalProtein = 0;

function macros() {
  var keys = Object.keys(meals);
  for (var i = 0; i < keys.length; i++) {
    totalCarbs += meals[keys[i]][0];
    totalFat += meals[keys[i]][1];
    totalProtein += meals[keys[i]][2];
  }
  console.log(totalCarbs, totalFat, totalProtein);
}

var carbList = [];
var fatList = [];
var proteinList = [];
var carbFatProteinList = [];

function group() {
  for (const meal in meals) {
    var macros = meals[meal];
    var percentMacros = (macros[0] * 4 + macros[1] * 9 + macros[2] * 4) * 0.4;
    if (macros[0] * 4 >= percentMacros) {
      carbList.push(meal);
    }
    if (macros[1] * 9 >= percentMacros) {
      fatList.push(meal);
    }
    if (macros[2] * 4 >= percentMacros) {
      proteinList.push(meal);
    }
  }
}

function calculate() {
  calToGrams();
  macros();
  group();
  moreCarbCounter = 0;
  moreFatCounter = 0;
  moreProteinCounter = 0;
  lessCarbCounter = 0;
  lessFatCounter = 0;
  lessProteinCounter = 0;
  var cal = document.getElementById("calories").value;
  if (cal > 1599) {
    while (
      totalCarbs < dailyCarbs * 0.99 ||
      totalCarbs > dailyCarbs * 1.01 ||
      totalFat < dailyFat * 0.99 ||
      totalFat > dailyFat * 1.01 ||
      totalProtein < dailyProtein * 0.99 ||
      totalProtein > dailyProtein * 1.01
    ) {
      while (totalCarbs < dailyCarbs * 0.99) {
        console.log("more carbs!");

        if (moreCarbCounter > carbList.length - 1) {
          moreCarbCounter = 0;
        }
        meals[carbList[moreCarbCounter]] = [
          meals[carbList[moreCarbCounter]][0] * 1.01,
          meals[carbList[moreCarbCounter]][1] * 1.01,
          meals[carbList[moreCarbCounter]][2] * 1.01,
          meals[carbList[moreCarbCounter]][3] * 1.01
        ];
        totalCarbs += meals[carbList[moreCarbCounter]][0] * 0.01;
        totalFat += meals[carbList[moreCarbCounter]][1] * 0.01;
        totalProtein += meals[carbList[moreCarbCounter]][2] * 0.01;
        moreCarbCounter += 1;
      }
      while (totalCarbs > dailyCarbs * 1.01) {
        console.log("less carbs!");

        if (lessCarbCounter > carbList.length - 1) {
          lessCarbCounter = 0;
        }
        meals[carbList[lessCarbCounter]] = [
          meals[carbList[lessCarbCounter]][0] * 0.99,
          meals[carbList[lessCarbCounter]][1] * 0.99,
          meals[carbList[lessCarbCounter]][2] * 0.99,
          meals[carbList[lessCarbCounter]][3] * 0.99
        ];
        totalCarbs -= meals[carbList[lessCarbCounter]][0] * 0.01;
        totalFat -= meals[carbList[lessCarbCounter]][1] * 0.01;
        totalProtein -= meals[carbList[lessCarbCounter]][2] * 0.01;
        lessCarbCounter += 1;
      }
      while (totalFat < dailyFat * 0.99) {
        console.log("more fat!");

        if (moreFatCounter > fatList.length - 1) {
          moreFatCounter = 0;
        }
        meals[fatList[moreFatCounter]] = [
          meals[fatList[moreFatCounter]][0] * 1.01,
          meals[fatList[moreFatCounter]][1] * 1.01,
          meals[fatList[moreFatCounter]][2] * 1.01,
          meals[fatList[moreFatCounter]][3] * 1.01
        ];
        totalCarbs += meals[fatList[moreFatCounter]][0] * 0.01;
        totalFat += meals[fatList[moreFatCounter]][1] * 0.01;
        totalProtein += meals[fatList[moreFatCounter]][2] * 0.01;
        moreFatCounter += 1;
      }
      while (totalFat > dailyFat * 1.01) {
        console.log("less fat!");

        if (lessFatCounter > fatList.length - 1) {
          lessFatCounter = 0;
        }
        meals[fatList[lessFatCounter]] = [
          meals[fatList[lessFatCounter]][0] * 0.99,
          meals[fatList[lessFatCounter]][1] * 0.99,
          meals[fatList[lessFatCounter]][2] * 0.99,
          meals[fatList[lessFatCounter]][3] * 0.99
        ];
        totalCarbs -= meals[fatList[lessFatCounter]][0] * 0.01;
        totalFat -= meals[fatList[lessFatCounter]][1] * 0.01;
        totalProtein -= meals[fatList[lessFatCounter]][2] * 0.01;
        lessFatCounter += 1;
      }
      while (totalProtein < dailyProtein * 0.99) {
        console.log("more protein!");

        if (moreProteinCounter > proteinList.length - 1) {
          moreProteinCounter = 0;
        }
        meals[proteinList[moreProteinCounter]] = [
          meals[proteinList[moreProteinCounter]][0] * 1.01,
          meals[proteinList[moreProteinCounter]][1] * 1.01,
          meals[proteinList[moreProteinCounter]][2] * 1.01,
          meals[proteinList[moreProteinCounter]][3] * 1.01
        ];
        totalCarbs += meals[proteinList[moreProteinCounter]][0] * 0.01;
        totalFat += meals[proteinList[moreProteinCounter]][1] * 0.01;
        totalProtein += meals[proteinList[moreProteinCounter]][2] * 0.01;
        moreProteinCounter += 1;
      }
      while (totalProtein > dailyProtein * 1.01) {
        console.log("less protein!");

        if (lessProteinCounter > proteinList.length - 1) {
          lessProteinCounter = 0;
        }
        meals[proteinList[lessProteinCounter]] = [
          meals[proteinList[lessProteinCounter]][0] * 0.99,
          meals[proteinList[lessProteinCounter]][1] * 0.99,
          meals[proteinList[lessProteinCounter]][2] * 0.99,
          meals[proteinList[lessProteinCounter]][3] * 0.99
        ];
        totalCarbs -= meals[proteinList[lessProteinCounter]][0] * 0.01;
        totalFat -= meals[proteinList[lessProteinCounter]][1] * 0.01;
        totalProtein -= meals[proteinList[lessProteinCounter]][2] * 0.01;
        lessProteinCounter += 1;
      }
    }
    console.log(totalCarbs, totalFat, totalProtein);
    console.log(meals);
    var listItems = document.getElementsByClassName("list");
    while (listItems.length > 0) {
      listItems[0].parentNode.removeChild(listItems[0]);
    }

    for (const item in meals) {
      var rounded = Math.round(meals[item][3] * 10) / 10;
      var listItem = item + " \t" + rounded + " grams";
      var li = document.createElement("li");
      li.className = "list";
      var rule = document.createTextNode(listItem);
      li.appendChild(rule);
      document.getElementById("list").appendChild(li);
    }
  }
}
