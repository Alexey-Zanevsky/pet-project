const calendar = document.querySelector("#dayCalendar");
const dayButton = document.querySelector("#dayButton");

dayButton.addEventListener("click", () => {
  dayButton.classList.toggle("dayButton-active");
  calendar.classList.toggle("dayCalendar-active");
});

// Закрытие элемента кликом вне его границ
// https://misha.agency/javascript/klik-vne-elementa.html
// document.addEventListener("click", (e) => {
//   const withinBoundaries = e.composedPath().includes(calendar);
//   if (!withinBoundaries) {
//     calendar.classList.remove("dayCalendar-active");
//   }
// });

const dayList = document.querySelectorAll("#day");
const today = document.querySelector(".today");

dayList.forEach((clickDay) => {
  clickDay.addEventListener("click", () => {
    dayList.forEach((anotherDay) => {
      
      if(!clickDay.matches(".today") && !anotherDay.classList.contains("selected-day")){
        clickDay.classList.add("selected-day");
        dayButton.innerText = clickDay.innerText;

      }
      if(!clickDay.matches(".today") && anotherDay.classList.contains("selected-day")){
        anotherDay.classList.remove("selected-day");
        clickDay.classList.add("selected-day");
        dayButton.innerText = clickDay.innerText;
      }
      if(clickDay.matches(".today") && anotherDay.classList.contains("selected-day")){
        anotherDay.classList.remove("selected-day");
        dayButton.innerText = "Day";
      }   
      })
    })
})


// --------------- RIGHT SECTION 2
const addExpense = document.querySelector("#addExpense");
const addRevenue = document.querySelector("#addRevenue");
const leftArrow = document.querySelector("#leftArrow");
const recordsBlock = document.querySelector("#recordsBlock");
const addMenuBlock = document.querySelector("#addMenu");
const addRecordBtn = document.querySelector("#addRecord");

addExpense.addEventListener("click", () => {
  addExpense.classList.remove("opacityStyle");
  addRevenue.classList.add("opacityStyle");
  recordsBlock.style.display = "none";
  addMenuBlock.style.display = "flex";
  addRecord.classList.remove("addRecord-revenue");
  addRecord.classList.add("addRecord-expense");
});
addRevenue.addEventListener("click", () => {
  addRevenue.classList.remove("opacityStyle");
  addExpense.classList.add("opacityStyle");
  recordsBlock.style.display = "none";
  addMenuBlock.style.display = "flex";
  addRecord.classList.remove("addRecord-expense");
  addRecord.classList.add("addRecord-revenue");
});
leftArrow.addEventListener("click", () => {
  addMenuBlock.style.display = "none";
  recordsBlock.style.display = "block";
  addRevenue.classList.remove("opacityStyle");
  addExpense.classList.remove("opacityStyle");
});




// --------------- Category Img function 
// позволяет выбирать и менять категорию по нажатию на картинку
const categoryImgList = document.querySelectorAll("#categoriesImg");

categoryImgList.forEach((categoryImg) => {
  categoryImg.addEventListener("click", () => {
    categoryImgList.forEach((anotherCategoryImg) => {
      if(anotherCategoryImg.classList.contains("categoriesImgClass")) {
        anotherCategoryImg.classList.remove("categoriesImgClass");
        categoryImg.classList.add("categoriesImgClass");
      }
      else categoryImg.classList.add("categoriesImgClass");
    })
  })
})


// --------------- Warning Element
// высвечивает надпись указывающую, что не все компоненты элемента record заполнены
let warningElem;

addRecordBtn.onmouseover = function(e) {
  const priceValue = document.getElementById('inputFieldPrice').value;
  const noteValue = document.getElementById('addNoteInput').value;
  let categoryValue;

  categoryImgList.forEach((categoryImg) => {
    if(categoryImg.classList.contains("categoriesImgClass")) categoryValue = categoryImg.alt;
  })

  if(priceValue == "" || priceValue <= 0 || categoryValue == undefined) {
    warningElem = document.createElement('div');
    warningElem.className = "warningElem";
    warningElem.innerHTML = "Enter all the values of the record";
    addRecordBtn.append(warningElem);

    let coords = addRecordBtn .getBoundingClientRect();
    let left = coords.left + (addRecordBtn.offsetWidth - warningElem.offsetWidth) / 2;
    if(left < 0) left = 0;
    let top = coords.top - warningElem.offsetHeight - 5;
    if(top < 0) top = coords.top + addRecordBtn.offsetHeight + 5;

    warningElem.style.left = left + 'px';
    warningElem.style.top = top + 'px';
  }
}
addRecordBtn.onmouseout = function(e) {
  if(warningElem) {
    warningElem.remove();
    warningElem = null;
  }
}


// --------------------


function checkRecordList(recordList, categoryValue) {
  recordList.forEach((e) => {
    if(e.id == categoryValue) return true;
    else return false;
  })
}
// --------------- Add record function

addRecordBtn.onclick = function(e) {
  const priceValue = document.getElementById('inputFieldPrice').value;
  const noteValue = document.getElementById('addNoteInput').value;
  let categoryValue;
  categoryImgList.forEach((categoryImg) => {
    if(categoryImg.classList.contains("categoriesImgClass")) categoryValue = categoryImg.alt;
  })

  if(priceValue == undefined || categoryValue == undefined) {
    console.log("zabil huj");
    return; 
  }
  else {
    // изменяет уже созданные record
    if(checkRecordList(recordList, categoryValue)) {
      recordList.forEach((record) => {
        if(record.id == categoryvalue) {
          // increment number of records
          let numberOfRecords = parseInt(record.children[0].children[0].children[3])++;
          record.children[0].children[0].children[3].innerText = numberOfRecords;
          // change price record
          let accuratePriceMiniRecord_all; 
          record.children[1].forEach((miniRecord) => {
            let accuratePriceMiniRecord = parseInt(miniRecord.children[0].children[1]);
            accuratePriceMiniRecord_all = accuratePriceMiniRecord_all + accuratePriceMiniRecord;
          })
          record.children[0].children[1] = accuratePriceMiniRecord_all + "zł";
          // add mini record
          const allMiniRecord = record.children[1];
          addMiniRecord(allMiniRecord, priceValue, noteValue);
        }
      })
      console.log("изменил?");
    }
    // создает полностью новый record
    else {
      const record = document.createElement('div');
      record.classList.add("record");
      record.id = categoryValue;
      recordsBlock.appendChild(record);
      const coverRecord = document.createElement('div');
      coverRecord.className = "coverRecord";
      record.appendChild(coverRecord);
      const coverRecordWrapper = document.createElement('div');
      coverRecordWrapper.className = "coverRecord-wrapper"; 
      coverRecord.appendChild(coverRecordWrapper);
      const bottomArrow = document.createElement('div');
      bottomArrow.className = "bottomArrow";
      coverRecordWrapper.appendChild(bottomArrow);
      const imgRecord = document.createElement('img');
      imgRecord.className = "imgRecord";
      const nameRecord = document.createElement('p');
      switch(categoryValue) {
        case "houseImg":
          nameRecord.innerText = "House";
          imgRecord.src = "imgs/house.png";
        break;
        case "healthcareImg":
          nameRecord.innerText = "Health";
          imgRecord.src = "imgs/healthcare.png";
        break;
        case "boxingImg":
          nameRecord.innerText = "Sport";
          imgRecord.src = "imgs/boxing.png";
        break;
        case "hygieneImg":
          nameRecord.innerText = "Hygiene";
          imgRecord.src = "imgs/dental-hygiene.png";
        break;
        case "giftImg":
          nameRecord.innerText = "Gifts";
          imgRecord.src = "imgs/gift.png";
        break;
        case "groceriesImg":
          nameRecord.innerText = "Groceries";
          imgRecord.src = "imgs/groceries.png";
        break;
        case "caffeImg":
          nameRecord.innerText = "Cafe";
          imgRecord.src = "imgs/hot-coffee.png";
        break;
        case "moviesImg":
          nameRecord.innerText = "Recreation";
          imgRecord.src = "imgs/movies.png";
        break;
        case "subwayImg":
          nameRecord.innerText = "Transport";
          imgRecord.src = "imgs/subway.png";
        break;
        case "travelImg":
          nameRecord.innerText = "Travel";
          imgRecord.src = "imgs/traveling.png";
        break;
        case "wifiImg":
          nameRecord.innerText = "Network";
          imgRecord.src = "imgs/wifi.png";
        break;
        case "billImg":
          nameRecord.innerText = "Bills";
          imgRecord.src = "imgs/bill.png";
        break;
        case "productsImg":
          nameRecord.innerText = "Products";
          imgRecord.src = "imgs/products.png";
        break;
      }
      coverRecordWrapper.appendChild(imgRecord);
      coverRecordWrapper.appendChild(nameRecord);
      const numberOfRecords = document.createElement('div');
      numberOfRecords.className = "numberOfRecords";
      numberOfRecords.innerText = 1;    
      coverRecordWrapper.appendChild(numberOfRecords);
      const priceRecord = document.createElement('div');
      if(addRevenue.classList.contains("opacityStyle")) {
        priceRecord.className = "priceRecord revenue";
      }
      if(addExpense.classList.contains("opacityStyle")) {
        priceRecord.className = "priceRecord expense";
      }
      priceRecord.innerText = priceValue + "zł";                               
      coverRecord.appendChild(priceRecord);
      
      const allMiniRecord = document.createElement('div');
      allMiniRecord.className = "allMiniRecord_none";
      allMiniRecord.id = "allMiniRecord";
      record.appendChild(allMiniRecord);
      addMiniRecord(allMiniRecord, priceValue, noteValue);
      console.log("Создал новый элемент?");
    }

  }
  console.log(priceValue, noteValue, categoryValue);
}


// --------------- add Mini Record function 

function addMiniRecord(allMiniRecord, priceValue, noteValue) {
  const miniRecord = document.createElement('div');
  miniRecord.className = "miniRecord";
  allMiniRecord.appendChild(miniRecord);
  const miniRecordWrapper = document.createElement('div');
  miniRecordWrapper.className = "miniRecord-wrapper";
  miniRecord.appendChild(miniRecordWrapper);
  const circleMiniRecord = document.createElement('div');
  circleMiniRecord.className = "circleMiniRecord";
  miniRecordWrapper.appendChild(circleMiniRecord);     // потом исправить
  const accuratePriceMiniRecord = document.createElement('div');
  accuratePriceMiniRecord.className = "accuratePriceMiniRecord";
  accuratePriceMiniRecord.innerText = priceValue;
  miniRecordWrapper.appendChild(accuratePriceMiniRecord);
  const descriptionMiniRecord = document.createElement('span');
  descriptionMiniRecord.className = "descriptionMiniRecord";
  descriptionMiniRecord.innerText = noteValue;
  miniRecordWrapper.appendChild(descriptionMiniRecord);
  const dateMiniRecord = document.createElement('span');
  dateMiniRecord.className = "dateMiniRecord";
  let date = new Date();
  dateMiniRecord.innerText = date.getDay + "." + (date.getMonth + 1);                                    // потом исправить
  miniRecord.appendChild(dateMiniRecord);

  console.log("addminirecord function");
}

// input function
// запрещает вводить в input некоторые элементы
const inputElement = document.getElementById('inputFieldPrice');

inputElement.addEventListener('input', function() {
  inputElement.value = inputElement.value.replace(/[-+]/g, '');
  if(inputElement.value[0] == 0 && inputElement.value[1] == 0) {
    inputElement.value = inputElement.value.slice(0, -1); // slice(начальный элемент, последний элемент) - удаляет последний элемент строки(массива)
  }
});




let recordList = document.querySelectorAll(".record");

recordList.forEach((record) => {
  record.addEventListener("click", () => {
    record.children[0].children[0].children[0].classList.toggle("bottomArrow-reverse");
    record.children[1].classList.toggle("allMiniRecord_block");
    console.log(recordList);
  })
})



// Че хочу
// Создаем обьект со свойствами 1) цена из инпута с
// калькулятором, 2) описание из инпута, 3) Категория по
// нажатию на картинку(картинка застывает)
// из этого обьекта вытаскиваем свойства и создаем DOM элем


