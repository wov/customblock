document.addEventListener('click', event => {
    let target = event.target
    console.log(target.tagName)
    if(target.classList.contains('js-open-app') && target.href){
        window.location.href = target.href;
    }
})

// 方法终止对所有目标元素可见性变化的观察。
// https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/disconnect
window.IntersectionObserver = null;

//remove all scroll events...
setTimeout( _ => {
    window.onscroll = null;
    document.body.onscroll = null;
},2000)
