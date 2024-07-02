let juegan = Math.floor(Math.random() * 2) == 1 ? "X" : "O";
// Para comprobar si se han juagdo 9 veces
let jugados = 0;
let victoriasX = 0;
let victoriasO = 0;


function guardarVictorias() {
    localStorage.setItem("victoriasX", victoriasX);
    localStorage.setItem("victoriasO", victoriasO);
}

function cargarVictorias() {
    let victoria = localStorage.getItem("victoriasX");
    if(victoria != null){
        victoriasX = victoria;
    }
    victoria = localStorage.getItem("victoriasO");
    if(victoria != null){
        victoriasO = victoria;
    }
    document.getElementById("victoriasX").textContent = victoriasX;
    document.getElementById("victoriasO").textContent = victoriasO;
}

function mostrarResultado(mensaje) {
    const resultado = document.getElementById("resultado");
    resultado.getElementsByTagName("p")[0].textContent = mensaje;
    resultado.style.display = "block";
    document.getElementById("partida").removeEventListener("click", jugar);
}

function animar(casilla) {
    casilla.style.animation = "";
    casilla.offsetWidth;
    casilla.style.animation = "victoria 1s";
}

function comprobarVictoria(c1, c2, c3) {
    const c1Texto = c1.textContent;
    const c2Texto = c2.textContent;
    const c3Texto = c3.textContent;
    if (c1Texto == c2Texto && c1Texto == c3Texto && c3Texto != "") {
        mostrarResultado("Han ganado las " + juegan);
        c1.style.backgroundColor = "red";
        c2.style.backgroundColor = "red";
        c3.style.backgroundColor = "red";
        animar(c1);
        animar(c2);
        animar(c3);
        if(juegan == "X") {
            victoriasX++;
            document.getElementById("victoriasX").textContent = victoriasX;
        } else {
            victoriasO++;
            document.getElementById("victoriasO").textContent = victoriasO;
        }
        guardarVictorias();
        return true;
    }
    return false;
}

function jugar(evt) {
    if (evt.target.textContent != "") {
        const audio = new Audio("error.mp3");
        audio.play();
        //new Audio("error.mp3").play();
        return;
    }

    evt.target.textContent = juegan;
    jugados++;


    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const c3 = document.getElementById("c3");
    const c4 = document.getElementById("c4");
    const c5 = document.getElementById("c5");
    const c6 = document.getElementById("c6");
    const c7 = document.getElementById("c7");
    const c8 = document.getElementById("c8");
    const c9 = document.getElementById("c9");

    if (comprobarVictoria(c1, c2, c3) || comprobarVictoria(c4, c5, c6) ||
        comprobarVictoria(c7, c8, c9) || comprobarVictoria(c1, c4, c7) ||
        comprobarVictoria(c2, c5, c8) || comprobarVictoria(c3, c6, c9) ||
        comprobarVictoria(c1, c5, c9) || comprobarVictoria(c3, c5, c7)) {
        return true;
    }

    if (jugados == 9) {
        mostrarResultado("Han empatado");
        return;
    }

    if (juegan == "X") {
        juegan = "O";
    } else {
        juegan = "X";
    }
    //juegan = juegan == "X" ? "O" : "X";
    document.getElementById("juegan").textContent = juegan;
}

function cerrarResultado() {
    document.getElementById("resultado").style.display = "none";
}

function nuevaPartida() {
    jugados = 0;
    juegan = Math.floor(Math.random() * 2) == 1 ? "X" : "O";
    document.getElementById("juegan").textContent = juegan;
    const casillas = document.getElementsByClassName("casilla");
    for (const c of casillas) {
        c.textContent = "";
        c.style.backgroundColor = "";
    }
    document.getElementById("partida").addEventListener("click", jugar);
}

function reiniciarPartida() {
    //if(confirm("¿Reiniciar?")) {
    const respuesta = confirm("¿Reiniciar?");
    if(respuesta == true) {
        victoriasO = 0;
        victoriasX = 0;
        document.getElementById("victoriasX").textContent = victoriasX;
        document.getElementById("victoriasO").textContent = victoriasO;
        guardarVictorias();
        nuevaPartida();
    }
}

function inicializar() {
    cargarVictorias();
    document.getElementById("juegan").textContent = juegan;
    document.getElementById("partida").addEventListener("click", jugar);
    document.getElementById("cerrar").addEventListener("click", cerrarResultado);
    document.getElementById("nueva").addEventListener("click", nuevaPartida);
    document.getElementById("reiniciar").addEventListener("click", reiniciarPartida);
}

inicializar();

