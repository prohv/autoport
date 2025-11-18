chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'closeTab' && sender.tab) {
      chrome.tabs.remove(sender.tab.id);
      console.log('WiFi Auto-Login: Tab closed via background script');
    }
  });
  
  chrome.runtime.onStartup.addListener(() => {
    console.log('WiFi Auto-Login Extension: Background script started');
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log('WiFi Auto-Login Extension: Extension installed/updated');
  });