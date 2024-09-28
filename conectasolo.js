const filas = 6;
const columnas = 7;
let tablero = Array.from(Array(filas), () => Array(columnas).fill(null));
let turno = 'roja';
let victoriasRojas = 0;
let victoriasAmarillas = 0;
let dificultadIA = 1; // Nivel de dificultad de la IA (1 = fácil, 2 = medio, 3 = difícil)

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
            alert(`¡Rojo gana!`);
            victoriasRojas++;
            actualizarContador();
            // Deshabilitar el juego
            deshabilitarJuego();
            // Aumentar la dificultad de la IA si el humano gana
            dificultadIA = Math.min(dificultadIA + 1, 3); // Incrementar dificultad
            // Reiniciar el tablero después de 2 segundos
            setTimeout(reiniciarPartida, 2000);
            return;
        }
        turno = 'amarilla'; // Cambiar al turno de la IA
        setTimeout(colocarFichaIA, 1000); // Pausa de 1 segundo antes de que la IA coloque su ficha
    }
}

function colocarFichaIA() {
    const columnasDisponibles = [];
    for (let j = 0; j < columnas; j++) {
        if (tablero[0][j] === null) { // Verificar si la columna está disponible
            columnasDisponibles.push(j);
        }
    }

    if (columnasDisponibles.length > 0) {
        let columnaElegida;
        switch (dificultadIA) {
            case 1: // Fácil
                columnaElegida = columnasDisponibles[Math.floor(Math.random() * columnasDisponibles.length)];
                break;
            case 2: // Medio
                columnaElegida = elegirColumnaMedio(columnasDisponibles);
                break;
            case 3: // Difícil
                columnaElegida = elegirColumnaDificil(columnasDisponibles);
                break;
        }

        if (colocarFicha(columnaElegida, turno)) {
            if (verificarVictoria(turno)) {
                alert(`¡Amarillo gana!`);
                victoriasAmarillas++;
                actualizarContador();
                // Deshabilitar el juego
                deshabilitarJuego();
                // Reiniciar el tablero después de 2 segundos
                setTimeout(reiniciarPartida, 2000);
                return;
            }
            turno = 'roja'; // Cambiar al turno del jugador humano
        }
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
    turno = 'roja';
    iniciarTablero();
    // Habilitar el juego después de reiniciar el tablero
    habilitarJuego();
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

// Función para habilitar el juego
function habilitarJuego() {
    const celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.addEventListener('click', colocarFichaHumano); // Agrega el evento de clic
    });
}

// Funciones para elegir columna en diferentes niveles de dificultad
function elegirColumnaMedio(columnasDisponibles) {
    // Lógica para elegir una columna de manera más inteligente
    return columnasDisponibles[Math.floor(Math.random() * columnasDisponibles.length)];
}

function elegirColumnaDificil(columnasDisponibles) {
    // Lógica más avanzada para elegir una columna
    // Primero verifica si la IA puede ganar en su próximo movimiento
    for (let j of columnasDisponibles) {
        if (puedeGanar(j, 'amarilla')) {
            return j; // Si puede ganar, elige esa columna
        }
    }

    // Luego verifica si el humano puede ganar en su próximo movimiento y bloquea
    for (let j of columnasDisponibles) {
        if (puedeGanar(j, 'roja')) {
            return j; // Bloquea la victoria del humano
        }
    }

    // Si no hay movimientos ganadores o bloqueos, elige aleatoriamente
    return columnasDisponibles[Math.floor(Math.random() * columnasDisponibles.length)];
}

function puedeGanar(columna, color) {
    // Coloca temporalmente la ficha en la columna
    for (let i = filas - 1; i >= 0; i--) {
        if (!tablero[i][columna]) {
            tablero[i][columna] = color;
            const victoria = verificarVictoria(color);
            tablero[i][columna] = null; // Deshacer el movimiento
            return victoria;
        }
    }
    return false; // Columna llena o no se puede colocar
}

// Iniciar el juego
iniciarTablero();
