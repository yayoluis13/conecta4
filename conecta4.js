const filas = 6;
const columnas = 7;
let tablero = Array.from(Array(filas), () => Array(columnas).fill(null));
let turno = 'roja'; // El primer jugador es el rojo
let victoriasRojas = 0;
let victoriasAmarillas = 0;

const tableroElement = document.getElementById('tablero');

function iniciarTablero() {
    tableroElement.innerHTML = '';
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.dataset.columna = j;
            celda.addEventListener('click', colocarFichaHumano);
            tableroElement.appendChild(celda);
        }
    }
}

function colocarFichaHumano(event) {
    const columna = event.target.dataset.columna;
    if (colocarFicha(columna, turno)) {
        if (verificarVictoria(turno)) {
            alert(`¡${turno === 'roja' ? 'Rojo' : 'Amarillo'} gana!`);
            if (turno === 'roja') {
                victoriasRojas++;
            } else {
                victoriasAmarillas++;
            }
            actualizarContador();
            // Deshabilitar el juego
            deshabilitarJuego();
            // Reiniciar el tablero después de 2 segundos
            setTimeout(reiniciarPartida, 2000);
            return;
        }
        // Cambiar el turno al otro jugador
        turno = (turno === 'roja') ? 'amarilla' : 'roja';
    }
}

function colocarFicha(columna, color) {
    for (let i = filas - 1; i >= 0; i--) {
        if (!tablero[i][columna]) {
            tablero[i][columna] = color;
            tableroElement.children[i * columnas + parseInt(columna)].classList.add(color);
            return true;
        }
    }
    return false; // Columna llena
}

function verificarVictoria(color) {
    return verificarHorizontal(color) || verificarVertical(color) || verificarDiagonal(color);
}

function verificarHorizontal(color) {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas - 3; j++) {
            if (tablero[i][j] === color && tablero[i][j + 1] === color && tablero[i][j + 2] === color && tablero[i][j + 3] === color) {
                return true;
            }
        }
    }
    return false;
}

function verificarVertical(color) {
    for (let j = 0; j < columnas; j++) {
        for (let i = 0; i < filas - 3; i++) {
            if (tablero[i][j] === color && tablero[i + 1][j] === color && tablero[i + 2][j] === color && tablero[i + 3][j] === color) {
                return true;
            }
        }
    }
    return false;
}

function verificarDiagonal(color) {
    for (let i = 0; i < filas - 3; i++) {
        for (let j = 0; j < columnas - 3; j++) {
            if (tablero[i][j] === color && tablero[i + 1][j + 1] === color && tablero[i + 2][j + 2] === color && tablero[i + 3][j + 3] === color) {
                return true;
            }
        }
    }
    for (let i = 0; i < filas - 3; i++) {
        for (let j = 3; j < columnas; j++) {
            if (tablero[i][j] === color && tablero[i + 1][j - 1] === color && tablero[i + 2][j - 2] === color && tablero[i + 3][j - 3] === color) {
                return true;
            }
        }
    }
    return false;
}

function actualizarContador() {
    document.getElementById('victoriasRojas').innerText = victoriasRojas;
    document.getElementById('victoriasAmarillas').innerText = victoriasAmarillas;
}

function reiniciarPartida() {
    tablero = Array.from(Array(filas), () => Array(columnas).fill(null));
    turno = 'roja'; // Reiniciar el turno al jugador rojo
    iniciarTablero();
}

function resetearContador() {
    victoriasRojas = 0;
    victoriasAmarillas = 0;
    actualizarContador();
}

// Función para deshabilitar el juego
function deshabilitarJuego() {
    const celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.removeEventListener('click', colocarFichaHumano); // Elimina el evento de clic
    });
}

// Iniciar el juego
iniciarTablero();
