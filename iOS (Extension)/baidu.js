const BS_NAME = "pudding_block_sites";

// 添加关闭按钮
function addCloseAndHideResult(){
    let results = document.querySelectorAll('.c-result.result');
    results.forEach(function(_r) {
        if(_r.classList.contains('__pudding')){return;}
        
        const log = _r.getAttribute('data-log');
        if(!log){return;}
        
        const logData = JSON.parse(log);
        if(!logData || !logData.mu){return;}
        
        let blockSites = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
        const host = (new URL(logData.mu)).host;

        // 假设包含了这个结果，则隐藏显示
        if(blockSites.includes(host)){
            _r.classList.add('displaynone');
        }
        
        const _close = document.createElement('div');
        _close.className = "__pudding_close";
        _close.addEventListener('click',function(){
            
            const c = confirm(`【布丁扩展】\n\n是否屏蔽来自“${host}”的结果？`);
            if(c){
                blockSites.push(host);
                localStorage.setItem(BS_NAME,JSON.stringify(blockSites));
                _r.classList.add('displaynone');
            }else{
                // nothing will happen
            }
        })
        
        _r.appendChild(_close);
        _r.classList.add('__pudding');
    });
}

setTimeout( _ => {
    addCloseAndHideResult();
},500)

addCloseAndHideResult();

//点击下一页的时候
const dom_next = document.querySelector('.new-pagenav-right');
dom_next.addEventListener('click', _ => {
    setTimeout( _ => {
        addCloseAndHideResult();
    },1000)
})


document.addEventListener('scroll', _ => {
    addCloseAndHideResult();
})
