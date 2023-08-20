function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // Edge
    element.msRequestFullscreen();
  }
}

const fullScreenButton = document.getElementById("fullscreenButton"); // Replace with your button ID
fullScreenButton.addEventListener("click", () => {
  const elementToFullscreen = document.documentElement; // This selects the whole page
  requestFullscreen(elementToFullscreen);
});

const socket = io("192.168.5.220:3000");

const BtnL = document.getElementById('btnL')
const BtnU = document.getElementById('btnU')
const BtnD = document.getElementById('btnD')
const BtnR = document.getElementById('btnR')
const roomIdInput = document.getElementById("roomidinput");
// let roomId = roomIdInput.value;

let roomId = 22334;

roomIdInput.addEventListener("change", () => {
  roomId = parseInt(roomIdInput.value);
});

// let buttons = {
//   BtnL: false,
//   BtnU: false,
//   BtnD: false,
//   BtnR: false,
// };

// BtnL.addEventListener('touchstart', ()=>{
//     buttons.BtnL = true
//     console.log("start");
//     init()

// })
// BtnL.addEventListener('touchend', ()=>{
//     buttons.BtnL = false
//     console.log("end");
//     init()
// })

// BtnR.addEventListener('touchstart', ()=>{
//     buttons.BtnR = true
//     init()
// })
// BtnR.addEventListener('touchend', ()=>{
//     buttons.BtnR = false
//     init()
// })
// BtnU.addEventListener('touchstart', ()=>{
//     buttons.BtnU = true
//     init()
// })
// BtnU.addEventListener('touchend', ()=>{
//     buttons.BtnU = false
//     init()
// })
// BtnD.addEventListener('touchstart', ()=>{
//     buttons.BtnD = true
//     init()
// })
// BtnD.addEventListener('touchend', ()=>{
//     buttons.BtnD = false
//     init()
// })

const analogStick = document.getElementById('analogStick');
const analogController = document.querySelector('.analog-controller');

let buttons = {
    BtnL: false,
    BtnU: false,
    BtnD: false,
    BtnR: false,
};

analogStick.addEventListener('touchstart', (e) => {
    moveAnalogStick(e.touches[0].clientX, e.touches[0].clientY);
});

analogStick.addEventListener('touchmove', (e) => {
    moveAnalogStick(e.touches[0].clientX, e.touches[0].clientY);
});

analogStick.addEventListener('touchend', () => {
    resetAnalogStick();
});

function moveAnalogStick(clientX, clientY) {
    // Calculate the analog stick position
    const rect = analogController.getBoundingClientRect();
    const controllerX = rect.left;
    const controllerY = rect.top;
    const centerX = controllerX + rect.width / 2;
    const centerY = controllerY + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = rect.width / 2;

    const angle = Math.atan2(dy, dx);

    // Calculate the threshold for considering the stick in a direction
    const threshold = maxDistance * 0.25;

    if (distance > maxDistance) {
        const x = Math.cos(angle) * maxDistance;
        const y = Math.sin(angle) * maxDistance;

        analogStick.style.setProperty('--stick-x', `${x}px`);
        analogStick.style.setProperty('--stick-y', `${y}px`);
    } else {
        analogStick.style.setProperty('--stick-x', `${dx}px`);
        analogStick.style.setProperty('--stick-y', `${dy}px`);
    }

    const stickSize = analogStick.offsetWidth;
    const controllerSize = analogController.offsetWidth;
    
    const stickCenterX = controllerSize / 2;
    const stickCenterY = controllerSize / 2;
    
    const stickPercentageX = (dx / controllerSize) * 100;
    const stickPercentageY = (dy / controllerSize) * 100;
    
    // Use the stick's percentage values to adjust its position
    analogStick.style.transform = `translate(${stickPercentageX}%, ${stickPercentageY}%)`;
    

    // Determine the direction based on angle and threshold
    buttons.BtnL = false;
    buttons.BtnR = false;
    buttons.BtnU = false;
    buttons.BtnD = false;

    if (Math.abs(dx) > threshold) {
        buttons.BtnU = dx > 0;
        buttons.BtnD = dx < 0;
    }

    if (Math.abs(dy) > threshold) {
        buttons.BtnL = dy < 0;
        buttons.BtnR = dy > 0;
    }

    sendButtonState();
}

function resetAnalogStick() {
    analogStick.style.setProperty('--stick-x', '0');
    analogStick.style.setProperty('--stick-y', '0');

    buttons.BtnL = false;
    buttons.BtnR = false;
    buttons.BtnU = false;
    buttons.BtnD = false;
    analogStick.style.transform = 'translate(-15%, -15%)';

    sendButtonState();
}

function sendButtonState() {
    socket.emit('btn', { buttons, roomId });
}


