let recordedChunks = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "startRecording") {
    startRecording();
  }
});

function startRecording() {
  recordedChunks = [];

  chrome.desktopCapture.chooseDesktopMedia(["screen"], function(streamId) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId,
          maxWidth: 1920,
          maxHeight: 1080
        }
      }
    })
    .then(function(stream) {
      let mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      mediaRecorder.onstop = function() {
        let videoBlob = new Blob(recordedChunks, {type: 'video/webm'});
        sendVideoToBackend(videoBlob);
      };
      mediaRecorder.start();
      setTimeout(function() {
        mediaRecorder.stop();
      }, 5000); // Recording duration (in milliseconds)
    });
  });
}

function sendVideoToBackend(videoBlob) {
  let formData = new FormData();
  formData.append('video', videoBlob);

  fetch('https://screen-recorder-z3st.onrender.com/api/upload/', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    let uniqueIdentifier = data.unique_identifier;
    let videoUrl = `https://screen-recorder-z3st.onrender.com/api/recorded-screen/${uniqueIdentifier}/`;
    // videoUrl used to generate a shareable link or perform other actions
    console.log('Video uploaded. URL:', videoUrl);
  });
}
