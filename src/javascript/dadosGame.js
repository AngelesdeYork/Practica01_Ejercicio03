function lanzarDados() {
  const resultadoDado1 = obtenerResultadoDado();
  const resultadoDado2 = obtenerResultadoDado();

  actualizarImagen("dado1", resultadoDado1);
  actualizarImagen("dado2", resultadoDado2);

  const sumaDados = resultadoDado1 + resultadoDado2;
  const numerosAleatorios = obtenerNumerosAleatorios();

  actualizarResultado(sumaDados, numerosAleatorios);

  limpiarCeldasTabla();

  actualizarCeldasTabla(numerosAleatorios);
}

function obtenerResultadoDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function actualizarImagen(elementId, resultadoDado) {
  const imagen = document.getElementById(elementId);
  imagen.src = `img/cara${resultadoDado}.jpg`;
}

function obtenerNumerosAleatorios() {
  const numerosAleatorios = [obtenerNumeroAleatorio()];
  numerosAleatorios.push(obtenerNumeroAleatorio(numerosAleatorios[0]));

  return numerosAleatorios;
}

function obtenerNumeroAleatorio(excluir = -1) {
  let numeroAleatorio;
  do {
    numeroAleatorio = Math.floor(Math.random() * 11) + 2;
  } while (numeroAleatorio === excluir);

  return numeroAleatorio;
}

function actualizarResultado(sumaDados, numerosAleatorios) {
  const imagenResultado = document.getElementById("imagenResultado");
  imagenResultado.src = numerosAleatorios.includes(sumaDados)
    ? "img/emoji1.png"
    : "img/emoji2.png";
}

function limpiarCeldasTabla() {
  for (let i = 2; i <= 12; i++) {
    const celda = document.getElementById(`celda${i}`);
    if (celda) {
      celda.style.backgroundColor = "";
    }
  }
}

function actualizarCeldasTabla(numerosAleatorios) {
  for (const numeroAleatorio of numerosAleatorios) {
    const celda = document.getElementById(`celda${numeroAleatorio}`);
    if (celda) {
      celda.style.backgroundColor = "green";
    }
  }
}
