
// add meta.
var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, user-scalable=no";
document.getElementsByTagName('head')[0].appendChild(meta);

setTimeout( _ => {
    window.scrollTo(0, 0);
},500)


