document.addEventListener('DOMContentLoaded', function () {
    const startRecordButton = document.getElementById('startRecord');
    const stopRecordButton = document.getElementById('stopRecord');
    const statusMessage = document.getElementById('status');
    const shareLink = document.getElementById('link');

    let recording = false;

    // Event listener for the "Start Recording" button
    startRecordButton.addEventListener('click', () => {
        if (!recording) {
            // Start the recording process (You need to implement this)
            startRecording().then((link) => {
                recording = true;
                statusMessage.textContent = 'Recording...';
                shareLink.textContent = 'Shareable Link: ' + link;
                shareLink.style.display = 'block';
            }).catch((error) => {
                console.error('Error starting recording:', error);
            });
        }
    });

    // Event listener for the "Stop Recording" button
    stopRecordButton.addEventListener('click', () => {
        if (recording) {
            // Stop the recording process (You need to implement this)
            stopRecording().then(() => {
                recording = false;
                statusMessage.textContent = 'Not Recording';
            }).catch((error) => {
                console.error('Error stopping recording:', error);
            });
        }
    });

    // Function to start recording (You need to implement this)
    async function startRecording() {
        // Make a request to your background script to start recording
        const response = await chrome.runtime.sendMessage({ type: 'startRecording' });

        // Parse the response to get the shareable link
        const link = response.link; // Adjust this based on your actual response structure
        return link;
    }

    // Function to stop recording (You need to implement this)
    async function stopRecording() {
        // Make a request to your background script to stop recording
        await chrome.runtime.sendMessage({ type: 'stopRecording' });
    }
});
