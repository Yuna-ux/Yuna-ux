document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/ip')
    .then(response => response.json())
    .then(data => {
      const display = document.getElementById('ip-display');
      if (display) {
        display.textContent = `Seu IP: ${data.ip}`;
      }
    })
    .catch(error => {
      console.error('Erro ao buscar IP:', error);
      const display = document.getElementById('ip-display');
      if (display) {
        display.textContent = 'Erro ao carregar IP';
      }
    });
});
