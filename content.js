(async function() {
    console.log('WiFi Auto-Login Extension: Script loaded');
    
    try {
      // Get stored credentials
      const result = await chrome.storage.local.get(['wifiUsername', 'wifiPassword']);
      
      if (!result.wifiUsername || !result.wifiPassword) {
        console.log('WiFi Auto-Login: No credentials found. Please set them in the extension popup.');
        return;
      }
      
      console.log('WiFi Auto-Login: Credentials found, starting auto-login process...');
      
      const modal = document.getElementById('customModal');
      if (modal && modal.style.display !== 'none') {
        console.log('WiFi Auto-Login: Closing modal popup...');
        
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
          closeBtn.click();
          console.log('WiFi Auto-Login: Modal closed');
        }
        
        await sleep(300);
      }
      
      const usernameField = document.getElementById('userId');
      const passwordField = document.getElementById('password');
      
      if (!usernameField || !passwordField) {
        console.log('WiFi Auto-Login: Could not find username or password fields');
        return;
      }
      
      console.log('WiFi Auto-Login: Filling credentials...');
      
      usernameField.value = result.wifiUsername;
      passwordField.value = result.wifiPassword;
      
      usernameField.dispatchEvent(new Event('input', { bubbles: true }));
      passwordField.dispatchEvent(new Event('input', { bubbles: true }));

      await sleep(200);

      console.log('WiFi Auto-Login: Submitting form...');
      
      const form = document.querySelector('form');
      const submitBtn = document.querySelector('.btn[type="submit"]');
      
      if (submitBtn) {
        submitBtn.click();
      } else if (form) {
        form.submit();
      } else {
        console.log('WiFi Auto-Login: Could not find form or submit button');
        return;
      }
      
      console.log('WiFi Auto-Login: Form submitted');
      
      await sleep(500);
      
      console.log('WiFi Auto-Login: Closing tab...');
      window.close();
      
      setTimeout(() => {
        try {
          chrome.runtime.sendMessage({action: 'closeTab'});
        } catch (e) {
          console.log('WiFi Auto-Login: Could not close tab automatically');
        }
      }, 100);
      
    } catch (error) {
      console.error('WiFi Auto-Login Error:', error);
    }
  })();
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkStatus') {
      sendResponse({status: 'Auto-login script is active'});
    }
  });