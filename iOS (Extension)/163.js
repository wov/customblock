
document.addEventListener('click', event => {
    let target = event.target
    console.log(target.tagName)
    if(target.classList.contains('js-open-app') && target.href){
        window.location.href = target.href;
    }
})
