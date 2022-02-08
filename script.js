// wyłuskanie elementów
const wpisz = document.querySelector(".wpisz input");
const dodaj = document.querySelector(".wpisz button");
const lista = document.querySelector(".lista");
const usun = document.querySelector(".footer button");

// sprawdzanie zawartości pola "wpisz"
wpisz.onkeyup = ()=>{
  let zawartosc = wpisz.value; //pobranie zawartości pola "wpisz"
  if(zawartosc.trim() != 0){ //czy wartość nie zawiera tylko spacji
    dodaj.classList.add("active"); //aktywacja przycisku "dodaj"
  }else{
    dodaj.classList.remove("active"); //dezaktywacja przycisku "dodaj"
  }
}

pokaz_zadania(); //wywołanie funkcji "pokaz_zadania"

dodaj.onclick = ()=>{ //kliknięcie "dodaj"(+)
  let zawartosc = wpisz.value; //pobranie zawartości pola "wpisz"
  let getLocalStorageData = localStorage.getItem("New Todo"); //stworzenie zmiennej w localStorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(zawartosc); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  pokaz_zadania(); //wywołanie funkcji "pokaz_zadania"
  dodaj.classList.remove("active"); //unactive the add button once the task added
}


function pokaz_zadania(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const ilosc_zadan = document.querySelector(".ilosc_zadan");
  if (listArray.length > 1 && listArray.length < 5) {
    ilosc_zadan.textContent = "Masz " + listArray.length + " zadania"; //passing the array length in pendingtask
  } else if (listArray.length == 0) { 
    ilosc_zadan.textContent = "Nie masz żadnych zadań"; //passing the array length in pendingtask
  } else if (listArray.length == 1) { 
    ilosc_zadan.textContent = "Masz 1 zadanie"; //passing the array length in pendingtask
  } else {
    ilosc_zadan.textContent = "Masz " + listArray.length + " zadań"; //passing the array length in pendingtask
  }
  
  if(listArray.length > 0){ //if array length is greater than 0
    usun.classList.add("active"); //active the delete button
  }else{
    usun.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  lista.innerHTML = newLiTag; //adding new li tag inside ul tag
  wpisz.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
usun.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    listArray = []; //create a blank array
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}
