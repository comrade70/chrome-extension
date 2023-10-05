// Initialize variables to keep track of the recording state and the stream.
let isRecording = false;
let mediaStream = null;

// Listen for messages from the popup script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startRecording') {
    if (!isRecording) {
      startRecording().then((shareableLink) => {
        sendResponse({ link: shareableLink });
      });
    }
  } else if (message.type === 'stopRecording') {
    if (isRecording) {
      stopRecording();
    }
  }
  // Ensure that sendResponse is called asynchronously.
  return true;
});

// Function to start screen recording.
async function startRecording() {
  try {
    // Request desktopCapture permission.
    const stream = await chrome.desktopCapture.chooseDesktopMedia(
      ['screen', 'window'], // Types of desktop media to capture.
      (streamId) => {
        if (streamId) {
          // User granted permission, start recording.
          mediaStream = stream;
          isRecording = true;
          // implement recording logic here.

          // Example of using MediaRecorder to record the stream.
          const mediaRecorder = new MediaRecorder(stream);
          const chunks = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            const recordedData = new Blob(chunks, { type: 'video/webm' });

            // Call the saveAndGenerateLink function to save the recorded data and generate a link.
            saveAndGenerateLink(recordedData);
          };

          mediaRecorder.start();

          return true;
        } else {
          // User denied permission.
          isRecording = false;
          return false;
        }
      }
    );

    if (!stream) {
      throw new Error('Permission denied for screen sharing');
    }
  } catch (error) {
    console.error('Error starting recording:', error);
    isRecording = false;
  }
}

// Function to stop screen recording.
function stopRecording() {
  if (isRecording) {
    // Stop the mediaRecorder, which will trigger the onstop event.
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
}

// Function to save recorded data and generate a shareable link.
function saveAndGenerateLink(recordedData) {
  // logic to save the recorded data and generate a shareable link implemented in backend.
  // data wil be sent to your Django backend for storage.
  // unique shareable link will be generated and returned.
  const formData = new FormData();
  formData.append('screen_recording', recordedData, 'screen.webm');  // 'screen_recording' should match your serializer field name

  fetch('https://screen-recorder-z3st.onrender.com/api/upload/', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    const shareableLink = data.shareable_link;
    console.log('Shareable Link:', shareableLink);
  })
  .catch(error => {
    console.error('Error saving and generating link:', error);
  });
}
