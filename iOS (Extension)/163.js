document.addEventListener('click', event => {
    let target = event.target;
//    console.log(target.tagName)
    if(target.classList.contains('js-open-app') && target.href){
        window.location.href = target.href;
    }
})

//去掉所有“3天前的新闻列表”
document.addEventListener('scroll', _ => {
    console.log('scroll')
    const _dom_pubtimes = document.querySelectorAll('.pubtime');
    [].forEach.call(_dom_pubtimes, function(t,t_index) {
        if(t.textContent === '3天前' ){
            console.log(t_index)
            const _article = t.closest('article');
            _article.parentNode.removeChild( _article );
        }
    });
})

