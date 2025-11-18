# AutoPort - VIT WiFi Auto-Login Extension

AutoPort is a Chrome browser extension designed to automatically log you into the VIT WiFi portal, eliminating the need to manually enter your credentials every time you connect to the campus WiFi network.

## Features

- **Automatic Login**: Automatically fills in your username and password on the VIT WiFi portal and submits the form
- **Secure Credential Storage**: Stores your WiFi credentials securely using Chrome's storage API
- **One-Click Setup**: Simple interface to save your credentials
- **Automatic Tab Closure**: Closes the portal tab after successful login
- **Modern UI**: Clean, dark-themed interface with intuitive controls

## Installation

1. Download the extension files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension folder
5. The AutoPort extension icon will appear in your browser toolbar

## Usage

1. Click on the AutoPort extension icon in your browser toolbar
2. Enter your VIT WiFi username and password in the popup
3. Click "Save Credentials"
4. The next time you visit the VIT WiFi portal, your credentials will be automatically filled and the form submitted

## How It Works

- The extension monitors specific VIT WiFi portal URLs: `http://phc.prontonetworks.com/*`
- When you visit this URL, the content script automatically detects the login form
- It fills in your stored credentials and submits the form
- After successful login, the tab is automatically closed

## Security

- Your credentials are stored locally in your browser using Chrome's secure storage API
- Credentials are never transmitted to any external servers
- The extension only activates on the specified VIT WiFi portal domains

## Permissions

The extension requires the following permissions:
- `storage` - To securely store your WiFi credentials
- `activeTab` - To interact with the current tab
- `tabs` - To manage browser tabs
- `webRequest` - To monitor network requests
- `scripting` - To execute scripts on the WiFi portal

## Compatibility

- Chrome browsers (Manifest V3)
- Works specifically with VIT WiFi portal systems

## Support

If you encounter issues with the extension:
1. Verify that you're on the correct VIT WiFi portal URL
2. Check that your credentials are correctly saved in the extension
3. Ensure the extension has permission to access the WiFi portal site
