const BS_NAME = "pudding_block_ups";
const BAD_NAME = "pudding_block_channels";

// add a class for reset the styles easly.
document.querySelector('body').classList.add('pd__ex');

function addViewPortMeta(){
    // add meta.
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(meta);
}

addViewPortMeta();

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

// 给视频添加inline的播放
let video = document.querySelector('video');
if(video){
    video.setAttribute('playsinline',"true");
    video.setAttribute('controls',"true");
    video.volume = 1;
    video.addEventListener('play', (event) => {
        video.muted= false;
    });
}


setTimeout( _ => {
    let video = document.querySelector('video');
    if(video){
        video.setAttribute('playsinline',"true");
        video.setAttribute('controls',"true");
        video.volume = 1;
        video.muted= false;
    }
},2000);


function addButtonAndBlock(){
    console.log('addButtonAndBlock');
    const items = document.querySelectorAll('.video-card,.rank-item,.bili-video-card,.bili-live-card');
    const CLASSFLAG = "pudding_extension";
    if(!items.length){return;}
    
    items.forEach( i => {
        if(i.classList.contains(CLASSFLAG)){console.log('it already has..');return;}
        i.classList.add(CLASSFLAG);
        // 添加直接展开的功能
//        const t = i.querySelector('.video-card__content');

        // 添加屏蔽的功能
        // 用来放关闭按钮的容器
        const h = i.querySelector('.video-card__content,.img,.bili-video-card__image--wrap,.bili-live-card__image');
        // up主的名字..
        const upDom = i.querySelector('.up-name,.bili-video-card__info--author,.bili-live-card__info--uname');
                
        if(h && upDom){
            let up = upDom.textContent.replaceAll(/\s+/g, '');
            if(!up){return;}
            
            let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
            if(blockUsers.includes(up)){
                i.remove();
            }
            
            const blockDom = document.createElement('div');
            blockDom.className = '__pudding_block';
            h.appendChild(blockDom)

            blockDom.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
                const c = confirm(`【布丁扩展】\n\n是否在列表中屏蔽“${up}”？\n屏蔽仅在本地有效`);
                if(c){
                    let blockUsers = localStorage.getItem(BS_NAME) ? JSON.parse(localStorage.getItem(BS_NAME)) : [];
                    blockUsers.push(up);
                    localStorage.setItem(BS_NAME,JSON.stringify(blockUsers));
                    i.remove();
                }
            })
        }
    })
}

setTimeout(_ => {
    addButtonAndBlock();
},1000)


const rootChangeDom = document.querySelector('#app,main.bili-layout,#i_cecream');
if(rootChangeDom){
    const config = { attributes: false, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        addButtonAndBlock();
//        openLongPictureInNewWindow();
    };
    const observer = new MutationObserver(callback);
    observer.observe(rootChangeDom, config);
}
