# Screen and Audio Recording Chrome Extension Backend Documentation
This project is the backend of a chrome extension that has ability to record screen and audio, watch the recorded screen and also generate a shareable link that may be shared with others to watch the video.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Usage](#usage)
4. [Database Setup](#database-setup)
5. [API Endpoints](#api-endpoints)
6. [Testing the API](#testing-the-api)
7. [Development](#development)
8. [Troubleshooting](#troubleshooting)
9. [Contributing](#contributing)
10. [License](#license)

## 1. Introduction

The Screen and Audio Recording Chrome Extension allows you to easily record your screen and audio while browsing websites. You can then upload the recorded content to a Django backend server, generate shareable links, and access your recordings later.

---

## 2. Features

- Record your screen and audio within Chrome.
- Upload recorded data to a Django backend.
- Generate shareable links for your recordings.
- Access your recordings via the Chrome extension popup.

---

## 3. Usage

This guide provides instructions for developers to clone and set up the Chrome extension API locally for development purposes. The API serves as the backend for the Chrome extension, allowing you to test and work on various features.

### Clone the Repository

1. Clone the Chrome extension API repository to your local machine:

   ```shell
   git clone https://github.com/comrade70/chrome-extension.git


2. Navigate to the Project Directory
    ```shell
    cd chrome-extension-api

3. Create a Virtual Environment
    ```shell
    python -m venv env

4. Activate the Virtual Environment
   On Windows
    ```shell
    env\Scripts\activate

5. Install Python Dependencies
    ```shell
    pip install -r requirements.txt

---

## 4. Database Setup

Create a database for the project.

Update the database settings in screen-recorder/settings.py with yourdatabase credentials.

1. Migrate the Database
    ```shell
    python manage.py migrate
    ```

2. Create a Superuser (Admin User)
    ```shell
    python manage.py createsuperuser
    ```

3. Run the Development Server
    ```shell
    python manage.py runserver
    ```

---

## 5. API Endpoints

The extension communicates with a Django backend to store and retrieve recorded data. The following API endpoints are used:

- `POST /api/upload/`: Uploads screen and audio recordings.
- `GET /api/recorded-screen/{shareable_link}/`: Retrieves a specific recording by shareable link.

---

## 6. Testing the API

You can use Postman or any API testing tool to test the API endpoints.
I have outlined the endpoints and methods available for interacting with the Chrome extension's backend API. The API provides functionality to upload and retrieve recorded screen and audio data.

### Base URL

- Base URL: `http://localhost:8000/api/`

### Authentication

- No authentication is required for testing purposes.

---

### Endpoints

#### i. Upload Recorded Screen and Audio

- **URL:** `POST /upload/`

**Description:** Uploads recorded screen and audio data.

**Request Body:**
- `screen_recording` (File): The recorded screen data (Base64 encoded).
- `audio_recording` (File): The recorded audio data (Base64 encoded).

**Example Request (POST):**
`POST http://localhost:8000/api/upload/`

Headers:
Content-Type: multipart/form-data

Form Data:
- screen_recording: (Select File)
- audio_recording: (Select File)


**Response (Success):**
```json
   {
    "id": 1,
    "timestamp": "2023-10-07T12:48:14.226439Z",
    "shareable_link": "132c48ac",
    "screen_recording": "/media/screen_recordings/140987fa-b752-4426-bfef-1b8d576f8239.webm",
    "audio_recording": "/media/screen_recordings/94b3b440-105d-4a79-a93f-bd2bedf4264b.webm"
    }
```

**Response (Error):**
 ```json
    {
    "error": "Invalid file format"
    }
```


#### ii. Retrieve Recorded Screen and Audio by Shareable Link

-**URL:** `GET /recorded-screen/{shareable_link}/`

**Description: Retrieves recorded screen and audio data by shareable link.**


`GET http://localhost:8000/api/recorded-screen/132c48ac/`


**Example Request (GET):**

**Response (Success):**
 ```json
    {
    "id": 1,
    "timestamp": "2023-10-07T12:48:14.226439Z",
    "shareable_link": "132c48ac",
    "screen_recording": "/media/screen_recordings/140987fa-b752-4426-bfef-1b8d576f8239.webm",
    "audio_recording": "/media/screen_recordings/94b3b440-105d-4a79-a93f-bd2bedf4264b.webm"
    }
```


**Response (Error):**
```json
    {
    "error": "Recorded data not found"
    }
```

### Error Handling
The API returns appropriate HTTP status codes and error messages in case of failures. Common error codes include:

400 Bad Request: Invalid request parameters.
404 Not Found: Resource not found.
500 Internal Server Error: Server-side errors.

---

## 7. Development
If you want to contribute or customize the extension, follow these steps:

1. Clone the [GitHub repository](https://github.com/comrade70/screen-recorder).
2. Navigate to the extension folder.
3. Modify the extension's code as needed.
4. Load the extension in Chrome by going to `chrome://extensions/`, enabling "Developer mode," and clicking "Load unpacked." Select the extension folder.
5. Test your changes in Chrome.

---

## 8. Troubleshooting

### Issue 1: JSON Parse Error in Postman

- **Cause:** The JSON object in your Postman request is not correctly formatted.
- **Solution:** Ensure that the JSON object follows the correct format with double quotes around property names.

### Issue 2: Missing Screen or Audio Data

- **Cause:** The screen or audio data is not attached correctly in the request.
- **Solution:** Check that you've attached both screen and audio data in your Postman request.

---

## 9. Contributing

Contributions to this project are welcome. To contribute, please follow the [contribution guidelines](CONTRIBUTING.md) in the project repository.

## 10. License

This extension is licensed under the [MIT License](LICENSE).
