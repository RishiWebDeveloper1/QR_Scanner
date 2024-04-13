let beep = document.getElementById("beep");
let search = document.getElementById("search");
let message = document.getElementById("message");
let searchURL = document.getElementById("searchURL");
let rotateCam = document.getElementById("rotate-cam");
let copyButtonBox = document.getElementById("copy-button");
let cameraMode = "environment";
let interval = 0;
// code for open camera and loop scannig of QR code..
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraMode } })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
        message.style.color = "black";
        message.style.backgroundColor = "transperant";
        message.innerHTML = "Scan &nbsp&nbsp[QR Code]";
    })
    .catch(function (err) {
        console.error('Error accessing the camera.', err);
        message.style.color = "white";
        message.style.backgroundColor = "red";
        message.innerHTML = "Note:-  *Camera Access is denied by your device!!!";
    });

video.addEventListener('play', function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    interval = setInterval(function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
        });
        if (code) {
            if (code.data == "") {
                console.log('Scaned Empty');
            }
            else if (search.innerHTML.trim() == '') {
                search.innerHTML = code.data;
                console.log('QR Code detected:', code.data);
                search.style.height = '40px';
                var searchHeight = search.scrollHeight;
                search.style.height = searchHeight + 'px';
                beep.play();
                navigator.vibrate([200]);
            }
            else if (search.innerHTML.trim() !== '') {
                if (search.innerHTML == code.data) {
                    console.log("Same data scanned");
                    search.innerHTML = code.data;
                    console.log('QR Code detected:', code.data);
                    search.style.height = '40px';
                    var searchHeight = search.scrollHeight;
                    search.style.height = searchHeight + 'px';
                }
                else {
                    search.innerHTML = code.data;
                    console.log('QR Code detected:', code.data);
                    search.style.height = '40px';
                    var searchHeight = search.scrollHeight;
                    search.style.height = searchHeight + 'px';
                    beep.play();
                    navigator.vibrate([200]);
                }
            }
            // You can do whatever you want with the scanned QR code data here
            // For example, display it on the page or send it to a server
        }
    }, 100);
});

function searchWeb() {
    if (search.innerHTML.trim() === '') {
        message.style.color = "white";
        message.style.backgroundColor = "orangered";
        message.innerHTML = "Note:-  *Please scan any QR code to search!";
    }
    else {
        let googleQurey = search.innerHTML;
        searchURL.href = googleQurey;
        searchURL.click();
        message.style.color = "black";
        message.style.backgroundColor = "transperant";
        message.innerHTML = "Scan &nbsp&nbsp[QR Code]";
    }
}

function changeCameraMode() {
    rotateCam.removeAttribute('onclick');
    rotateCam.style.backgroundColor = "gray";
    rotateCam.style.boxShadow = "0 0 0 10px gray";
    rotateCam.style.backgroundImage = "url('image_removed')";
    if (cameraMode == "environment") {
        cameraMode = "user";
    }
    else {
        cameraMode = "environment";
    }
    countDown();
    clearInterval(interval);
    navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraMode } })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            message.style.color = "black";
            message.style.backgroundColor = "transperant";
            message.innerHTML = "Scan &nbsp&nbsp[QR Code]";
        })
        .catch(function (err) {
            console.error('Error accessing the camera.', err);
            message.style.color = "white";
            message.style.backgroundColor = "red";
            message.innerHTML = "Note:-  *Camera Access is denied by your device!!!";
        });
    setTimeout(function () {
        rotateCam.setAttribute("onclick", "changeCameraMode()");
        rotateCam.style.backgroundColor = "white";
        rotateCam.style.boxShadow = "0 0 0 10px white";
        rotateCam.style.backgroundImage = "url('image/switch-camera.svg')";
    }, 5000);
}

function copyText() {
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = search.innerText.trim();
    tempTextArea.style.position = 'fixed'; // Make it invisible
    tempTextArea.style.top = '-1000px'; // Move it off-screen
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');

    copyButtonBox.innerText = 'Text Copied!';
    copyButtonBox.style.backgroundColor = "green";
    setTimeout(function () {
        copyButtonBox.innerText = 'Copy Text';
        copyButtonBox.style.backgroundColor = "gray";
    }, 3000);
}

async function countDown() {
    rotateCam.innerHTML = "5";
    rotateCam.style.backgroundImage = "conic-gradient(gray,gray,gray,gray,gray)";
    setTimeout(function () {
        rotateCam.innerHTML = "4";
        rotateCam.style.backgroundImage = "conic-gradient(gray,gray,gray,gray,white)";
    }, 1000);
    setTimeout(function () {
        rotateCam.innerHTML = "3";
        rotateCam.style.backgroundImage = "conic-gradient(gray,gray,gray,white,white)";
    }, 2000);
    setTimeout(function () {
        rotateCam.innerHTML = "2";
        rotateCam.style.backgroundImage = "conic-gradient(gray,gray,white,white,white)";
    }, 3000);
    setTimeout(function () {
        rotateCam.innerHTML = "1";
        rotateCam.style.backgroundImage = "conic-gradient(gray,white,white,white,white)";
    }, 4000);
    setTimeout(function () {
        rotateCam.innerHTML = "";
    }, 5000);
}