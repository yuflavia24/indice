let filas = [];

async function cargarCSV() {
  const respuesta = await fetch('datos.csv');
  const texto = await respuesta.text();

  const lineas = texto.trim().split('\n');
  const encabezados = lineas[0].split(',');

  filas = lineas.slice(1).map(f => f.split(','));

  const thead = document.querySelector('thead');
  thead.innerHTML = '<tr>' + encabezados.map(h => `<th>${h}</th>`).join('') + '</tr>';

  mostrarFilas(filas);
}

function mostrarFilas(filasFiltradas) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  filasFiltradas.forEach(fila => {
    const filaHTML = '<tr>' + fila.map(celda => `<td>${celda}</td>`).join('') + '</tr>';
    tbody.innerHTML += filaHTML;
  });
}

function filtrarTabla() {
  const entrada = document.getElementById('entrada').value.toLowerCase();
  const filtradas = filas.filter(fila =>
    fila.join(' ').toLowerCase().includes(entrada)
  );
  mostrarFilas(filtradas);
}

cargarCSV();
