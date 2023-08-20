// const toggleButton = document.getElementById('toggle-button');

// toggleButton.addEventListener('click', () => {
//   if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
//     if (document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen();
//     } else if (document.documentElement.mozRequestFullScreen) {
//       document.documentElement.mozRequestFullScreen();
//     } else if (document.documentElement.webkitRequestFullscreen) {
//       document.documentElement.webkitRequestFullscreen();
//     } else if (document.documentElement.msRequestFullscreen) {
//       document.documentElement.msRequestFullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen();
//     }
//   }
// });


function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Redirect based on device type
  if (isMobileDevice()) {
    window.location.href = 'phone.html'; // Redirect to phone.html if using a mobile device
  } else {
    window.location.href = 'pc.html'; // Redirect to pc.html if using a PC
  }