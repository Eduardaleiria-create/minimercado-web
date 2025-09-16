// Exibe data e hora atual no rodapé
function atualizarDataHora() {
  const agora = new Date();
  const dataHora = document.getElementById("dataHora");
  if (dataHora) {
    dataHora.innerText = "Data e hora: " + agora.toLocaleString("pt-BR");
  }
}

setInterval(atualizarDataHora, 1000);
