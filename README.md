# Screen and Audio Recording Chrome Extension Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Development](#development)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)
9. [License](#license)

## 1. Introduction

The Screen and Audio Recording Chrome Extension allows you to easily record your screen and audio while browsing websites. You can then upload the recorded content to a Django backend server, generate shareable links, and access your recordings later.

## 2. Features

- Record your screen and audio within Chrome.
- Upload recorded data to a Django backend.
- Generate shareable links for your recordings.
- Access your recordings via the Chrome extension popup.

## 3. Installation

To install the Screen and Audio Recording Chrome Extension:

1. Download the extension from the Chrome Web Store (yet to be uploaded to Chrome Web Store).
2. Click "Add to Chrome" and confirm the installation.
3. The extension icon will appear in your Chrome toolbar.

## 4. Usage

### Recording Your Screen and Audio

1. Click on the extension icon in the Chrome toolbar.
2. In the popup window, click "Start Recording" to begin recording your screen and audio.
3. Click "Stop Recording" to stop the recording.
4. The recorded data will be uploaded to the server, and a shareable link will be generated.

### Accessing Your Recordings

1. Click on the extension icon in the Chrome toolbar.
2. In the popup window, click "View Recordings" to access your recorded content.

## 5. API Endpoints

The extension communicates with a Django backend to store and retrieve recorded data. The following API endpoints are used:

- `POST /api/upload/`: Uploads screen and audio recordings.
- `GET /api/recorded-screen/{shareable_link}/`: Retrieves a specific recording by shareable link.

## 6. Development

If you want to contribute or customize the extension, follow these steps:

1. Clone the [GitHub repository](https://github.com/comrade70/chrome-extension).
2. Navigate to the extension folder.
3. Modify the extension's code as needed.
4. Load the extension in Chrome by going to `chrome://extensions/`, enabling "Developer mode," and clicking "Load unpacked." Select the extension folder.
5. Test your changes in Chrome.

## 7. Troubleshooting

### Issue 1: JSON Parse Error in Postman

- **Cause:** The JSON object in your Postman request is not correctly formatted.
- **Solution:** Ensure that the JSON object follows the correct format with double quotes around property names.

### Issue 2: Missing Screen or Audio Data

- **Cause:** The screen or audio data is not attached correctly in the request.
- **Solution:** Check that you've attached both screen and audio data in your Postman request.

## 8. Contributing

Contributions to this project are welcome. To contribute, please follow the [contribution guidelines](CONTRIBUTING.md) in the project repository.

## 9. License

This extension is licensed under the [MIT License](LICENSE).
