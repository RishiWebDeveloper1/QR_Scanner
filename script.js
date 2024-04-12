let search = document.getElementById("search");
let message = document.getElementById("message");
let searchURL = document.getElementById("searchURL");

// code for open camera and loop scannig of QR code..
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function (err) {
        console.error('Error accessing the camera.', err);
    });

video.addEventListener('play', function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    setInterval(function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
        });
        if (code) {
            console.log('QR Code detected:', code.data);
            search.innerHTML = code.data;
            // You can do whatever you want with the scanned QR code data here
            // For example, display it on the page or send it to a server
        }
    }, 100);
});

function searchWeb() {
    if (search.innerHTML.trim() === '') {
        message.style.color = "white";
        message.style.backgroundColor = "red";
        message.innerHTML = "Note:-  *Please scan any QR code to search!";
    }
    else {
        let googleQurey = search.innerHTML;
        searchURL.href = googleQurey;
        searchURL.click();
        message.style.color = "black";
        message.style.backgroundColor = "transperant";
        message.innerHTML = "search bro now";
    }
}
