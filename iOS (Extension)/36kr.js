// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex');


// 移除target
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();

document.addEventListener('scroll', _ => {
    //移除a的target
    removeAllTarget();
});
