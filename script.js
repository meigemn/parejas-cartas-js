const cards = [
    { id: 1, back: "images/dorso.png", front: "./images/28000-punaladas.jpg", turnedUp: false },
    { id: 2, back: "images/dorso.png", front: "./images/Besos-de-Perro.jpg", turnedUp: false },
    { id: 3, back: "images/dorso.png", front: "./images/la-patera.jpg", turnedUp: false },
    { id: 4, back: "images/dorso.png", front: "./images/Agila.jpg", turnedUp: false },
    { id: 5, back: "images/dorso.png", front: "./images/Deltoya.jpg", turnedUp: false },
    { id: 6, back: "images/dorso.png", front: "./images/Yo-minoria-absoluta.jpg", turnedUp: false },
    { id: 7, back: "images/dorso.png", front: "./images/A-Day-At-The-Races.jpg", turnedUp: false },
    { id: 8, back: "images/dorso.png", front: "./images/A-Night-At-The-Opera.jpg", turnedUp: false },
    { id: 9, back: "images/dorso.png", front: "./images/Queen-II.jpg", turnedUp: false },
    { id: 10, back: "images/dorso.png", front: "./images/and-justice-for-all.jpg", turnedUp: false },
    { id: 11, back: "images/dorso.png", front: "./images/black-album.jpg", turnedUp: false },
    { id: 12, back: "images/dorso.png", front: "./images/Ride-The-Lightning.jpg", turnedUp: false },
    { id: 13, back: "images/dorso.png", front: "./images/Appetite-for-Destruction.jpg", turnedUp: false },
    { id: 14, back: "images/dorso.png", front: "./images/Use-Your-Illusion-I.jpg", turnedUp: false },
    { id: 15, back: "images/dorso.png", front: "./images/use-your-illusion-II.jpg", turnedUp: false },
    { id: 16, back: "images/dorso.png", front: "./images/Estopa.jpg", turnedUp: false },
    { id: 17, back: "images/dorso.png", front: "./images/la-calle-es-tuya.jpg", turnedUp: false },
    { id: 18, back: "images/dorso.png", front: "./images/voces-de-ultrarrumba.jpg", turnedUp: false },
    { id: 19, back: "images/dorso.png", front: "./images/sex-pistols.jpg", turnedUp: false },
    { id: 20, back: "images/dorso.png", front: "./images/nevermind.jpg", turnedUp: false }
];

let numberSelect = document.getElementById("number-select");
let cardContainer = document.getElementById("card-container");
let playButton = document.getElementById("play-button");
let counterElement = document.getElementById("counter");
let seconds = 0;
let intervalID;
let isCounterOn = false;

let pairedCardsArray = []; // almacena cartas duplicadas
let flippedCards = []; // almacena cartas volteadas

let isFirst=true;

numberSelect.addEventListener("change", () => {
    clearInterval(intervalID);
    seconds=0;
    counterElement.innerHTML = "00:00:00";

    isCounterOn = false; // Asegurarse de que no está activo el contador
    seconds = 0; // Reiniciar los segundos

    let numberSelected = parseInt(numberSelect.value); // valor del desplegable
    let selectedCards = cards.slice(0, numberSelected); // coge las cartas correspondientes

    // Duplicar las cartas seleccionadas para crear pares con estados independientes
    pairedCardsArray = [...selectedCards, ...selectedCards.map(card => ({ ...card }))];

    // Barajar las cartas duplicadas
    pairedCardsArray = shuffleArray(pairedCardsArray);

    // Mostrar el dorso de las cartas
    pairedCardsArray.forEach(card => card.turnedUp = true);

    // Renderizar las cartas 
    renderCards(pairedCardsArray);
    // Reiniciar el contador en la pantalla
});

function updateCounter() {
    seconds++;
    counterElement.innerHTML = `${seconds} `;
}

/*
    Comprueba si todas las cartas han sido volteadas
 */
function checkAllCardsTurnedUp() {
    const allTurnedUp = pairedCardsArray.every(card => card.turnedUp);
    if (allTurnedUp) {
        clearInterval(intervalID); // Detener el contador
        isCounterOn = false; // Indicar que el contador ya no está activo
        setTimeout(() => {
            alert(`¡Felicidades! Completaste el juego en ${seconds} segundos.`);
            clearInterval(intervalID);
            counterElement.innerHTML = "";

        }, 500); // Retraso de 1.5 segundos antes de mostrar la alerta
    }
}

function renderCards(cardsToRender) {
    isCounterOn = false; // Indicar 

    cardContainer.innerHTML = ""; // limpia el div de las cartas
    
    cardsToRender.forEach(card => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card"); // clase
        cardDiv.dataset.id = card.id; // id

        let cardImage = document.createElement("img");
        cardImage.src = card.turnedUp ? card.front : card.back; // imagen cambia segun el estado
        cardImage.alt = `Card ${card.id}`;
        cardImage.classList.add("card-image");

        // Si la carta está volteada y hay dos cartas volteadas, agregar la clase 'neon' al borde
        if (card.turnedUp && flippedCards.length === 2) {
            cardDiv.classList.add("neon"); // Agregar el efecto de neón al borde de las cartas volteadas
        }

        // Click en la carta
        cardDiv.addEventListener("click", () => {
            if (isFirst) {
                isFirst=false;
                startTimer();
                
            }
            if (flippedCards.length < 2 && !card.turnedUp) {
                card.turnedUp = true; // Voltear la carta
                flippedCards.push(card); // Añadir al array de cartas volteadas
                renderCards(cardsToRender); // Renderizar las cartas nuevamente

                // Si se voltearon 2 cartas, comprobar si coinciden
                if (flippedCards.length === 2) {
                    const [firstCard, secondCard] = flippedCards;

                    if (firstCard.id !== secondCard.id) {
                        // Si no coinciden
                        setTimeout(() => {
                            firstCard.turnedUp = false;
                            secondCard.turnedUp = false;
                            flippedCards = []; // Limpiar el array de cartas volteadas
                            renderCards(cardsToRender); // Renderizar las cartas nuevamente
                        }, 1000);
                    } else {
                        // Si coinciden
                        flippedCards = [];
                        checkAllCardsTurnedUp(); // Comprobar si todas las cartas están volteadas
                    }
                }
            }
        });
        cardDiv.appendChild(cardImage);
        cardContainer.appendChild(cardDiv);
        
    });
}
function startTimer(){
    
        clearInterval(intervalID);
        let seconds = 0;
        let mins = 0;
        let hours = 0;
    
        // Reinicia el contador
        if (isCounterOn) {
            clearInterval(intervalID);
            counterElement.innerHTML = "00:00:00"; // Reiniciar el contador visualmente
        }
    
        // Inicia el contador
        isCounterOn = true;
        intervalID = setInterval(() => {
            seconds++;
    
            // Manejar el incremento de minutos y horas
            if (seconds === 60) {
                seconds = 0;
                mins++;
            }
            if (mins === 60) {
                mins = 0;
                hours++;
            }
    
            // Formatear los valores como hh:mm:ss
            const formattedTime = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            // Aplicar el efecto de escala
        counterElement.classList.add("scale-effect");
        
        // Eliminar la clase después de 0.2 segundos (tiempo de la animación CSS)
        setTimeout(() => {
        counterElement.classList.remove("scale-effect");
        }, 200); // 200 ms, ajustable según el tiempo de la animación
    
            // Actualizar el contador visualmente
            counterElement.innerHTML = formattedTime;
        }, 1000);
    }

    



playButton.addEventListener("click", () => {
    isFirst=true;
    clearInterval(intervalID);
    counterElement.innerHTML = "00:00:00";

    // Resetear el estado de las cartas para el juego
    pairedCardsArray.forEach(card => card.turnedUp = false);
    renderCards(pairedCardsArray);
});

// Función de barajado Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
