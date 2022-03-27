const BS_NAME = 'pudding_block_channel'

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

// 添加关闭按钮
function addCloseAndHideResult(){
    // 关闭频道
    let results = document.querySelectorAll('.section-channel');
    results.forEach(function(_r) {
        if(_r.querySelector('.__pudding_close')){return;}

        // 判断classname
        const cn = _r.className.replace(/(wap-section|section-channel|section-|\s)/g,'');
        let blockChannels = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
        
        // 假设包含了这个结果，则在dom中删除
        if(blockChannels.includes(cn)){
            _r.remove();
        }
        
        const _close = document.createElement('div');
        _close.className = "__pudding_close";
        _close.addEventListener('click',function(){
            const name = _r.querySelector('.sec-name') ? _r.querySelector('.sec-name').textContent : '';
            const c = confirm(`【布丁扩展】\n\n不再显示 ${name} 频道？`);
            let blockChannels = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];

            if(c){
                blockChannels.push(cn);
                localStorage.setItem(BS_NAME,JSON.stringify(blockChannels));
                _r.remove();
            }else{
                // nothing will happen
            }
        })
        _r.appendChild(_close);
    });
}



setTimeout( _ => {
    addCloseAndHideResult();
},500)

addCloseAndHideResult();

//["wap-section section-channel section-headline","wap-section section-channel section-house","wap-section section-channel section-war"]

document.addEventListener('scroll', _ => {
    replaceToAppText();
    addCloseAndHideResult();

    //去掉所有“3天前的新闻列表”
    //    const _dom_pubtimes = document.querySelectorAll('.pubtime');
    //    [].forEach.call(_dom_pubtimes, function(t,t_index) {
    //        if(t.textContent === '3天前' ){
    //            console.log(t_index)
    //            const _article = t.closest('article');
    //            _article.parentNode.removeChild( _article );
    //        }
    //    });
})
