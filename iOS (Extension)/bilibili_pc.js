// add meta.
var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, user-scalable=no";
document.getElementsByTagName('head')[0].appendChild(meta);

// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex')

setTimeout( _ => {
    window.scrollTo(0, 0);
},500)


// 去掉所有的 a target 属性
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();

document.addEventListener('scroll', _ => {
    removeAllTarget();
})
