function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementById("datetime");
    
    if (datetimeElement) {
      // Exibe a data e hora no formato brasileiro
      datetimeElement.textContent = now.toLocaleString("pt-BR", {
        dateStyle: "full",
        timeStyle: "medium",
      });
    } else {
      console.error("Elemento para exibição de data/hora não encontrado.");
    }
  }
  
  // Chame essa função na inicialização e configure o intervalo
  updateDateTime();
  setInterval(updateDateTime, 1000); // Atualiza a cada segundo
  