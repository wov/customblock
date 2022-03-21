function replaceToAppText(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        const _to_app = _a.querySelector('.to-app');
        if(_to_app && _to_app.textContent.indexOf('打开APP') !== -1){
            _to_app.textContent = '布丁优化'
        }
    });
}

replaceToAppText();

document.addEventListener('scroll', _ => {
    replaceToAppText();
    
    //去掉所有“3天前的新闻列表”
    const _dom_pubtimes = document.querySelectorAll('.pubtime');
    [].forEach.call(_dom_pubtimes, function(t,t_index) {
        if(t.textContent === '3天前' ){
            console.log(t_index)
            const _article = t.closest('article');
            _article.parentNode.removeChild( _article );
        }
    });
})

