var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, user-scalable=no";
document.getElementsByTagName('head')[0].appendChild(meta);

document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
       event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
const now = (new Date()).getTime();
if (now - lastTouchEnd <= 300) {
  event.preventDefault();
}
lastTouchEnd = now;
}, false);
