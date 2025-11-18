// Load existing credentials when popup opens
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const result = await chrome.storage.local.get(['wifiUsername', 'wifiPassword']);
      
      if (result.wifiUsername && result.wifiPassword) {
        document.getElementById('current-status').style.display = 'block';
        document.getElementById('current-username').textContent = result.wifiUsername;

        document.getElementById('username').value = result.wifiUsername;
        document.getElementById('password').value = result.wifiPassword;
        
        showStatus('Credentials already saved. You can update them here.', 'info');
      } else {
        showStatus('Please enter your WiFi credentials for the first time.', 'info');
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  });

  document.getElementById('save-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
      showStatus('Please enter both username and password.', 'error');
      return;
    }
    
    try {
      const saveBtn = document.getElementById('save-btn');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';

      await chrome.storage.local.set({
        wifiUsername: username,
        wifiPassword: password
      });

      document.getElementById('current-status').style.display = 'block';
      document.getElementById('current-username').textContent = username;
      
      showStatus('Credentials saved successfully! Auto-login is now active.', 'success');

      saveBtn.disabled = false;
      saveBtn.textContent = 'Update Credentials';
      
    } catch (error) {
      console.error('Error saving credentials:', error);
      showStatus('Error saving credentials. Please try again.', 'error');

      document.getElementById('save-btn').disabled = false;
      document.getElementById('save-btn').textContent = 'Save Credentials';
    }
  });
  
  function showStatus(message, type) {
    const statusEl = document.getElementById('status-message');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 3000);
    }
  }