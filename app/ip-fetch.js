// app/ip-fetch.js
fetch('/api/ip')
  .then(response => response.json())
  .then(data => {
    document.getElementById('ip-display').textContent = 'Your IP: ' + data.ip;
  })
  .catch(error => {
    console.error(error);
    document.getElementById('ip-display').textContent = 'Failed to load IP';
  });
