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
  let pobierz_local_storage = localStorage.getItem("lista_zadań"); //stworzenie zmiennej w localStorage
  if(pobierz_local_storage == null){ //sprawdza dane w localStorage
    tablica_zadan = []; //tworzy tablicę
  }else{
    tablica_zadan = JSON.parse(pobierz_local_storage);  //parsowanie na obiekt
  }
  tablica_zadan.push(zawartosc); //dodawanie nowej zawartości
  localStorage.setItem("lista_zadań", JSON.stringify(tablica_zadan)); //zmiana na string'a
  pokaz_zadania(); //wywołanie funkcji "pokaz_zadania"
  dodaj.classList.remove("active"); //dezaktywowanie przycisku dodaj
}


function pokaz_zadania(){
  let pobierz_local_storage = localStorage.getItem("lista_zadań");
  if(pobierz_local_storage == null){
    tablica_zadan = [];
  }else{
    tablica_zadan = JSON.parse(pobierz_local_storage); 
  }
  const ilosc_zadan = document.querySelector(".ilosc_zadan");
  if (tablica_zadan.length > 1 && tablica_zadan.length < 5) {
    ilosc_zadan.textContent = "Masz " + tablica_zadan.length + " zadania"; //wypisuje ilość zadań
  } else if (tablica_zadan.length == 0) { 
    ilosc_zadan.textContent = "Nie masz żadnych zadań"; //wypisuje ilość zadań
  } else if (tablica_zadan.length == 1) { 
    ilosc_zadan.textContent = "Masz 1 zadanie"; //wypisuje ilość zadań
  } else {
    ilosc_zadan.textContent = "Masz " + tablica_zadan.length + " zadań"; //wypisuje ilość zadań
  }
  
  if(tablica_zadan.length > 0){ //jeśli są zadania
    usun.classList.add("active"); //aktywuje przycisk usuń
  }else{
    usun.classList.remove("active"); //dezaktywuje przycisk usuń
  }
  let newLiTag = "";
  tablica_zadan.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="usun_zadanie(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  lista.innerHTML = newLiTag; //dodawanie zadania do HTMLa
  wpisz.value = ""; //wyczyszczenie pola wpisz
}

//funkcja usuń zadanie
function usun_zadanie(index){
  let pobierz_local_storage = localStorage.getItem("lista_zadań");
  tablica_zadan = JSON.parse(pobierz_local_storage);
  tablica_zadan.splice(index, 1); //usuwa zadanie
  localStorage.setItem("lista_zadań", JSON.stringify(tablica_zadan));
  pokaz_zadania(); //wywołuje funkcję pokaz_zadania
}

//funkcja wyczyść
usun.onclick = ()=>{
  let pobierz_local_storage = localStorage.getItem("lista_zadań"); //pobieranie z localstorage
  if(pobierz_local_storage == null){ //sprawdza zawartość localstorage
    tablica_zadan = []; //czyści tablicę
  }else{
    tablica_zadan = JSON.parse(pobierz_local_storage);  //parsowanie na obiekt
    tablica_zadan = []; //czyści tablicę
  }
  localStorage.setItem("lista_zadań", JSON.stringify(tablica_zadan)); //ustawia nowe(puste) wartości w localstorage
  pokaz_zadania(); //wywołuje funkcję pokaz_zadania
}
