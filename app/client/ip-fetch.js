fetch('/api/ip')
  .then(response => response.json())
  .then(data => {
    document.getElementById('ip-display').textContent = `Seu IP: ${data.ip}`;
  })
  .catch(error => {
    console.error(error);
    document.getElementById('ip-display').textContent = 'Erro ao carregar IP';
  });
