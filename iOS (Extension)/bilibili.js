// block storage name.
const BS_NAME = "pudding_block_authors";


document.addEventListener('click', event => {
    let target = event.target;
    // 假设有链接就直接走链接了，不要使用js跳转
    if(target.href){
        window.location.href = target.href;
    }
    
    if(target.closest('.v-card-single')){
        setTimeout( _ => {
            addNativePlayButton();
            
        },1000)
    }
})

//添加原生播放按钮
function addNativePlayButton(){
    if( !document.querySelector('.__puddingPlayInOriginDiv') ){
        const playInOrignButton = document.createElement('div');
        playInOrignButton.className = '__puddingPlayInOriginDiv';
        playInOrignButton.innerText = '布丁：在原生播放器中播放';
        playInOrignButton.addEventListener('click', _ => {
            const video = document.querySelector('video')
            document.location.href = video.src
        });
        document.body.appendChild(playInOrignButton)
    }
}

if(window.location.href.indexOf('video') !== -1){
    addNativePlayButton();
}


// 添加关闭按钮
function addCloseAndHideResult(){
    let cards = document.querySelectorAll('.card-box .v-card-single');
    
    cards.forEach(function(_r) {
        // 查看是否已经有处理过的标记
        if(_r.classList.contains('__pudding')){return;}
        
        // 作者的dom.
        const dom_author = _r.querySelector('.author');
        if(!dom_author){return;}
        
        let blockAuthors = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
        const author = dom_author.textContent;

        // 假设包含了这个结果，则隐藏显示
        if(blockAuthors.includes(author)){
            _r.classList.add('displaynone');
        }
        
        const _close = document.createElement('div');
        _close.className = "__pudding_close";
        _close.addEventListener('click',function(){
            let blockAuthors = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
            const c = confirm(`【布丁扩展】\n\n是否在列表/搜索页中屏蔽来自“${author}”的结果？`);
            if(c){
                blockAuthors.push(author);
                localStorage.setItem(BS_NAME,JSON.stringify(blockAuthors));
                _r.classList.add('displaynone');
                window.location.reload();
            }else{
                // nothing will happen
                window.location.reload();
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

document.addEventListener('scroll', _ => {
    addCloseAndHideResult();
})




