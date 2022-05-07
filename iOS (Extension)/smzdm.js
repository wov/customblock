// 替换链接为真实链接
function replaceLinks(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        if(_a.href && _a.href.indexOf('app.smzdm.com/xiazai') !== -1){
            const params = (new URL(_a.href)).searchParams;
            const jsonData = params.get('json') ? JSON.parse(params.get('json')) : null;
            if(jsonData && jsonData.url){
                _a.setAttribute("href", jsonData.url);
                _a.removeAttribute("target");
                _a.removeAttribute("onclick");
            }
            
            const _label = _a.querySelector('.surplus-label');
            if(_label){
                _label.textContent = '布丁优化'
            }
        }
    });
}

// 移除target，手机端真的不需要新窗口打开了，啊喂～
function removeAllTarget(){
    let As = document.querySelectorAll('a');
    As.forEach(function(_a) {
        _a.removeAttribute('target');
    });
}

removeAllTarget();

replaceLinks();

document.addEventListener('scroll', _ => {
    replaceLinks();
    removeAllTarget();
})


